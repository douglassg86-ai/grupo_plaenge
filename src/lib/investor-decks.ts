// Apresentações publicadas fora deste repositório (projetos Vercel privados): para investidores
// em "plaenge-investidores" (com senha) e a do Serena by Breton para corretores em "plaenge-serena"
// (link aberto). Cada uma tem rota e contagens próprias no Redis: chaves de conteúdo em
// content:click:{product}:… e o resto em {prefix}:….
// O grupo 1 usa as chaves originais (sem sufixo) — não renomear.
// kind: 'investidores' aparece na aba Investidores (botões de grupo); 'corretores' tem aba própria.
export const INVESTOR_DECKS = {
  g1: { label: 'Grupo 1', path: '/investidores', product: 'INVESTIDORES', prefix: 'inv', since: '2026-09-29', kind: 'investidores' },
  g2: { label: 'Grupo 2', path: '/investidores2', product: 'INVESTIDORES 2', prefix: 'inv2', since: '2026-09-30', kind: 'investidores' },
  serena: { label: 'Serena by Breton', path: '/serena', product: 'SERENA', prefix: 'serena', since: '2026-10-01', kind: 'corretores' },
} as const

export type InvestorDeck = keyof typeof INVESTOR_DECKS
export const INVESTOR_DECK_IDS = Object.keys(INVESTOR_DECKS) as InvestorDeck[]
/** Só as apresentações para investidores (botões de grupo da aba Investidores). */
export const INVESTOR_GROUP_IDS = INVESTOR_DECK_IDS.filter(id => INVESTOR_DECKS[id].kind === 'investidores')
export const isInvestorDeck = (v: unknown): v is InvestorDeck =>
  typeof v === 'string' && (INVESTOR_DECK_IDS as string[]).includes(v)
