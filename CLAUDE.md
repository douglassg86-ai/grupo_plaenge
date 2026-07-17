# Grupo Plaenge — Contexto do Projeto

## Repositório & Caminhos
- **GitHub:** `douglassg86-ai/grupo_plaenge` · **Produção:** `grupo-plaenge.vercel.app`
- **Local:** `/Users/douglasgoncalves/Desktop/grupo_plaenge`
- **Assets fonte:** `/Users/douglasgoncalves/Desktop/SITE PRODUTOS/Produtos/`
- **Disponibilidade (xlsx):** `/Users/douglasgoncalves/Desktop/SITE PRODUTOS/DISPONIBILIDADE/`
- **Tabelas de pagamento (PDF):** pasta `ajustes/TABELAS JULHO/` no projeto local (atualizar mensalmente)
- **Books PDF:** `/Users/douglasgoncalves/Desktop/SITE PRODUTOS/BOOKS/` (alguns dentro da pasta do produto)

## Stack
Next.js 14 (App Router, Turbo) · TypeScript · Tailwind CSS · shadcn/ui

## Estrutura de cada produto
```
src/app/[produto]/page.tsx                    ← metadata + import do client
src/components/[produto]/home-page-client.tsx ← página completa
src/components/[produto]/unit-grid.tsx        ← grid de disponibilidade
src/lib/[produto]-data.ts                     ← dados das unidades (do xlsx)
public/[PRODUTO]/                             ← imagens WebP + logo PNG  (MAIÚSCULO)
public/[PRODUTO]/plantas/                     ← plantas WebP
```

## Componentes shared (SEMPRE usar — nunca recriar inline)
```
shared/gallery-viewer.tsx   ← GalleryViewer
shared/plants-viewer.tsx    ← PlantsViewer
shared/product-header.tsx   ← ProductHeader (logo + dropdown, z-[60])
shared/payment-breakdown.tsx← PaymentBreakdown (condições no modal)
shared/product-links.tsx    ← ProductLinks (materiais corretor + link cliente)
ui/lightbox.tsx             ← Lightbox integrado nos viewers
whatsapp-button.tsx         ← botão flutuante (só com cookie 'manager')
```
- **Sempre** `<ProductHeader>` · `<WhatsappButton>` · `<ProductLinks>` em todo home-page-client
- `<WhatsappButton>` e `<ProductLinks>` dentro de `{!isClientePage && ...}`
- Todo home-page-client aceita `isClientePage?: boolean`
- Sempre criar `/[produto]/cliente/page.tsx` com `isClientePage` prop

## Regras críticas
1. **Pastas public em MAIÚSCULO** — Linux é case-sensitive no Vercel
2. **Imagens sempre WebP** — `magick img.jpg -resize "1920x>" -quality 82 out.webp`
3. **object-position** — sempre `style={{ objectPosition: '...' }}` inline (classes Tailwind arbitrárias não geram CSS em produção)
4. **Grid de disponibilidade** — botões mostram **código** da unidade; metragem só no modal
5. **Prumada** — sempre 2 últimos dígitos do `Codigo` do xlsx (campo Prumada do xlsx é 0-9 e se repete)
6. **Excluir slug** do `[slug]/page.tsx` `generateStaticParams` ao criar rota dedicada
7. **Atualizar** `src/lib/data.ts` e `src/lib/placeholder-images.json` ao adicionar produto
8. **'use client'** deve ser sempre a primeira linha — nunca inserir imports antes
9. **Hydration mismatch** — nunca `Math.random()` / `shuffle` no `useState` initializer; mover para `useEffect`
10. **Route Handlers** — sempre `await` operações async antes do `return response`
11. **Admin push rejected** — antes de push, `git pull --rebase` (admin commita diretamente no GitHub)
12. **EDITION tem duas torres** — `'Torre Jardim Cristofel'` e `'Torre Doutor Vale'`, ambas no mesmo `edition-data.ts`. Os códigos de andar se repetem (ex. `'0701'` existe em cada torre). Ao mapear código→ID sempre filtrar por campo `tower`. Atualizar preços e disponibilidade por `id`, nunca só por código.

## Condições de pagamento (tabela julho/2026)
| Produto | Plano |
|---------|-------|
| YUNA | Entrada 15%(5x) · Mensais 10%(13x) · Reforços 15%(2x) · Financiamento 60% (42%+18,3% pós) |
| EDITION | Entrada 20%(4x) · Mensais 15%(21x) · Reforços 15%(3x) · Financiamento 50% (40%+10% pós) |
| MOOD | Entrada 20%(1x) · Financiamento 80% |
| ORBITALE | Entrada 40%(1x) · Financiamento 60% |
| VERDANT | Entrada 15%(5x) · Mensais 10%(5x) · Reforços 10%(2x) · Financiamento 65% |
| TREND Home | Entrada 15%(5x) · Mensais 10%(22x) · Reforços 15%(3x) · Financiamento 60% (55%+5,5% pós) |
| TREND Nano | Entrada 14%(4x) · Mensais 12,5%(1x) · Reforços 12,5%(1x) · Financiamento 61% |
| WAVE | Entrada 10%(1x) · 30 Dias 10%(1x) · Financiamento 80% |
| SHIFT | Entrada 12,5%(5x) · Mensais 9%(29x) · Reforços 13,5%(3x) · Financiamento 65% |
| SYNTHÈ | Pré-lançamento — sem condições |

Sempre somar "Pós Finan" ao Financiamento. Todos os % devem somar 100%.

## Atualização mensal de preços e disponibilidade
1. PDFs das tabelas entram na pasta `ajustes/TABELAS JULHO/` (ou mês correspondente)
2. Usar `pdfplumber` para extrair preços — formato BRL com espaços: `re.sub(r'R\$\s*','',v).replace(' ','').replace('.','').replace(',','.')` → `int(float(...))`
3. Unidades **ausentes** do PDF = vendidas. Unidades **presentes** = disponíveis.
4. `availability-overrides.json` é keyed por **id numérico** da unidade (não código). Sempre buscar por `id`.
5. Ao atualizar preços linha a linha (não por replace em massa), usar o campo `id` para identificar a unidade unicamente — especialmente na EDITION onde o mesmo código existe em duas torres.
6. SHIFT não tem preço por unidade no `shift-data.ts` — não atualizar preços (usa `soldCodes` set inline).
7. WAVE tem preços como string BRL com decimais (`'523.494,93'`) — preservar casas decimais ao atualizar.

## Apresentações fullscreen — TREND DOWNTOWN
- **Arquivos:** `src/components/trend/presentation-mode-nano.tsx` (NANO + OFFICE, 46 slides) e `presentation-mode-home.tsx` (HOME Torre 1, 37 slides)
- **Ativação:** botões em `src/components/trend/home-page-client.tsx` dentro de `{!isClientePage}`
- **Identidade visual:** NANO = dark (#0A0A0A) + copper (#D4785A) + Montserrat · HOME = cream (#F5F2EE) + vermelho (#C1422A) + Raleway
- **Slide types:** `cover | image | chapter | text | grid` — `grid` mostra todas as plantas numa tela só
- **`whiteBg?: boolean`** em slides `image`: quando `true`, fundo branco e texto escuro (usar em plantas e implantações com fundo branco para evitar recorte quadrado visível)
- **Guard teclado:** `if (currentSlide < SLIDES.length - 1) onNext()` — nunca avançar além do último slide
- **Bug branch switch:** `key={branch}` em `<GalleryViewer>` e `<PlantsViewer>` para forçar remount ao trocar Nano ↔ Home (evita crash com índice de categoria inválido)
- **HOME:** Torre 1 apenas · lazer no **3º Pavimento** · 3 plantas (109 m² / 77 m² / 88 m²) · sem rosa dos ventos

## TREND NANO — Metragens das plantas (verificado no book)
| Arquivo (PNB_PB_0X) | Tipo | Metragem | Finais |
|---|---|---|---|
| 07 — 01A | Studio | 23,63 m² | 07 a 16 |
| 08 — 02B | Studio | 32,06 m² | 01–04 e 20–23 |
| 09 — 03B | Studio | 28,39 m² | 06 e 17 |
| 10 — 04  | Studio | 34,72 m² | 05 e 19 |
| 11 — 05  | Studio Terraço | 53,69 m² | Final 18 · pav. 11°/13°/15° |
| 12 — 06  | Studio Terraço | 49,85 m² | Final 15 · pav. 11° |
| 13 — 07  | Studio Terraço | 49,85 m² | Final 21 · pav. 11° |

Book Nano: `/Users/douglasgoncalves/Desktop/IA 22-06-26/ajustes/book trend nano.pdf` (47 páginas · plantas nas págs. 35–41)

## SYNTHÈ — Mont'Serrat
- **Bairro:** Mont'Serrat (NÃO Petrópolis)
- **Apostrofe em JS:** strings JS com `Mont'Serrat` DEVEM usar aspas duplas (`"Mont'Serrat"`), nunca aspas simples — a aspa simples interna quebra o parser webpack e gera Syntax Error no build Vercel
- **JSX text e JSON:** apóstrofe é seguro em texto JSX e em valores JSON (JSON usa aspas duplas por padrão)

## Observações críticas
- **ProductHeader z-index:** `z-[60]`, backdrop `z-[55]`, menu `z-[60]` — nunca `z-20` (section do conteúdo também é `z-20` e venceria por ordem DOM)
- **Tradução automática:** `<html lang="pt-BR" translate="no">` + `<meta name="google" content="notranslate">` — nunca voltar para `lang="en"`
- **SiteHeader:** altura via `style={{ height: '44px' }}` inline
- **SYNTHÈ penthouse:** apenas no **18º andar** (17º = tipo padrão, sem rooftop)
- **TREND NANO prumada:** últimos 2 dígitos do código (01–23)
- **Books PDF em imagem:** pdftotext retorna vazio → usar PyMuPDF (`import fitz`) para renderizar páginas como JPG e depois `Read` tool nas imagens. Exemplo: `doc=fitz.open(path); pix=page.get_pixmap(matrix=fitz.Matrix(150/72,150/72)); pix.save('page.jpg')`
- **ImageMagick v7:** usar `magick` (não `convert`) · `openpyxl` para xlsx · `inkscape` para .ai → PNG
- **GA4:** `G-235EYLPY74` via `next/script` strategy `afterInteractive` em `layout.tsx`
- **Vercel deploy:** automático ~2 min após push na main

## Referências detalhadas
- **Produtos (notas, vídeos, contagens):** `docs/produtos.md`
- **Padrões de código (interfaces, xlsx, UnitGrid, badges):** `docs/padroes.md`
- **Admin, Gestores, Slideshow home:** `docs/sistemas.md`
