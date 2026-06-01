# Grupo Plaenge — Contexto do Projeto

## Repositório
- **GitHub:** `douglassg86-ai/grupo_plaenge`
- **Produção:** `grupo-plaenge.vercel.app`
- **Local:** `/Users/douglas/Desktop/grupo_plaenge`
- **Assets fonte:** `/Users/douglas/Desktop/SITE PRODUTOS/Produtos/`
- **Disponibilidade (xlsx):** `/Users/douglas/Desktop/SITE PRODUTOS/DISPONIBILIDADE/`

## Stack
Next.js 14 (App Router, Turbo), TypeScript, Tailwind CSS, shadcn/ui

## Padrões estabelecidos

### Estrutura de cada produto
```
src/app/[produto]/page.tsx           ← metadata + import do client
src/components/[produto]/home-page-client.tsx  ← página completa
src/components/[produto]/unit-grid.tsx         ← grid de disponibilidade
src/lib/[produto]-data.ts            ← dados das unidades (do xlsx)
public/[PRODUTO]/                    ← imagens WebP + logo PNG
public/[PRODUTO]/plantas/            ← plantas WebP
```

### Regras críticas
1. **Pastas public em MAIÚSCULO** (ex: `/public/EDITION/`) — Linux é case-sensitive no Vercel
2. **Imagens sempre WebP** — convertidas com ImageMagick: `convert img.jpg -resize "1920x>" -quality 82 out.webp`
3. **Logos via Inkscape CLI:** `inkscape logo.ai --export-type=png --export-background-opacity=0 --export-dpi=150 --export-filename=out.png`
4. **Plantas com metragem na legenda** — extrair do book PDF com `pdftotext`
5. **Grid de disponibilidade:** botões mostram **código da unidade** (coluna "Codigo" do xlsx), metragem aparece no **modal ao clicar**
6. **Unir todas as planilhas** do mesmo produto numa só disponibilidade (ex: MOOD tinha planilha principal + permuta)
7. **Excluir slug do `[slug]/page.tsx` `generateStaticParams`** — rota estática tem precedência mas evita conflito
8. **Atualizar `data.ts`** — slug do produto para apontar para nova rota
9. **Atualizar `placeholder-images.json`** — heroImageId do card para usar imagem real WebP

### Estrutura da página (padrão visual)
```
Header (logo Plaenge centralizado, absoluto)
Hero (h-[70vh], imagem fill, gradiente bottom, logo produto + cidade embaixo)
Container -mt-8, space-y-2:
  ├── Card chamada (bg-primary, texto central)
  ├── Card sobre (grid 2 cols: texto + imagem, créditos em lista)
  ├── Card tipologias (tabela com tipo/área/unidades)
  ├── Card galeria (categorias + main image 500px + thumbnails)
  ├── Card plantas (categorias + thumbnails + viewer 520px + legenda com metragem)
  ├── Grid 2 cols:
  │   ├── Card diferenciais (lista com ✓)
  │   └── Card localização (texto + iframe Google Maps 280px)
  └── Card disponibilidade (UnitGrid com summary + tabela por andar)
Footer (texto centralizado, pequeno)
```

### UnitGrid padrão
- Summary com contagem Disponíveis / Reservadas / Vendidas
- Tabela por andar (linhas) x prumada (colunas)
- Botão mostra **código** (ex: `0501`)
- Modal ao clicar: tipologia, área, andar, valor, botão WhatsApp
- Se produto tem setores/torres: tabs para alternar

## Produtos — Status

### ✅ Concluídos
| Produto | Rota | Unidades | Obs |
|---------|------|----------|-----|
| WAVE Home Resort | `/wave` | lotes | original do projeto |
| SHIFT | `/shift` | 184 | original do projeto |
| EDITION Moinhos | `/edition` | 48 (2 torres) | 31 img, 9 plantas |
| MOOD Central Parque | `/mood` | 192 (principal+permuta) | 20 img, 4 plantas |
| ORBITALE | `/orbitale` | 26 | 55 img, 12 plantas, decorado |
| VERDANT | `/verdant` | 54 (Torre+Casas) | 64 img, 15 plantas, decorado |

### 🔄 Pendentes
| Produto | Pasta | Xlsx |
|---------|-------|------|
| YUNA | `YUNA/` | `VS004A (YUNA JARDIM BOTÂNICO) VS004B1` |
| TREND DOWNTOWN HOME | `TRENDDOWNTOWN HOME/` | `VS006A (TREND DOWNTOWN) VS006B6 (TREND DOWNTOWN TORRE 1)` |
| TREND DOWNTOWN NANO | `TRENDDOWNTOWN NANO/` | `VS006A (TREND DOWNTOWN) VS006B1 (TORRE NANO)` |
| SYNTHÉ | `SYNTHÉ/` | sem book/imagens → **página pré-lançamento** |

### Produtos já migrados no data.ts (slugs atualizados)
- `edition` → `/edition`
- `mood` → `/mood`
- `orbitale` → `/orbitale`
- `verdant` → `/verdant`

## Ferramentas instaladas
- `inkscape` — exportar logos .ai → PNG
- `imagemagick` (`convert`) — redimensionar/converter imagens
- `cwebp` — converter para WebP (alternativa ao convert)
- `pdftotext` (poppler) — extrair texto dos books PDF
- `openpyxl` (Python) — ler planilhas xlsx

## Observações importantes
- Plantas do VERDANT têm caracteres especiais (©, acentos) nos nomes — funciona no Vercel
- SYNTHÉ: sem book nem imagens — apenas página pré-lançamento
- TREND DOWNTOWN: dois produtos separados (Home e Nano) com xlsx distintos
- O `[slug]/page.tsx` lista excluída: `['wave', 'edition', 'mood', 'orbitale', 'verdant']`
