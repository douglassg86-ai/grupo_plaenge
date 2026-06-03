import { NextRequest, NextResponse } from 'next/server'

const REPO = 'douglassg86-ai/grupo_plaenge'
const FILE_PATH = 'src/data/availability-overrides.json'
const BRANCH = 'main'

export async function POST(req: NextRequest) {
  const { password, overrides, _check } = await req.json()

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  if (_check) return NextResponse.json({ ok: true })

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

  // Get current file SHA
  const getRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
    { headers }
  )
  if (!getRes.ok) {
    return NextResponse.json({ error: 'Erro ao buscar arquivo no GitHub' }, { status: 500 })
  }
  const { sha } = await getRes.json()

  const content = Buffer.from(JSON.stringify(overrides, null, 2) + '\n').toString('base64')

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

  if (!putRes.ok) {
    const err = await putRes.json()
    return NextResponse.json({ error: err.message || 'Erro ao commitar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
