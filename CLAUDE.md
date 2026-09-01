# Grupo Plaenge — Contexto do Projeto

## Repositório & Caminhos
- **GitHub:** `douglassg86-ai/grupo_plaenge` · **Produção:** `grupo-plaenge.vercel.app`
- **Local:** `/Users/douglasgoncalves/Desktop/IA 22-06-26/grupo_plaenge`
- **Assets fonte:** `/Users/douglasgoncalves/Desktop/SITE PRODUTOS/Produtos/`
- **Disponibilidade (xlsx):** `/Users/douglasgoncalves/Desktop/SITE PRODUTOS/DISPONIBILIDADE/`
- **Tabelas de pagamento (PDF):** pasta `ajustes/TABELAS SETEMBRO/` no projeto local (atualizar mensalmente — renomear pasta para o mês corrente)
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
- **Exceção SHIFT:** não tem `src/app/shift/page.tsx` dedicado — a home é servida pela rota dinâmica `src/app/[slug]/page.tsx` a partir da entrada `slug: 'shift'` em `src/lib/data.ts`. Só `cliente/` e `pptcorretor/` são rotas próprias.

## Componentes shared (SEMPRE usar — nunca recriar inline)
```
shared/gallery-viewer.tsx             ← GalleryViewer
shared/plants-viewer.tsx              ← PlantsViewer
shared/product-header.tsx             ← ProductHeader (logo + dropdown, z-[60])
shared/payment-breakdown.tsx          ← PaymentBreakdown (condições no modal)
shared/product-links.tsx              ← ProductLinks (materiais corretor + link cliente)
shared/implantacao-floor-selector.tsx ← seletor de pavimento sobre a implantação
ui/lightbox.tsx                       ← Lightbox integrado nos viewers
whatsapp-button.tsx                   ← botão flutuante (só com cookie 'manager')
```
- **Sempre** `<ProductHeader>` · `<WhatsappButton>` · `<ProductLinks>` em todo home-page-client
- `<WhatsappButton>` e `<ProductLinks>` dentro de `{!isClientePage && ...}`
- Todo home-page-client aceita `isClientePage?: boolean`
- Sempre criar `/[produto]/cliente/page.tsx` com `isClientePage` prop

## ui/ disponíveis (agosto/2026 — após limpeza)
Apenas estes existem em `src/components/ui/`:
`accordion` · `alert` · `alert-dialog` · `badge` · `button` · `card` · `carousel` · `collapsible` · `dialog` · `form` · `label` · `lightbox` · `progress` · `select` · `separator` · `skeleton` · `switch` · `table` · `tabs` · `toast` · `toaster` · `tooltip`
**Removidos em ago/2026** (nunca instalar novamente sem uso confirmado): avatar · calendar · chart · checkbox · dropdown-menu · input · menubar · popover · radio-group · scroll-area · sheet · sidebar · slider · textarea
**Também removidos:** `src/firebase/` (pasta inteira) · `src/ai/dev.ts` · `src/hooks/use-mobile.tsx` · componentes wave sem uso (community-popup, executive-contact) · aquavista-page · floating-whatsapp-button · icons

## Regras críticas
1. **Pastas public em MAIÚSCULO** — Linux é case-sensitive no Vercel
2. **Imagens sempre WebP** — `magick img.jpg -resize "1920x>" -quality 82 out.webp`
3. **object-position** — sempre `style={{ objectPosition: '...' }}` inline (classes Tailwind arbitrárias não geram CSS em produção)
4. **Grid de disponibilidade** — botões mostram **código** da unidade; metragem só no modal
5. **Prumada** — sempre 2 últimos dígitos do `Codigo` do xlsx (campo Prumada do xlsx é 0-9 e se repete)
6. **Excluir slug** do `[slug]/page.tsx` `generateStaticParams` ao criar rota dedicada
7. **Atualizar** `src/lib/data.ts` e `src/lib/placeholder-images.json` ao adicionar produto
8. **'use client'** deve ser sempre a primeira linha — nunca inserir imports antes
9. **Hydration mismatch** — nunca `Math.random()` / `shuffle` no `useState` initializer; mover para `useEffect`. Também nunca usar `<style>{cssString}</style>` (React escapa como texto e diverge entre SSR/cliente) — usar sempre `<style dangerouslySetInnerHTML={{ __html: cssString }} />`
10. **Route Handlers** — sempre `await` operações async antes do `return response`
11. **Admin push rejected** — antes de push, `git pull --rebase` (admin commita diretamente no GitHub)
12. **EDITION tem duas torres** — `'Torre Jardim Cristofel'` e `'Torre Doutor Vale'`, ambas no mesmo `edition-data.ts`. Os códigos de andar se repetem (ex. `'0701'` existe em cada torre). Ao mapear código→ID sempre filtrar por campo `tower`. Atualizar preços e disponibilidade por `id`, nunca só por código.

## Condições de pagamento (tabela setembro/2026)
| Produto | Plano |
|---------|-------|
| YUNA | Entrada 15%(5x) · Mensais 10%(10x) · Reforços 15%(2x) · Financiamento 60% (39%+20,9% pós 23x) |
| EDITION | Entrada 20%(4x) · Mensais 15%(19x) · Reforços 15%(3x) · Financiamento 50% (pós 15x incluso) |
| MOOD | Entrada 20%(1x) · Financiamento 80% |
| ORBITALE | **100% Vendido** — sem tabela |
| VERDANT | Entrada 15%(5x) · Mensais 10%(3x) · Reforços 10%(2x) · Financiamento 65% |
| TREND Home | Entrada 15%(5x) · Mensais 10%(20x) · Reforços 15%(3x) · Financiamento 60% (54%+6,2% pós 13x) |
| TREND Nano | Entrada 20%(3x) · Financiamento 80% |
| WAVE | Entrada 10%(1x) · 30 Dias 10%(1x) · Financiamento 80% |
| SHIFT | Entrada 12,5%(5x) · Mensais 9%(27x) · Reforços 13,5%(3x) · Financiamento 65% |
| SYNTHÈ | Entrada 12,5%(5x) · Mensais 15%(30x) · Reforços 12,5%(5x) · Saldo 60% (58,55%+1,45% pós 3x) |

Sempre somar "Pós Finan" ao Financiamento. Todos os % devem somar 100%.

## Atualização mensal de preços e disponibilidade
1. PDFs das tabelas entram na pasta `ajustes/TABELAS SETEMBRO/` (renomear para o mês corrente a cada atualização)
2. Usar `pdfplumber` para extrair preços — formato BRL com espaços: `re.sub(r'R\$\s*','',v).replace(' ','').replace('.','').replace(',','.')` → `int(float(...))`
3. Unidades **ausentes** do PDF = vendidas. Unidades **presentes** = disponíveis.
4. `availability-overrides.json` é keyed por **id numérico** da unidade (não código). Sempre buscar por `id`.
5. Ao atualizar preços linha a linha (não por replace em massa), usar o campo `id` para identificar a unidade unicamente — especialmente na EDITION onde o mesmo código existe em duas torres.
6. **SHIFT** — preços em `src/lib/payment-data.ts` (não em `shift-data.ts`). Ao atualizar, recalcular todos os campos com as fórmulas exatas: `dp = total × 0,025` · `mi = total × 0,09/27` · `rf = total × 0,045` · `fb = total × 0,65`. Verificar: `5×dp + 27×mi + 3×rf + fb = total`. Disponibilidade via `soldCodes` Set em `shift-data.ts` + `availability-overrides.json` chave `"shift"`.
7. WAVE tem preços como string BRL com decimais (`'523.494,93'`) — preservar casas decimais ao atualizar.
8. **Auditoria obrigatória pós-atualização:** cruzar PDF × dados para cada produto — usar `extract_pdf_codes()` com `re.match(r'^\d{3,4}$', c)` + `.zfill(4)` (códigos do PDF não têm zero à esquerda). Verificar: (a) unidades marcadas available mas ausentes do PDF → corrigir para sold; (b) unidades presentes no PDF mas marcadas sold nos dados → corrigir para available. Após corrigir status, revisar `availability-overrides.json` para remover overrides conflitantes ou redundantes.
9. **ORBITALE:** 100% Vendido desde setembro/2026 — sem tabela. Página mostra card de encerramento; card na home tem ribbon vermelho (`deliveryLabel: '100% Vendido'`).
10. **WAVE lotes vendidos:** lotes com `price: 0` (quadras sem entradas no `lotData`) devem ser desabilitados no `lot-grid.tsx` — guard `disabled={lot.status === 'sold' || lot.price === 0}`. Overrides no `availability-overrides.json` para lotes sem preço devem ser removidos.

## Apresentações fullscreen
Existem apresentações em **5 produtos** (mais 1 institucional e 1 multi-produto) — nem todos seguem o mesmo formato. Antes de criar uma nova, decida se ela é do tipo "roteiro de slides" (TREND/VERDANT, para cliente final) ou "PPT corretor" (SYNTHÈ/SHIFT/PPT-PORTIFOLIO, foco comercial/institucional).

### TREND DOWNTOWN
- **Arquivos:** `src/components/trend/presentation-mode-nano.tsx` (NANO + OFFICE, 46 slides) e `presentation-mode-home.tsx` (HOME Torre 1, 37 slides)
- **Ativação:** botões em `src/components/trend/home-page-client.tsx` dentro de `{!isClientePage}`
- **Identidade visual:** NANO = dark (#0A0A0A) + copper (#D4785A) + Montserrat · HOME = cream (#F5F2EE) + vermelho (#C1422A) + Raleway
- **Landing de seleção (agosto/2026):** `/trend` abre tela split-screen com dois botões antes de qualquer conteúdo. Estado `selected: Branch | null` em `home-page-client.tsx` — `null` = landing, branch definido = produto. Deep-link via `?t=nano` ou `?t=home` pula a landing. Botão flutuante fixo "← Trocar produto" retorna à landing chamando `goToLanding()`. Componente `TrendLanding` renderizado no early return `if (selected === null)`. Função `selectBranch` (da landing) vs `changeBranch` (troca dentro do produto — mantém `selected` definido).
- **Slide types (`kind`):** `cover | image | chapter | text | grid` — `grid` mostra todas as plantas numa tela só
- **`whiteBg?: boolean`** em slides `image`: quando `true`, fundo branco e texto escuro (usar em plantas e implantações com fundo branco para evitar recorte quadrado visível)
- **Guard teclado:** `if (currentSlide < SLIDES.length - 1) onNext()` — nunca avançar além do último slide
- **Bug branch switch:** `key={branch}` em `<GalleryViewer>` e `<PlantsViewer>` para forçar remount ao trocar Nano ↔ Home (evita crash com índice de categoria inválido)
- **HOME:** Torre 1 apenas · lazer no **3º Pavimento** · 3 plantas (109 m² / 77 m² / 88 m²) · sem rosa dos ventos

### VERDANT
- **Arquivo:** `src/components/verdant/presentation-mode.tsx` (~63 slides)
- **Identidade visual:** dark (#0A0A08) + verde escuro (#0F1A0F) + dourado (#B8945A)
- **Slide types (`kind`):** `cover | image | chapter | text` — `text` aceita `stats` (cards numéricos) e `cols` (duas colunas de itens)
- Mesmo padrão estrutural do TREND (array `SLIDES: Slide[]` tipado + componente único de render), mas sem o tipo `grid`

### SYNTHÈ — PPT corretor
- **Arquivo:** `src/components/synthe/ppt-corretor.tsx` (rota própria `src/app/synthe/pptcorretor/page.tsx`, não é botão dentro da home)
- **Identidade visual:** dark (#1A1A1A) + vermelho (#C1422A) + creme (#F5F2EE)
- **Slide types (`kind`):** `capa | imersiva | highlight | gallery | evento | corretores | book | cta` — voltado para argumentação comercial (evento de lançamento, prova social de corretores), não é o mesmo roteiro "produto" do TREND/VERDANT

### SHIFT — PPT corretor
- **Arquivo:** `src/components/shift/ppt-corretor.tsx` (rota própria `src/app/shift/pptcorretor/page.tsx`)
- **Identidade visual:** dark (#0D0D0D) + terracota (#A43A25) + areia (#F0EDE8)
- **Slide types (`kind`):** `capa | cidade | condicoes | gallery | video | cta`

### PPT-PORTIFOLIO (institucional, todos os produtos)
- **Arquivo:** `src/components/ppt-portifolio.tsx` (rota `src/app/pptportifolio/page.tsx`)
- Apresentação institucional Plaenge cobrindo o portfólio inteiro (inclui menções a **YVY**, produto ainda sem página própria no site — só existe nesse PPT)
- Usa paleta própria por seção (não segue a identidade de um produto específico)

### PPT-OPORTUNIDADE (multi-produto, campanhas cruzadas)
- **Arquivo:** `src/components/ppt-oportunidade.tsx` (rota `src/app/dacas_ppt_oportunidade/page.tsx`)
- Apresentação de vendas cruzando **VERDANT + TREND NANO + SYNTHÈ** numa única campanha (usada para pautas específicas: últimas unidades, INCC congelado, retomada de campanha de corretores etc.)
- **Padrão:** array `SLIDES: Slide[]` tipado com `kind` (`cover | chapter | hero | stat | plan | diff | payment | campaign | car | cta`) + `theme: 'verdant' | 'nano' | 'synthe' | 'neutral'` por slide, com paleta de cor por produto (`THEMES` map) para dar identidade a cada seção dentro da mesma apresentação
- Slide `stat` é o "número gigante de impacto" (`clamp(5rem,13vw,12rem)`), reaproveitado em vários pontos (unidades restantes, preço, prazo)
- Slide `payment` renderiza um fluxo de pagamento em cards conectados por setas — feito para condições especiais tipo "4x entrada → chaves → saldo"
- Reaproveita fotos já existentes de outros produtos (ex. carros da campanha SYNTHÈ em `carro-meta1-mg4.webp` / `carro-meta2-cyberster.webp`) em vez de duplicar assets
- **Modelo de referência para novas apresentações multi-produto/multi-campanha** — copiar esse padrão em vez de criar do zero

**Ao criar uma apresentação nova:** decidir primeiro qual dos formatos seguir — array `Slide[]` tipado com `kind` + render único é o padrão de todas (TREND/VERDANT para produto único, PPT-OPORTUNIDADE para multi-produto) — e reaproveitar `GalleryViewer`/`PlantsViewer`/`Lightbox` quando fizer sentido em vez de recriar viewers de imagem.

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
