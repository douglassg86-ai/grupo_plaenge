# Produtos — Referência Detalhada

## Produtos concluídos
| Produto | Rota | Unidades | Cidade | Entrega | Obs |
|---------|------|----------|--------|---------|-----|
| WAVE Home Resort | `/wave` | lotes | Xangri-lá | Pronto para construir | original do projeto |
| SHIFT | `/shift` | 184 | Porto Alegre | Abr/2029 | [slug]/page.tsx |
| EDITION Moinhos | `/edition` | 48 (2 torres) | Porto Alegre | Jul/2028 | 31 img, 9 plantas |
| MOOD Central Parque | `/mood` | 192 | Porto Alegre | Pronto para morar | 20 img, 4 plantas, 16 prumadas/andar |
| ORBITALE | `/orbitale` | 26 | Porto Alegre | Pronto para morar | 55 img, 12 plantas, decorado |
| VERDANT | `/verdant` | 54 (Torre+Casas) | Porto Alegre | Abr/2027 | 64 img, 15 plantas, decorado, Apresentação |
| YUNA Jardim Botânico | `/yuna` | 83 | Porto Alegre | Nov/2027 | Vanguard, R. Felizardo Furtado 348, 22 img, 12 plantas |
| TREND DOWNTOWN | `/trend` | 100 Home + 259 Nano | Porto Alegre | — | tabs Home/Nano, Torre 2 = futuro |
| SYNTHÈ | `/synthe` | 32 pré-lançamento | Porto Alegre | Pré-lançamento | Plaenge+TGD, R. Pedro Ivo 550, Petrópolis |

## Slugs excluídos do `[slug]/page.tsx` generateStaticParams
```ts
['wave', 'edition', 'mood', 'orbitale', 'verdant', 'yuna', 'trend', 'synthe']
```

## Contagem de unidades (junho/2026)
| Produto | Total | Observação |
|---------|-------|------------|
| MOOD | 192 | 144 (jun) + 48 (mai permuta) — permuta andares 3,7,10 |
| EDITION | 48 | 22 T1 + 26 T2 |
| ORBITALE | 26 | |
| VERDANT | 54 | 50 Torre + 4 Casas |
| YUNA | 83 | |
| TREND HOME | 100 | |
| TREND NANO | 259 | prumada = últimos 2 dígitos do código (01-23) |

## Vídeos por produto (YouTube — entre PLANTAS e DIFERENCIAIS)
| Produto | Vídeo | URL embed |
|---------|-------|-----------|
| MOOD | Empreendimento | `youtube.com/embed/4HXz8s6_eUA` |
| MOOD | Decorado | `youtube.com/embed/e-ytZ5FR6ok` |
| YUNA | Empreendimento | `youtube.com/embed/joyIU3Bn1G4` |
| EDITION | Empreendimento | `youtube.com/embed/BVe_pgH-32o?start=14` |
| ORBITALE | Empreendimento | `youtube.com/embed/Fhh3DMluoqU` |
| ORBITALE | Entrega | `youtube.com/embed/g4u-Rbwg_CA` |
| VERDANT | Empreendimento | `youtube.com/embed/O59Ha1QWyJA` |
| TREND Nano | Empreendimento | `youtube.com/embed/KBCXAtAESWM` |
| TREND Nano | Decorado | `youtube.com/embed/a5lCfqU8UWY` |

Produtos com 1 vídeo: card full-width. Produtos com 2 vídeos: `grid md:grid-cols-2`.

## Notas por produto

**SHIFT:** usa `[slug]/page.tsx` (não tem home-page-client próprio). Galeria via `bannerImageIds`. Condições em `src/lib/payment-data.ts` (valores pré-calculados) + `src/components/availability-grid.tsx`. Disponibilidade via `soldUnits` + `reservedUnits` em `src/lib/data.ts`.

**YUNA:** Vanguard · 14 andares · 6 prumadas. Atenção: plantas Unidade II (88,68 m²) e III (72,58 m²) estavam trocadas — corrigido jun/2026. Arquivos `04/06/07_VAN_PARECI_APTO_3_DORM` = Unidade II; `03_VAN_PARECI_APTO_2_DORM` = Unidade III.

**TREND:** `homeUnits` (VS006B6) + `nanoUnits` (VS006B1) em `trend-data.ts`. Nano: prumada = últimos 2 dígitos do código (01–23). Torre 2 não lançada. Office plantas = apenas 294,88 m² e 498,95 m². Implantações integradas ao card de disponibilidade (muda com tab Home↔Nano via `onTabChange`).

**SYNTHÈ:** pré-lançamento, book PDF em imagem (sem texto). Andares 3–18. **Penthouse apenas no 18º andar** (17º = tipo padrão 176,89 m², sem rooftop). Rodapé do unit-grid: "18º andar". `synthe-data.ts` gerado manualmente — 32 unidades, todos `available`, sem `price`. 14 imagens + 7 plantas.

**EDITION:** `tower` field (não `setor`) — torres "Torre Jardim Cristofel" e "Torre Doutor Vale". Botões do unit-grid exibem **código** (ex: `0501`), metragem só no modal.

**VERDANT:** `setor` field — "Torre" e "Casas". Possui **modo Apresentação** (`src/components/verdant/presentation-mode.tsx`) — 37 slides fullscreen na ordem do book. Botão no hero, visível só para corretores (oculto em `isClientePage`). Plantas com caracteres especiais (©, acentos) nos nomes — ok no Vercel.

**WAVE:** `src/components/wave/header.tsx` re-exporta `ProductHeader`. Interface `Lot` (não `Unit`) com campos `block`, `number`. 4 status: `available | negotiation | sold | opportunity`. Usa `wave/materials.tsx` próprio (não `ProductLinks`) — inclui Site Oficial e botão "Link para Cliente". Rota `/wave/cliente` existe (`isSharePage=true`, noindex).

**MOOD:** 16 unidades por andar (prumadas 01-16). Principal em junho, permuta (andares 3,7,10) em maio.

**ORBITALE:** pronto para morar. Badge verde "✓ Pronto para morar".
