# Padrões de Código — Referência Detalhada

## Interfaces dos componentes shared

```tsx
// GalleryViewer / PlantsViewer
interface Category { label: string; images: { src: string; alt: string }[] }
<GalleryViewer categories={galleryCategories} />
<PlantsViewer categories={plantCategories} />

// ProductHeader — logo + dropdown com todos os produtos
<ProductHeader />                    // padrão
<ProductHeader hideNav={true} />     // visão cliente (sem dropdown)

// WhatsappButton — só aparece com cookie 'manager' presente
<WhatsappButton product="NOME DO PRODUTO" />

// ProductLinks — sempre dentro de {!isClientePage && ...}
interface ProductLinksConfig {
  tabela?: string; book?: string; imagens?: string; video?: string;
  site?: string; clienteSlug: string;
}
<ProductLinks config={LINKS_CONFIG} />

// PaymentBreakdown — dentro do modal do unit-grid, após dados da unidade
type PaymentStep = { label: string; pct: number; count: number }
<PaymentBreakdown price={selected.price} plan={PAYMENT_PLAN} />
// count > 1 → "Nx de R$ X" | count = 1 → "1x de R$ X"
// pct * price / count; todos os steps devem somar 100% do preço
```

## Interface Unit (padrão)
```ts
export interface Unit {
  id: number; code: string; type: string; floor: number;
  prumada: string; area: number; price: number;
  status: 'available' | 'sold' | 'negotiation';
  setor?: string; // só se multi-torre/setor
}
```

## Geração de dados a partir do xlsx
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
    p = str(code)[-2:]  # prumada = sempre últimos 2 dígitos do código
```
Colunas: `Id Produto | Status Mega | Codigo | Tipologia | Andar | Prumada | Area Privativa | Vlr Tabela | Vlr Minimo`

**ATENÇÃO:** campo `Prumada` do xlsx é 0-9 e se repete. Sempre usar últimos 2 dígitos do `Codigo`.

## UnitGrid — padrão detalhado
- Summary: Disponíveis / Reservadas / Vendidas
- Tabela: andar (linhas) × prumada (colunas)
- Botão: mostra **código** (ex: `0501`) — metragem só no modal
- Modal: tipologia, área, andar, valor, `<PaymentBreakdown>`, botão WhatsApp
- Multi-torre/setor: tabs para alternar
- Pré-lançamento: todos `available`, sem preço, modal → "Cadastrar Interesse via WhatsApp"

## Badge de entrega no hero
```tsx
// Pronto para morar (ORBITALE, MOOD):
<span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold tracking-wide">✓ Pronto para morar</span>

// Previsão de entrega:
<span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide backdrop-blur-sm">Previsão de entrega: Mês Ano</span>
```

## Logos institucionais em `/public/INSTITUCIONAL/`
```
logo_grupo_plaenge_claro.webp    ← header da home (fundo claro)
logo_grupo_plaenge_escuro.webp   ← fundo escuro / produtos
logo_plaenge_claro.webp / escuro.webp
logo_vanguard_claro.webp / escuro.webp
logo_plaenge_vanguard_escuro.webp ← hero da home
grafismo.webp                    ← padrão listrado decorativo
```
Tamanhos na home: Plaenge `h-10 md:h-12 w-auto` · Vanguard `h-7 md:h-8 w-auto`
