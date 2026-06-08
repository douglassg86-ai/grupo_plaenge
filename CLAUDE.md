# Grupo Plaenge — Contexto do Projeto

## Repositório
- **GitHub:** `douglassg86-ai/grupo_plaenge`
- **Produção:** `grupo-plaenge.vercel.app`
- **Local:** `/Users/douglas/Desktop/grupo_plaenge`
- **Assets fonte:** `/Users/douglas/Desktop/SITE PRODUTOS/Produtos/`
- **Disponibilidade (xlsx):** `/Users/douglas/Desktop/SITE PRODUTOS/DISPONIBILIDADE/`
- **Última atualização de disponibilidade:** pasta `junho` (jun/2026)
- **Tabelas de vendas (condições de pagamento):** `/Users/douglas/Library/CloudStorage/GoogleDrive-douglassg86@gmail.com/Meu Drive/Douglas - Executivo de Vendas/TRANSFERÊNCIA/tabelas/`
- **Books PDF:** `/Users/douglas/Desktop/SITE PRODUTOS/BOOKS/` (alguns ficam dentro da pasta do produto)
- **Logos institucionais WebP:** `/Users/douglas/Desktop/SITE PRODUTOS/pngs logos plaenge vanguard/`
- **Fotos dos gestores (fonte):** `/Users/douglas/Desktop/contatos gestores/`

## Stack
Next.js 14 (App Router, Turbo), TypeScript, Tailwind CSS, shadcn/ui

## Analytics
- **Google Analytics 4:** `G-235EYLPY74` (propriedade "Grupo Plaenge POA")
- Implementado via `next/script` strategy `afterInteractive` em `src/app/layout.tsx`

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
src/components/shared/gallery-viewer.tsx      ← GalleryViewer com lightbox integrado
src/components/shared/plants-viewer.tsx       ← PlantsViewer com lightbox integrado
src/components/shared/product-header.tsx      ← ProductHeader (logo + dropdown navegação)
src/components/shared/payment-breakdown.tsx   ← PaymentBreakdown (condições de pagamento no modal)
src/components/ui/lightbox.tsx                ← Lightbox (zoom scroll/pinch/drag, ESC, ←→)
src/components/home-hero-slideshow.tsx         ← Slideshow do hero da home (Ken Burns + fade)
src/components/whatsapp-button.tsx             ← Botão flutuante WhatsApp (condicional ao cookie de gestor)
```
**Nunca criar funções Gallery/Plants inline** — importar sempre os componentes shared.
**Sempre usar ProductHeader** nos `home-page-client.tsx` de cada produto.
**Sempre incluir `<WhatsappButton product="NOME DO PRODUTO" />`** em todo `home-page-client.tsx`.

### Interfaces dos componentes shared
```tsx
// GalleryViewer e PlantsViewer aceitam:
interface Category { label: string; images: { src: string; alt: string }[] }
<GalleryViewer categories={galleryCategories} />
<PlantsViewer categories={plantCategories} />

// ProductHeader — sem props, já contém logo + dropdown com todos os produtos
<ProductHeader />

// WhatsappButton — aparece apenas se cookie 'manager' estiver presente
<WhatsappButton product="NOME DO PRODUTO" />

// PaymentBreakdown — exibe condições de pagamento calculadas a partir do preço
// Sempre importar e usar dentro do modal de cada unit-grid
type PaymentStep = { label: string; pct: number; count: number }
<PaymentBreakdown price={selected.price} plan={PAYMENT_PLAN} />
// count > 1 → exibe "Nx de R$ X" | count = 1 → exibe "R$ X"
// Os valores são calculados: price * pct / count (sempre somam 100% do preço)
```

### Logos institucionais em `/public/INSTITUCIONAL/`
```
logo_grupo_plaenge_claro.webp    ← header da home (fundo claro)
logo_grupo_plaenge_escuro.webp   ← fundo escuro
logo_plaenge_claro.webp          ← seção Plaenge na home
logo_plaenge_escuro.webp
logo_vanguard_claro.webp         ← seção Vanguard na home
logo_vanguard_escuro.webp
logo_plaenge_vanguard_claro.webp
logo_plaenge_vanguard_escuro.webp ← hero da home (fundo escuro/vermelho)
grafismo.webp                    ← padrão listrado decorativo
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
10. **object-position em imagens hero** — usar `style={{ objectPosition: 'center X%' }}` via style inline (NÃO usar classes Tailwind arbitrárias como `object-[center_30%]` — não geram CSS em produção)
11. **Prumada no Trend Nano e MOOD** — usar 2 últimos dígitos do código (`'0323'` → `'23'`, `'0210'` → `'10'`), NÃO o campo Prumada do xlsx (que é 0-9 e se repete)

### Estrutura da página (padrão visual)
```
<ProductHeader />   ← absoluto, z-20, logo + dropdown navegação
Hero (h-[70vh], imagem fill, gradiente bottom, logo produto + badge entrega + cidade embaixo)
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
<WhatsappButton product="NOME" />   ← antes do </footer>
Footer (texto centralizado, pequeno)
```

### Badge de entrega no hero
Inserir após a linha de bairro/cidade no hero:
```tsx
// Pronto para morar (ORBITALE, MOOD):
<span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold tracking-wide">✓ Pronto para morar</span>

// Previsão de entrega:
<span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide backdrop-blur-sm">Previsão de entrega: Mês Ano</span>
```

### UnitGrid padrão
- Summary com contagem Disponíveis / Reservadas / Vendidas
- Tabela por andar (linhas) x prumada (colunas)
- Botão mostra **código** (ex: `0501`)
- Modal ao clicar: tipologia, área, andar, valor, **condições de pagamento**, botão WhatsApp
- Se produto tem setores/torres: tabs para alternar
- **Pré-lançamento:** status 'available' para todos, sem preço, modal mostra "Cadastrar Interesse via WhatsApp"
- **`<PaymentBreakdown>`** deve ser incluído em todo unit-grid após o bloco de dados da unidade

### Condições de pagamento por produto (tabela junho/2026)
Fontes: `/Users/douglas/Library/CloudStorage/GoogleDrive-douglassg86@gmail.com/Meu Drive/Douglas - Executivo de Vendas/TRANSFERÊNCIA/tabelas/`

| Produto | Plano (pós-finan já incorporado ao Financiamento) |
|---------|---------------------------------------------------|
| YUNA | Entrada 15%(5x) · Mensais 10%(13x) · Reforços 15%(1x) · Financiamento 60% |
| EDITION | Entrada 20%(4x) · Mensais 15%(22x) · Reforços 15%(3x) · Financiamento 50% |
| MOOD | Entrada 20%(1x) · Financiamento 80% |
| ORBITALE | Entrada 40%(1x) · Financiamento 60% |
| VERDANT | Entrada 15%(5x) · Mensais 10%(6x) · Reforços 10%(2x) · Financiamento 65% |
| TREND Home | Entrada 15%(5x) · Mensais 10%(23x) · Reforços 15%(3x) · Financiamento 60% |
| TREND Nano | Entrada 11%(4x) · Mensais 8%(1x) · Reforços 6%(1x) · Financiamento 75% |
| WAVE | Entrada 10%(1x) · 30 Dias 10%(1x) · Financiamento 80% |
| SHIFT | Entrada 12,5%(5x) · Mensais 9%(30x) · Reforços 13%(3x) · Financiamento 65,5% |
| SYNTHÈ | Pré-lançamento — sem condições (sem preço definido) |

**Regra pós-financiamento:** sempre que a tabela trouxer coluna "Pós Finan" ou "Pós Saldo", somar ao Financiamento — nunca exibir coluna separada. Os percentuais acima já estão com os pós-finans incorporados.
**Verificação:** os valores calculados devem sempre somar 100% do preço da unidade.

### Interface Unit (padrão)
```ts
export interface Unit {
  id: number; code: string; type: string; floor: number;
  prumada: string; area: number; price: number;
  status: 'available' | 'sold' | 'negotiation';
  setor?: string; // apenas se multi-torre/setor
}
```

### Geração de dados a partir do xlsx
```python
import openpyxl
def status(s):
    s = str(s) if s else ''
    if 'Disponivel' in s: return 'available'
    if 'Reservada' in s: return 'negotiation'
    return 'sold'

wb = openpyxl.load_workbook("arquivo.xlsx")
ws = wb.active
for row in ws.iter_rows(min_row=2, values_only=True):
    id_, st, code, tipo, floor, prumada, area, vlr, *_ = row
    # Prumada correta: sempre últimos 2 dígitos do código
    p = str(code)[-2:]
```
Colunas do xlsx: `Id Produto | Status Mega | Codigo | Tipologia | Andar | Prumada | Area Privativa | Vlr Tabela | Vlr Minimo`

**ATENÇÃO:** o campo `Prumada` do xlsx é 0-9 e se repete quando há mais de 10 unidades por andar. Sempre derivar a prumada dos últimos 2 dígitos do `Codigo`.

## Sistema de Admin de Disponibilidade

### Arquitetura (Option B — GitHub API commit)
- **Página admin:** `grupo-plaenge.vercel.app/admin` — protegida por senha
- **Senha:** `plaenge.peano2026`
- **Arquivo de overrides:** `src/data/availability-overrides.json`
  - Estrutura: `{ "edition": { "106507": "sold" }, "mood": {}, ... }`
  - Chaves: `edition`, `mood`, `orbitale`, `synthe`, `trend_home`, `trend_nano`, `verdant`, `yuna`, `wave`
  - Cada `*-data.ts` aplica os overrides via função `applyOv()` no build
- **API route:** `POST /api/admin/commit` — autentica, busca SHA no GitHub, commita JSON
- **Fluxo:** admin altera status → salva → API commita JSON no GitHub → Vercel redeploya (~2 min)
- **Variáveis de ambiente no Vercel:**
  - `ADMIN_PASSWORD=plaenge.peano2026`
  - `GITHUB_TOKEN=<token configurado no Vercel — ver Settings → Environment Variables>`
- **WAVE** tem 4 status: `available | negotiation | sold | opportunity`
- **Admin tem 2 abas:** "📋 Disponibilidade" e "📊 Gestores"

### Como funciona o applyOv em cada data file
```ts
import rawOverrides from '@/data/availability-overrides.json'
type StatusType = 'available' | 'sold' | 'negotiation'
const _ov = rawOverrides as Record<string, Record<string, StatusType>>
function applyOv(units: Unit[], key: string): Unit[] {
  const m = _ov[key] || {}
  return units.map(u => ({ ...u, status: m[String(u.id)] ?? u.status }))
}
// No final do arquivo:
export const units = applyOv(_rawUnits, 'produto')
```

## Sistema de Links Personalizados por Gestor

### Arquitetura
- **Rota de entrada:** `GET /g/[slug]` → seta cookie `manager=slug` (1 ano) + registra visita no Redis + redireciona para `/`
- **Cookie:** `manager` — lido client-side pelo `WhatsappButton`
- **Botão flutuante:** aparece em todos os produtos **apenas** quando cookie presente; abre WhatsApp do gestor com mensagem personalizada pelo produto
- **Site genérico** (sem /g/slug): zero botão de contato
- **Tracking de cliques:** `POST /api/track` — registrado no Redis ao clicar no botão
- **IMPORTANTE:** em Route Handlers serverless, sempre usar `await trackEvent()` antes de retornar — função é terminada após o return

### Gestores cadastrados (`src/lib/managers.ts`)
| Slug | Nome | Telefone | Foto |
|------|------|----------|------|
| `jardim` | Jardim | 5551999630731 | `/GESTORES/jardim.webp` |
| `raffael` | Raffael | 5551993777440 | `/GESTORES/raffael.webp` |
| `renato` | Renato | 5551997196469 | `/GESTORES/renato.webp` |
| `charles` | Charles | 5551992427285 | `/GESTORES/charles.webp` |
| `nishi` | Nishi | 5551991214230 | `/GESTORES/nishi.webp` |

### Links para compartilhar
```
grupo-plaenge.vercel.app/g/jardim
grupo-plaenge.vercel.app/g/raffael
grupo-plaenge.vercel.app/g/renato
grupo-plaenge.vercel.app/g/charles
grupo-plaenge.vercel.app/g/nishi
```

### Dashboard de analytics (`/admin` → aba Gestores)
- Visitas, Cliques WA, Taxa de conversão por gestor
- Gráfico de barras diário (azul = visitas, verde = cliques)
- Filtro 7 / 30 / 90 dias
- **API:** `POST /api/analytics` — autenticada por senha, lê do Redis
- **Redis:** Upstash for Redis (Vercel Integration)
  - Variáveis: `UPSTASH_REDIS_KV_REST_API_URL` e `UPSTASH_REDIS_KV_REST_API_TOKEN`
  - Cliente em `src/lib/redis.ts`
  - Chaves: `manager:{slug}:visit:{YYYY-MM-DD}`, `manager:{slug}:click:{YYYY-MM-DD}`, `manager:{slug}:visit:total`, `manager:{slug}:click:total`

## Hero da Home — Slideshow

- **Componente:** `src/components/home-hero-slideshow.tsx`
- **Altura:** `h-[65vh]` (~2/3 da altura original)
- **Imagens:** 12 fotos/renders de empreendimentos reais (fachadas, fotomontagens)
- **Efeito:** Ken Burns (zoom+pan, 4 variações) + cross-fade de 900ms
- **Intervalo:** 5 segundos por slide
- **Ordem:** aleatória a cada carregamento (shuffle no cliente, não no servidor — evita hydration mismatch)
- **objectPosition por slide** — ORBITALE usa `center 75%`, demais `center 30-40%`
- **Overlay:** `bg-black/55`

## Produtos — Status

### ✅ Concluídos
| Produto | Rota | Unidades | Cidade | Entrega | Obs |
|---------|------|----------|--------|---------|-----|
| WAVE Home Resort | `/wave` | lotes | Xangri-lá | Pronto para construir | original do projeto |
| SHIFT | `/shift` | 184 | Porto Alegre | Abr/2029 | [slug]/page.tsx, simulação de pagamento |
| EDITION Moinhos | `/edition` | 48 (2 torres) | Porto Alegre | Jul/2028 | 31 img, 9 plantas |
| MOOD Central Parque | `/mood` | 192 (principal junho + permuta maio) | Porto Alegre | Pronto para morar | 20 img, 4 plantas, 16 prumadas/andar |
| ORBITALE | `/orbitale` | 26 | Porto Alegre | Pronto para morar | 55 img, 12 plantas, decorado |
| VERDANT | `/verdant` | 54 (Torre+Casas) | Porto Alegre | Abr/2027 | 64 img, 15 plantas, decorado |
| YUNA Jardim Botânico | `/yuna` | 83 | Porto Alegre | Nov/2027 | Vanguard, R. Felizardo Furtado 348, 22 img, 12 plantas |
| TREND DOWNTOWN | `/trend` | 100 Home + 259 Nano | Porto Alegre | — | Página única, tabs Home/Nano, Torre 2 = futuro lançamento, sem data |
| SYNTHÈ | `/synthe` | 32 pré-lançamento | Porto Alegre | Pré-lançamento | Plaenge+TGD, R. Pedro Ivo 550, Petrópolis, 3 img, 1 planta |

### Contagem de unidades por produto (junho/2026)
| Produto | xlsx | data file | Observação |
|---------|------|-----------|------------|
| MOOD | 144 (jun) + 48 (mai permuta) = **192** | 192 ✅ | permuta em maio, principal em junho |
| EDITION | 22 T1 + 26 T2 = **48** | 48 ✅ | |
| ORBITALE | **26** | 26 ✅ | |
| VERDANT | 50 Torre + 4 Casas = **54** | 54 ✅ | |
| YUNA | **83** | 83 ✅ | |
| TREND HOME | **100** | 100 ✅ | |
| TREND NANO | **259** | 259 ✅ | prumada = últimos 2 dígitos do código (01-23) |

### Slugs excluídos do `[slug]/page.tsx` generateStaticParams
```ts
['wave', 'edition', 'mood', 'orbitale', 'verdant', 'yuna', 'trend', 'synthe']
```

### Vídeos por produto (YouTube — inseridos entre PLANTAS e DIFERENCIAIS)
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

### Notas por produto
- **SHIFT:** usa `[slug]/page.tsx` (não tem home-page-client próprio). Galeria via `bannerImageIds` + `placeholder-images.json`. Condições de pagamento em `src/lib/payment-data.ts` (valores pré-calculados por unidade) + exibidas via tabela no `src/components/availability-grid.tsx` — fórmula: entrada 12,5% (5x), mensais 9% (30x), reforços 13% (3x), financiamento 65,5%. Disponibilidade via `soldUnits` + `reservedUnits` em `src/lib/data.ts`
- **YUNA:** Vanguard · 14 andares · 6 prumadas · sem book PDF → book estava em pasta separada. **Atenção:** plantas das Unidades II (88,68 m²) e III (72,58 m²) estavam trocadas — corrigido em jun/2026. Os arquivos `04/06/07_VAN_PARECI_APTO_3_DORM` pertencem à Unidade II (88,68 m²) e `03_VAN_PARECI_APTO_2_DORM` à Unidade III (72,58 m²).
- **TREND:** `homeUnits` (VS006B6) + `nanoUnits` (VS006B1) em `trend-data.ts`; Nano usa prumada = últimos 2 dígitos do código (finais 01–23); Torre 2 não lançada; Office e Mall = informativos sem xlsx
- **SYNTHÈ:** pré-lançamento, book PDF em imagem (sem texto), andares 3–18, penthouse andares 17–18; badge "Consulte valores e disponibilidade com o seu Corretor / GP"; `synthe-data.ts` gerado manualmente
- **EDITION:** `tower` field (não `setor`) — torres "Torre Jardim Cristofel" e "Torre Doutor Vale"
- **VERDANT:** `setor` field — "Torre" e "Casas"
- **WAVE:** `src/components/wave/header.tsx` re-exporta `ProductHeader`; interface `Lot` (não `Unit`) com campos `block`, `number`; 4 status incluindo `opportunity`; modal do lote usa gestor do cookie para WhatsApp
- **MOOD:** 16 unidades por andar (prumadas 01-16); principal em junho, permuta (andares 3,7,10) em maio

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
- Ao fazer push, Vercel faz deploy automático em ~2 min
- **CSS arbitrário Tailwind com %** (ex: `object-[center_30%]`) não gera CSS em produção — usar sempre `style={{ objectPosition: '...' }}` inline
- **Header da home** (`SiteHeader`): altura fixada via `style={{ height: '44px' }}` inline para garantir renderização
- **Logos na home:** Plaenge `h-10 md:h-12 w-auto`, Vanguard `h-7 md:h-8 w-auto`
- **Hydration mismatch:** nunca usar `Math.random()` / `shuffle` no `useState` initializer de componentes com SSR — mover para `useEffect`
- **Admin push rejected:** o admin commita o `availability-overrides.json` diretamente no GitHub; antes de qualquer push fazer `git pull --rebase` para incorporar esses commits
- **Route Handlers serverless:** sempre `await` operações async antes do `return response` — o Vercel encerra a função após o retorno
- **'use client' deve ser sempre a primeira linha** dos arquivos — nunca inserir imports antes dele
