# Grupo Plaenge — Contexto do Projeto

## Repositório
- **GitHub:** `douglassg86-ai/grupo_plaenge`
- **Produção:** `grupo-plaenge.vercel.app`
- **Local:** `/Users/douglas/Desktop/grupo_plaenge`
- **Assets fonte:** `/Users/douglas/Desktop/SITE PRODUTOS/Produtos/`
- **Disponibilidade (xlsx):** `/Users/douglas/Desktop/SITE PRODUTOS/DISPONIBILIDADE/`
- **Books PDF:** `/Users/douglas/Desktop/SITE PRODUTOS/BOOKS/` (alguns ficam dentro da pasta do produto)

## Stack
Next.js 14 (App Router, Turbo), TypeScript, Tailwind CSS, shadcn/ui

## Padrões estabelecidos

### Estrutura de cada produto
```
src/app/[produto]/page.tsx                         ← metadata + import do client
src/components/[produto]/home-page-client.tsx      ← página completa
src/components/[produto]/unit-grid.tsx             ← grid de disponibilidade
src/lib/[produto]-data.ts                          ← dados das unidades (do xlsx)
public/[PRODUTO]/                                  ← imagens WebP + logo PNG
public/[PRODUTO]/plantas/                          ← plantas WebP
```

### Componentes compartilhados (SEMPRE usar)
```
src/components/shared/gallery-viewer.tsx   ← GalleryViewer com lightbox integrado
src/components/shared/plants-viewer.tsx    ← PlantsViewer com lightbox integrado
src/components/ui/lightbox.tsx             ← Lightbox (zoom scroll/pinch/drag, ESC, ←→)
```
**Nunca criar funções Gallery/Plants inline** — importar sempre os componentes shared.

### Interfaces dos componentes shared
```tsx
// GalleryViewer e PlantsViewer aceitam:
interface Category { label: string; images: { src: string; alt: string }[] }
<GalleryViewer categories={galleryCategories} />
<PlantsViewer categories={plantCategories} />
```

### Regras críticas
1. **Pastas public em MAIÚSCULO** (ex: `/public/EDITION/`) — Linux é case-sensitive no Vercel
2. **Imagens sempre WebP** — `magick img.jpg -resize "1920x>" -quality 82 out.webp` (usar `magick`, não `convert`)
3. **Logos via Inkscape CLI:** `inkscape logo.ai --export-type=png --export-background-opacity=0 --export-dpi=150 --export-filename=out.png`
4. **Plantas com metragem na legenda** — extrair do book PDF com `pdftotext`; books em imagem → ler com Read tool (PDF visual)
5. **Grid de disponibilidade:** botões mostram **código da unidade** (coluna "Codigo" do xlsx), metragem aparece no **modal ao clicar**
6. **Unir todas as planilhas** do mesmo produto numa só disponibilidade
7. **Excluir slug do `[slug]/page.tsx` `generateStaticParams`** — evitar conflito com rota dedicada
8. **Atualizar `src/lib/data.ts`** — slug do produto para apontar para nova rota
9. **Atualizar `src/lib/placeholder-images.json`** — heroImageId do card para usar imagem real WebP

### Estrutura da página (padrão visual)
```
Header (logo Plaenge centralizado, absoluto)
Hero (h-[70vh], imagem fill, gradiente bottom, logo produto + cidade embaixo)
Container -mt-8, space-y-2:
  ├── Card chamada (bg-primary, texto central)
  ├── Card sobre (grid 2 cols: texto + imagem, créditos em lista)
  ├── Card tipologias (tabela com tipo/área/unidades)
  ├── Card galeria → <GalleryViewer categories={...} />
  ├── Card plantas → <PlantsViewer categories={...} />
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
- **Pré-lançamento:** status 'available' para todos, sem preço, modal mostra "Cadastrar Interesse via WhatsApp"

### Interface Unit (padrão)
```ts
export interface Unit {
  id: number; code: string; type: string; floor: number;
  prumada: string; area: number; price: number;
  status: 'available' | 'sold' | 'negotiation';
  setor?: string; // apenas se multi-torre/setor
}
```

## Produtos — Status

### ✅ Concluídos
| Produto | Rota | Unidades | Cidade | Obs |
|---------|------|----------|--------|-----|
| WAVE Home Resort | `/wave` | lotes | Xangri-lá | original do projeto |
| SHIFT | `/shift` | 184 | Porto Alegre | original do projeto |
| EDITION Moinhos | `/edition` | 48 (2 torres) | Porto Alegre | 31 img, 9 plantas |
| MOOD Central Parque | `/mood` | 192 (principal+permuta) | Porto Alegre | 20 img, 4 plantas |
| ORBITALE | `/orbitale` | 26 | Porto Alegre | 55 img, 12 plantas, decorado |
| VERDANT | `/verdant` | 54 (Torre+Casas) | Porto Alegre | 64 img, 15 plantas, decorado |
| YUNA Jardim Botânico | `/yuna` | 83 | Porto Alegre | Vanguard, R. Felizardo Furtado 348, 22 img, 12 plantas |
| TREND DOWNTOWN | `/trend` | 100 Home + 259 Nano | Porto Alegre | Página única, tabs Home/Nano, Torre 2 = futuro lançamento |
| SYNTHÈ | `/synthe` | 32 pré-lançamento | Porto Alegre | Plaenge+TGD, R. Pedro Ivo 550, Petrópolis, 3 img, 1 planta |

### Slugs excluídos do `[slug]/page.tsx` generateStaticParams
```ts
['wave', 'edition', 'mood', 'orbitale', 'verdant', 'yuna', 'trend', 'synthe']
```

### Notas por produto
- **YUNA:** Vanguard · 14 andares · 6 prumadas · sem book PDF → book estava em pasta separada
- **TREND:** `homeUnits` (VS006B6) + `nanoUnits` (VS006B1) em `trend-data.ts`; Torre 2 não lançada (ref. "futuro lançamento"); Office e Mall = informativos sem xlsx
- **SYNTHÈ:** pré-lançamento, book PDF em imagem (sem texto), andares 3–18, penthouse andares 17–18; `synthe-data.ts` gerado manualmente

## Ferramentas instaladas
- `inkscape` — exportar logos .ai → PNG
- `magick` (ImageMagick v7) — converter imagens (**usar `magick`, não `convert`**)
- `cwebp` — converter para WebP (alternativa)
- `pdftotext` (poppler) — extrair texto dos books PDF (só funciona em PDFs com texto)
- `openpyxl` (Python) — ler planilhas xlsx
- Para books em PDF de imagem: usar `Read tool` com parâmetro `pages` (máx 20 por chamada)

## Observações importantes
- Plantas do VERDANT têm caracteres especiais (©, acentos) nos nomes — funciona no Vercel
- TREND DOWNTOWN: dois data files distintos (`homeUnits` e `nanoUnits`) no mesmo `trend-data.ts`
- SYNTHÈ: `synthe-data.ts` gerado manualmente (sem xlsx) — 32 unidades, todos `status: 'available'`, sem campo `price`
- Books PDF em imagem → pdftotext retorna vazio → usar `Read` tool visual
- ImageMagick v7 instalado: usar `magick` (não `convert`)
- O servidor de preview roda em porta 9002 (launch.json configurado na porta 3456 mas preview tool usa 9002)
- Ao fazer push, Vercel faz deploy automático em ~2 min
