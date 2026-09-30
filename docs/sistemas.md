# Sistemas — Admin, Gestores, Home Slideshow

## Sistema de Admin de Disponibilidade

- **URL:** `grupo-plaenge.vercel.app/admin` — senha `plaenge.peano2026`
- **Arquivo de overrides:** `src/data/availability-overrides.json`
  - Chaves: `edition`, `mood`, `orbitale`, `synthe`, `trend_home`, `trend_nano`, `verdant`, `yuna`, `wave`
- **API:** `POST /api/admin/commit` — autentica, busca SHA no GitHub, commita JSON
- **Fluxo:** admin altera → salva → API commita no GitHub → Vercel redeploya (~2 min)
- **Env Vercel:** `ADMIN_PASSWORD=plaenge.peano2026` · `GITHUB_TOKEN=<ver Settings>`
- **WAVE** tem 4 status: `available | negotiation | sold | opportunity`
- **Admin tem 2 abas:** "📋 Disponibilidade" e "📊 Gestores"

### applyOv (padrão em cada *-data.ts)
```ts
import rawOverrides from '@/data/availability-overrides.json'
type StatusType = 'available' | 'sold' | 'negotiation'
const _ov = rawOverrides as Record<string, Record<string, StatusType>>
function applyOv(units: Unit[], key: string): Unit[] {
  const m = _ov[key] || {}
  return units.map(u => ({ ...u, status: m[String(u.id)] ?? u.status }))
}
export const units = applyOv(_rawUnits, 'produto')
```

### Sincronização → GPI Tracker (Supabase)
- **Script:** `scripts/sync-disponibilidade.ts` — upsert em `disponibilidade_empreendimentos` (Supabase ref `mfpuxpkjztwfawybnmql`)
- **Rodar manual:** `npm run sync:disponibilidade [-- --dry-run]` (precisa `.env` com `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`)
- **Automático:** `.github/workflows/sync-disponibilidade.yml` — dispara em push que altere `availability-overrides.json` ou `src/lib/*-data.ts`
- **Mapa marca:** EDITION/ORBITALE/SYNTHÈ/VERDANT = Plaenge; MOOD/YUNA/SHIFT/TREND HOME/TREND NANO/WAVE = Vanguard

## Sistema de Links Personalizados por Gestor

- **Rota entrada:** `GET /g/[slug]` → cookie `manager=slug` (1 ano) + visita no Redis + redirect `/`
- **Botão WhatsApp:** aparece apenas com cookie presente; mensagem personalizada por produto
- **Tracking:** `POST /api/track` — Redis ao clicar

### Gestores (`src/lib/managers.ts`)
| Slug | Nome | Telefone |
|------|------|----------|
| `jardim` | Jardim | 5551999630731 |
| `raffael` | Raffael | 5551993777440 |
| `renato` | Renato | 5551997196469 |
| `charles` | Charles | 5551992427285 |
| `nishi` | Nishi | 5551991214230 |

Links: `grupo-plaenge.vercel.app/g/{slug}`

### Dashboard analytics (`/admin` → aba Gestores)
- API: `POST /api/analytics` — autenticada, lê Redis
- Redis (Upstash): `UPSTASH_REDIS_KV_REST_API_URL` + `UPSTASH_REDIS_KV_REST_API_TOKEN` (`src/lib/redis.ts`)
- Chaves: `manager:{slug}:visit:{YYYY-MM-DD}` · `manager:{slug}:click:{YYYY-MM-DD}`

### Apresentações para investidores (`/admin` → aba Investidores)
- As rotas `/investidores` (grupo 1) e `/investidores2` (grupo 2) são encaminhadas (rewrite em `next.config.js`) ao projeto Vercel **plaenge-investidores**, que guarda cada apresentação atrás de senha (a mesma para os dois grupos, login separado). O conteúdo não fica neste repositório.
- Grupos em `src/lib/investor-decks.ts` (rota, rótulo, `product` das chaves de conteúdo, `prefix` das demais chaves, data de início). Grupo novo = nova entrada lá + rewrite + `deck` no data.js da apresentação. O grupo 1 usa as chaves originais (`INVESTIDORES`, `inv:`) — não renomear.
- Todo POST de rastreamento leva `deck` (`g1`, `g2`…); sem ele conta no grupo 1. O painel tem um seletor de grupo e manda `deck` para `/api/investidores/analytics`.
- Eventos: `POST /api/investidores/track` com `{ event: 'acesso' | 'tela-de-senha' | 'senha-incorreta', vid? }` — chamado pela apresentação e pela tela de senha dela. `vid` = id aleatório do navegador (localStorage `inv_vid`), só para contar pessoas únicas.
- Engajamento: `POST /api/investidores/track` com `{ event: 'engajamento', slides: [{ i, t, p, seen, sec }], zooms: [{ k, c }] }` — a apresentação envia a cada minuto e ao sair só o que mudou (slide visto 1× por acesso; segundos com a aba visível, parando após 2 min sem interação; plantas ampliadas). A rota valida tudo (≤ 40 slides, `sec` ≤ 600, `p` ∈ códigos conhecidos, chave de planta `[A-Za-z0-9_]`).
- Perfil anônimo: no `acesso`, a rota lê os cabeçalhos da Vercel `x-vercel-ip-city`/`-country-region`/`-country` e o user-agent e só incrementa contagens do dia — nada é guardado por pessoa, nem o IP.
- Painel: `POST /api/investidores/analytics` (senha do admin) → `getInvestorAnalytics()` + `getInvestorProfile()` em `src/lib/redis.ts`.
- Chaves (grupo 1 → `INVESTIDORES`/`inv`; grupo 2 → `INVESTIDORES 2`/`inv2`): contagens em `content:click:{product}:{acesso:apresentacao | visita:tela-de-senha | visita:senha-incorreta}:{YYYY-MM-DD|total}`; pessoas únicas em HyperLogLog `{prefix}:uv:{acesso|tela-de-senha}:{YYYY-MM-DD|total}`; último acesso em `{prefix}:last-access`.
- Chaves do perfil (hashes por dia UTC): `{prefix}:geo:{dia}` ("Cidade · UF"), `{prefix}:device:{dia}` (Computador/Celular/Tablet), `{prefix}:os:{dia}`, `{prefix}:hour:{dia}` (0–23, Brasília), `{prefix}:wd:{dia}` (0 = domingo); engajamento em `{prefix}:eng:seen:{slide}:{dia}`, `{prefix}:eng:sec:{slide}:{dia}`, `{prefix}:eng:zoom:{dia}`.
- Títulos dos slides (`{prefix}:eng:meta`, "código|título") e legendas das plantas (`{prefix}:eng:zoommeta`) vêm da própria apresentação e ficam só no Redis — o painel monta nomes de empreendimento a partir deles. **Não escrever nomes, metragens ou preços da apresentação neste repositório (é público).**

## Hero da Home — Slideshow

- **Componente:** `src/components/home-hero-slideshow.tsx`
- **Altura:** `h-[65vh]` · 12 imagens reais · Ken Burns + cross-fade 900ms · intervalo 5s
- **Ordem:** shuffle no cliente (useEffect — evita hydration mismatch)
- **objectPosition:** ORBITALE `center 75%`, demais `center 30-40%`
- **Overlay:** `bg-black/55`
