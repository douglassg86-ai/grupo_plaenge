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

## Hero da Home — Slideshow

- **Componente:** `src/components/home-hero-slideshow.tsx`
- **Altura:** `h-[65vh]` · 12 imagens reais · Ken Burns + cross-fade 900ms · intervalo 5s
- **Ordem:** shuffle no cliente (useEffect — evita hydration mismatch)
- **objectPosition:** ORBITALE `center 75%`, demais `center 30-40%`
- **Overlay:** `bg-black/55`
