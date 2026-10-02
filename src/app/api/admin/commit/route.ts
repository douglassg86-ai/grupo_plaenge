import { NextRequest, NextResponse } from 'next/server'

const REPO = 'douglassg86-ai/grupo_plaenge'
const FILE_PATH = 'src/data/availability-overrides.json'
const BRANCH = 'main'

type OverridesMap = Record<string, Record<string, string>>

// Aplica sobre o arquivo atual do GitHub só o que esta aba mudou (client × base, o estado com que
// a aba abriu). Assim um save não desfaz alterações feitas depois por outra aba ou por commit.
function mergeOverrides(current: OverridesMap, base: OverridesMap, client: OverridesMap) {
  const merged: OverridesMap = JSON.parse(JSON.stringify(current))
  let changes = 0
  for (const product of new Set([...Object.keys(base), ...Object.keys(client)])) {
    const b = base[product] || {}, c = client[product] || {}
    merged[product] = merged[product] || {}
    for (const id of new Set([...Object.keys(b), ...Object.keys(c)])) {
      if (b[id] === c[id]) continue
      if (c[id] === undefined) delete merged[product][id]
      else merged[product][id] = c[id]
      changes++
    }
  }
  return { merged, changes }
}

export async function POST(req: NextRequest) {
  const { password, overrides, base, _check } = await req.json()

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  if (_check) return NextResponse.json({ ok: true })

  // Abas abertas antes desta versão mandam o arquivo inteiro: gravar apagaria alterações mais novas.
  if (!base) {
    return NextResponse.json({ error: 'O painel foi atualizado. Recarregue a página e refaça a alteração.' }, { status: 409 })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN não configurado' }, { status: 500 })
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }

  // Lê o arquivo atual, mescla e grava; se outro commit entrar no meio (409), tenta de novo
  for (let attempt = 0; attempt < 3; attempt++) {
    const getRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      { headers, cache: 'no-store' }
    )
    if (!getRes.ok) {
      return NextResponse.json({ error: 'Erro ao buscar arquivo no GitHub' }, { status: 500 })
    }
    const { sha, content: current64 } = await getRes.json()
    const current = JSON.parse(Buffer.from(current64, 'base64').toString('utf-8')) as OverridesMap
    const { merged, changes } = mergeOverrides(current, base, overrides)
    if (changes === 0) return NextResponse.json({ ok: true, changes: 0 })

    const content = Buffer.from(JSON.stringify(merged, null, 2) + '\n').toString('base64')
    const putRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: 'admin: atualiza disponibilidade de unidades',
          content,
          sha,
          branch: BRANCH,
        }),
      }
    )
    if (putRes.ok) return NextResponse.json({ ok: true, changes })
    if (putRes.status === 409) continue
    const err = await putRes.json()
    return NextResponse.json({ error: err.message || 'Erro ao commitar' }, { status: 500 })
  }
  return NextResponse.json({ error: 'Outra alteração foi publicada ao mesmo tempo. Tente salvar de novo.' }, { status: 409 })
}
