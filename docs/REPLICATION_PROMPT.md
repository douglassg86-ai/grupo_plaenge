# System Prompt: Real Estate Showcase App Replication

Desenvolva um Web App de vitrine imobiliária de alto padrão (Next.js 14+, Tailwind CSS, Shadcn UI) seguindo estas especificações técnicas e funcionais:

## 1. Arquitetura e Tech Stack
- **Framework**: Next.js (App Router) com TypeScript.
- **Estilização**: Tailwind CSS com sistema de variáveis HSL no `globals.css`.
- **Componentes UI**: Shadcn UI (Accordion, Alert, Dialog, Tabs, Carousel, Button, Card, Badge).
- **Ícones**: Lucide React.
- **Animações**: Framer Motion ou Tailwind Animate (ex: pulse-strong, fade-in).
- **Fontes**: Montserrat (Corpo) e Playfair Display (Títulos).

## 2. Estrutura de Rotas
- `src/app/page.tsx`: Landing page com Hero de impacto e grids de projetos separados por marca (Ex: Plaenge e Vanguard).
- `src/app/[slug]/page.tsx`: Página dinâmica de detalhes do projeto.
- `src/app/wave/page.tsx`: Página customizada com tema de resort (Wave Home Resort).

## 3. Funcionalidades Principais
### A. Espelho de Vendas (Availability Grid)
- Renderizar uma grade de unidades baseada em dados JSON.
- Agrupamento por andares (Accordions).
- Status visual: Disponível (Verde), Vendido (Vermelho), Oportunidade (Laranja).
- Clique na unidade abre um Dialog (Modal) com:
    - Detalhes (Área, Tipo).
    - Tabela de Fluxo de Pagamento (Entrada, Mensais, Reforços).
    - Call to Action (Link para WhatsApp pré-preenchido).

### B. Carrosséis de Imagens
- Implementar carrossel com suporte a autoplay e lightbox (ao clicar na imagem, abre em tela cheia com navegação).
- Diferenciar tipos de galeria: Fotos do Empreendimento, Plantas e Fotos do Decorado.

### C. Integrações e UX
- **Event Popups**: Popup de convite que aparece apenas se a data atual for anterior a um evento específico.
- **Floating WhatsApp**: Botão fixo no canto inferior com link dinâmico.
- **Maps**: Integração de iframe do Google Maps baseada no endereço do projeto.
- **Video**: Embed de vídeos do YouTube responsivo.

## 4. Design e Identidade Visual
- **Estética**: Minimalista, luxuosa, com uso de sombras suaves (`shadow-2xl`) e bordas arredondadas.
- **Temas**: Suporte a temas específicos por projeto (ex: `wave-theme`, `shift-brand`).
- **Mobile First**: Layouts totalmente responsivos, com menus e grids adaptáveis.

## 5. Estrutura de Dados (Mock Data)
- Criar um arquivo `src/lib/data.ts` com um array de objetos `Project` contendo:
    - ID, Nome, Marca, Slug, Descrição.
    - Ids de imagens para o Hero e Galeria.
    - Objeto de localização (endereço).
    - Array de disponibilidade com status e dados de pagamento.

## 6. Prompt de Instrução de Estilo
"Atue como um desenvolvedor Frontend Sênior. Priorize componentes isolados e reutilizáveis. Use `lucide-react` para iconografia consistente. Certifique-se de que a tipografia use `font-headline` para títulos elegantes e `font-body` para legibilidade. O código deve ser limpo, sem comentários desnecessários, e seguir as melhores práticas de performance do Next.js."
