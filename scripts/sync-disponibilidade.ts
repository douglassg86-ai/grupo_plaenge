/**
 * Sincroniza a disponibilidade dos empreendimentos (grupo_plaenge) para a
 * tabela `disponibilidade_empreendimentos` no Supabase do gpi-tracker.
 *
 * Lê os dados de unidades de cada produto (já com os overrides aplicados),
 * conta por status e faz upsert de UMA linha por empreendimento (agregado).
 *
 * Uso:
 *   node --env-file=.env --import tsx scripts/sync-disponibilidade.ts [--dry-run]
 *
 * Requer no .env (local, não versionado):
 *   SUPABASE_URL=https://mfpuxpkjztwfawybnmql.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=sb_secret_...   (service_role — ignora RLS; NUNCA commitar)
 */
import { units as editionUnits } from '@/lib/edition-data'
import { units as orbitaleUnits } from '@/lib/orbitale-data'
import { units as syntheUnits } from '@/lib/synthe-data'
import { units as verdantUnits } from '@/lib/verdant-data'
import { units as moodUnits } from '@/lib/mood-data'
import { units as yunaUnits } from '@/lib/yuna-data'
import { shiftUnits } from '@/lib/shift-data'
import { homeUnits as trendHomeUnits, nanoUnits as trendNanoUnits } from '@/lib/trend-data'
import { lots as waveLots } from '@/lib/wave-data'

type Item = { status: string }

// Mapa produto (grupo_plaenge) → empreendimento/marca (gpi-tracker)
const GRUPOS: { empreendimento: string; marca: string; items: Item[] }[] = [
  { empreendimento: 'EDITION', marca: 'Plaenge', items: editionUnits },
  { empreendimento: 'ORBITALE', marca: 'Plaenge', items: orbitaleUnits },
  { empreendimento: 'SYNTHÈ', marca: 'Plaenge', items: syntheUnits },
  { empreendimento: 'VERDANT', marca: 'Plaenge', items: verdantUnits },
  { empreendimento: 'MOOD', marca: 'Vanguard', items: moodUnits },
  { empreendimento: 'YUNA', marca: 'Vanguard', items: yunaUnits },
  { empreendimento: 'SHIFT', marca: 'Vanguard', items: shiftUnits },
  { empreendimento: 'TREND HOME', marca: 'Vanguard', items: trendHomeUnits },
  { empreendimento: 'TREND NANO', marca: 'Vanguard', items: trendNanoUnits },
  { empreendimento: 'WAVE', marca: 'Vanguard', items: waveLots },
]

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const DRY = process.argv.includes('--dry-run')

const rows = GRUPOS.map((g) => {
  let disponiveis = 0
  let em_negociacao = 0
  let vendidas = 0
  for (const u of g.items) {
    if (u.status === 'available') disponiveis++
    else if (u.status === 'negotiation') em_negociacao++
    else if (u.status === 'sold') vendidas++
    // 'opportunity' (WAVE) entra só no total
  }
  return {
    empreendimento: g.empreendimento,
    marca: g.marca,
    total: g.items.length,
    disponiveis,
    em_negociacao,
    vendidas,
    synced_at: new Date().toISOString(),
  }
})

console.table(
  rows.map((r) => ({
    empreendimento: r.empreendimento,
    total: r.total,
    disponiveis: r.disponiveis,
    em_negociacao: r.em_negociacao,
    vendidas: r.vendidas,
  })),
)

async function main() {
  if (DRY) {
    console.log('\n[dry-run] nada foi gravado.')
    return
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('Erro: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env (e rode com node --env-file=.env --import tsx ...).')
    process.exit(1)
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/disponibilidade_empreendimentos`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  })

  if (!res.ok) {
    console.error('Erro no upsert:', res.status, await res.text())
    process.exit(1)
  }

  console.log(`\n✅ Sincronizado: ${rows.length} empreendimentos em disponibilidade_empreendimentos.`)
}

main()
