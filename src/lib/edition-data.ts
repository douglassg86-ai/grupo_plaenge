import rawOverrides from '@/data/availability-overrides.json'
type StatusType = 'available' | 'sold' | 'negotiation'
const _ov = rawOverrides as Record<string, Record<string, StatusType>>
function applyOv(units: Unit[], key: string): Unit[] {
  const m = _ov[key] || {}
  return units.map(u => ({ ...u, status: m[String(u.id)] ?? u.status }))
}

export type VagaTipo = 'S' | 'D' | 'SE' | 'DE';
export interface Vaga { num: number; tipo: VagaTipo; }

export interface Unit {
  id: number; code: string; type: string; floor: number;
  prumada: string; area: number; price: number;
  status: 'available' | 'sold' | 'negotiation';
  tower: string;
  vagas?: Vaga[];
}

const VAGAS_CRISTOFEL: Record<string, Vaga[]> = {
  '0501': [{ num: 111, tipo: 'D' }, { num: 118, tipo: 'S' }],
  '0601': [{ num: 112, tipo: 'D' }, { num: 119, tipo: 'S' }],
  '0701': [{ num: 110, tipo: 'D' }, { num: 117, tipo: 'S' }],
  '0702': [{ num: 10, tipo: 'D' }],
  '0801': [{ num: 109, tipo: 'D' }, { num: 116, tipo: 'S' }],
  '0802': [{ num: 9, tipo: 'D' }],
  '0901': [{ num: 31, tipo: 'S' }, { num: 32, tipo: 'S' }, { num: 113, tipo: 'S' }],
  '0902': [{ num: 101, tipo: 'S' }, { num: 102, tipo: 'S' }],
  '1101': [{ num: 41, tipo: 'D' }, { num: 106, tipo: 'S' }],
  '1102': [{ num: 8, tipo: 'D' }, { num: 115, tipo: 'S' }],
  '1201': [{ num: 38, tipo: 'D' }, { num: 103, tipo: 'S' }],
  '1301': [{ num: 37, tipo: 'D' }, { num: 100, tipo: 'S' }],
  '1401': [{ num: 77, tipo: 'D' }, { num: 70, tipo: 'S' }, { num: 71, tipo: 'S' }],
  '1501': [{ num: 76, tipo: 'D' }, { num: 65, tipo: 'S' }, { num: 66, tipo: 'S' }],
  '1601': [{ num: 75, tipo: 'D' }, { num: 72, tipo: 'S' }, { num: 73, tipo: 'S' }],
};

const VAGAS_VALE: Record<string, Vaga[]> = {
  '0501': [{ num: 24, tipo: 'D' }, { num: 15, tipo: 'S' }],
  '0502': [{ num: 12, tipo: 'D' }, { num: 6, tipo: 'S' }],
  '0601': [{ num: 25, tipo: 'D' }, { num: 16, tipo: 'S' }],
  '0602': [{ num: 23, tipo: 'D' }, { num: 7, tipo: 'S' }],
  '0701': [{ num: 26, tipo: 'D' }, { num: 17, tipo: 'S' }],
  '0702': [{ num: 89, tipo: 'D' }, { num: 83, tipo: 'S' }],
  '0801': [{ num: 90, tipo: 'D' }, { num: 85, tipo: 'S' }],
  '0802': [{ num: 88, tipo: 'D' }, { num: 84, tipo: 'S' }],
  '0901': [{ num: 28, tipo: 'D' }, { num: 97, tipo: 'S' }],
  '0902': [{ num: 44, tipo: 'D' }, { num: 46, tipo: 'S' }],
  '1001': [{ num: 58, tipo: 'D' }, { num: 52, tipo: 'S' }],
  '1002': [{ num: 78, tipo: 'D' }, { num: 81, tipo: 'S' }],
  '1101': [{ num: 91, tipo: 'D' }, { num: 95, tipo: 'S' }],
  '1102': [{ num: 45, tipo: 'D' }, { num: 48, tipo: 'S' }],
  '1201': [{ num: 51, tipo: 'S' }, { num: 57, tipo: 'S' }, { num: 47, tipo: 'S' }],
  '1202': [{ num: 56, tipo: 'D' }, { num: 49, tipo: 'S' }],
  '1301': [{ num: 93, tipo: 'D' }, { num: 96, tipo: 'S' }],
  '1302': [{ num: 55, tipo: 'D' }, { num: 50, tipo: 'S' }],
  '1402': [{ num: 21, tipo: 'D' }, { num: 22, tipo: 'S' }],
  '1602': [{ num: 53, tipo: 'D' }, { num: 54, tipo: 'S' }],
  '1701': [{ num: 94, tipo: 'D' }, { num: 92, tipo: 'S' }],
  '1702': [{ num: 86, tipo: 'D' }, { num: 87, tipo: 'S' }],
};

const _rawUnits: Unit[] = [
  { id: 106507, code: '0501', type: 'UNIDADE II — 172,37 m²', floor: 5, prumada: '1', area: 172.37, price: 4254210, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106508, code: '0502', type: 'UNIDADE I — 146,46 m²', floor: 5, prumada: '2', area: 146.46, price: 3511980, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106509, code: '0601', type: 'UNIDADE II — 172,37 m²', floor: 6, prumada: '1', area: 172.37, price: 4341060, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106510, code: '0602', type: 'UNIDADE I — 146,46 m²', floor: 6, prumada: '2', area: 146.46, price: 3480550, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106511, code: '0701', type: 'UNIDADE II — 172,37 m²', floor: 7, prumada: '1', area: 172.37, price: 4302180, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106512, code: '0702', type: 'UNIDADE I — 146,46 m²', floor: 7, prumada: '2', area: 146.46, price: 3551570, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106513, code: '0801', type: 'UNIDADE II — 172,37 m²', floor: 8, prumada: '1', area: 172.37, price: 4520040, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106514, code: '0802', type: 'UNIDADE I — 146,46 m²', floor: 8, prumada: '2', area: 146.46, price: 3731430, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106515, code: '0901', type: 'UNIDADE II — 172,37 m²', floor: 9, prumada: '1', area: 172.37, price: 4525730, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106516, code: '0902', type: 'UNIDADE I — 146,46 m²', floor: 9, prumada: '2', area: 146.46, price: 3886900, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106517, code: '1001', type: 'UNIDADE II — 172,37 m²', floor: 10, prumada: '1', area: 172.37, price: 4729700, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106518, code: '1002', type: 'UNIDADE I — 146,46 m²', floor: 10, prumada: '2', area: 146.46, price: 3831690, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106519, code: '1101', type: 'UNIDADE II — 172,37 m²', floor: 11, prumada: '1', area: 172.37, price: 4662520, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106520, code: '1102', type: 'UNIDADE I — 146,46 m²', floor: 11, prumada: '2', area: 146.46, price: 4063540, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106521, code: '1201', type: 'UNIDADE II — 172,37 m²', floor: 12, prumada: '1', area: 172.37, price: 4872650, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106522, code: '1202', type: 'UNIDADE I — 146,46 m²', floor: 12, prumada: '2', area: 146.46, price: 3302710, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106523, code: '1301', type: 'UNIDADE II — 172,37 m²', floor: 13, prumada: '1', area: 172.37, price: 4945720, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106524, code: '1302', type: 'UNIDADE I — 146,46 m²', floor: 13, prumada: '2', area: 146.46, price: 4065900, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106525, code: '1401', type: 'UNIDADE III — 322,18 m²', floor: 14, prumada: '1', area: 322.18, price: 10104910, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106526, code: '1501', type: 'UNIDADE III — 322,18 m²', floor: 15, prumada: '1', area: 322.18, price: 10010470, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106527, code: '1601', type: 'UNIDADE III — 322,18 m²', floor: 16, prumada: '1', area: 322.18, price: 10210670, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106528, code: '1701', type: 'UNIDADE IV — 545,67 m²', floor: 17, prumada: '1', area: 545.67, price: 9819140, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106480, code: '0501', type: 'UNIDADE II — 206,08 m²', floor: 5, prumada: '1', area: 206.08, price: 5104530, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106481, code: '0502', type: 'UNIDADE I — 172,03 m²', floor: 5, prumada: '2', area: 172.03, price: 4132370, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106482, code: '0601', type: 'UNIDADE II — 206,08 m²', floor: 6, prumada: '1', area: 206.08, price: 5208720, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106483, code: '0602', type: 'UNIDADE I — 172,03 m²', floor: 6, prumada: '2', area: 172.03, price: 4238330, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106484, code: '0701', type: 'UNIDADE II — 206,08 m²', floor: 7, prumada: '1', area: 206.08, price: 5315000, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106485, code: '0702', type: 'UNIDADE I — 172,03 m²', floor: 7, prumada: '2', area: 172.03, price: 4347020, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106486, code: '0801', type: 'UNIDADE II — 206,08 m²', floor: 8, prumada: '1', area: 206.08, price: 5423490, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106487, code: '0802', type: 'UNIDADE I — 172,03 m²', floor: 8, prumada: '2', area: 172.03, price: 4330160, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106488, code: '0901', type: 'UNIDADE II — 206,08 m²', floor: 9, prumada: '1', area: 206.08, price: 5534140, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106489, code: '0902', type: 'UNIDADE I — 172,03 m²', floor: 9, prumada: '2', area: 172.03, price: 4572760, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106490, code: '1001', type: 'UNIDADE II — 206,08 m²', floor: 10, prumada: '1', area: 206.08, price: 5647070, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106491, code: '1002', type: 'UNIDADE I — 172,03 m²', floor: 10, prumada: '2', area: 172.03, price: 4690030, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106492, code: '1101', type: 'UNIDADE II — 206,08 m²', floor: 11, prumada: '1', area: 206.08, price: 5724560, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106493, code: '1102', type: 'UNIDADE I — 172,03 m²', floor: 11, prumada: '2', area: 172.03, price: 4810260, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106494, code: '1201', type: 'UNIDADE II — 206,08 m²', floor: 12, prumada: '1', area: 206.08, price: 5848780, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106495, code: '1202', type: 'UNIDADE I — 172,03 m²', floor: 12, prumada: '2', area: 172.03, price: 4882410, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106496, code: '1301', type: 'UNIDADE II — 206,08 m²', floor: 13, prumada: '1', area: 206.08, price: 5765700, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106497, code: '1302', type: 'UNIDADE I — 172,03 m²', floor: 13, prumada: '2', area: 172.03, price: 4955660, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106498, code: '1401', type: 'UNIDADE II — 206,08 m²', floor: 14, prumada: '1', area: 206.08, price: 4466560, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106499, code: '1402', type: 'UNIDADE I — 172,03 m²', floor: 14, prumada: '2', area: 172.03, price: 5030000, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106500, code: '1501', type: 'UNIDADE II — 206,08 m²', floor: 15, prumada: '1', area: 206.08, price: 4117370, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106501, code: '1502', type: 'UNIDADE I — 172,03 m²', floor: 15, prumada: '2', area: 172.03, price: 3892770, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106502, code: '1601', type: 'UNIDADE II — 206,08 m²', floor: 16, prumada: '1', area: 206.08, price: 4999580, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106503, code: '1602', type: 'UNIDADE I — 172,03 m²', floor: 16, prumada: '2', area: 172.03, price: 5116800, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106504, code: '1701', type: 'UNIDADE IV — 369,16 m²', floor: 17, prumada: '1', area: 369.16, price: 7688700, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106505, code: '1702', type: 'UNIDADE III — 278,74 m²', floor: 17, prumada: '2', area: 278.74, price: 5954220, status: 'sold', tower: 'Torre Doutor Vale' },
];

export const units = applyOv(_rawUnits, 'edition').map(u => ({
  ...u,
  vagas: (u.tower === 'Torre Jardim Cristofel' ? VAGAS_CRISTOFEL : VAGAS_VALE)[u.code] ?? [],
}))
export const towers = ['Torre Jardim Cristofel', 'Torre Doutor Vale'] as const;