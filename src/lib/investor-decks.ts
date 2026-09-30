// Apresentações para investidores publicadas no projeto Vercel "plaenge-investidores"
// (o conteúdo não fica neste repositório). Cada grupo tem rota e contagens próprias no
// Redis: chaves de conteúdo em content:click:{product}:… e o resto em {prefix}:….
// O grupo 1 usa as chaves originais (sem sufixo) — não renomear.
export const INVESTOR_DECKS = {
  g1: { label: 'Grupo 1', path: '/investidores', product: 'INVESTIDORES', prefix: 'inv', since: '2026-09-29' },
  g2: { label: 'Grupo 2', path: '/investidores2', product: 'INVESTIDORES 2', prefix: 'inv2', since: '2026-09-30' },
} as const

export type InvestorDeck = keyof typeof INVESTOR_DECKS
export const INVESTOR_DECK_IDS = Object.keys(INVESTOR_DECKS) as InvestorDeck[]
export const isInvestorDeck = (v: unknown): v is InvestorDeck =>
  typeof v === 'string' && (INVESTOR_DECK_IDS as string[]).includes(v)
