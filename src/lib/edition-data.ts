import rawOverrides from '@/data/availability-overrides.json'
type StatusType = 'available' | 'sold' | 'negotiation'
const _ov = rawOverrides as Record<string, Record<string, StatusType>>
function applyOv(units: Unit[], key: string): Unit[] {
  const m = _ov[key] || {}
  return units.map(u => ({ ...u, status: m[String(u.id)] ?? u.status }))
}

export interface Unit {
  id: number; code: string; type: string; floor: number;
  prumada: string; area: number; price: number;
  status: 'available' | 'sold' | 'negotiation';
  tower: string;
}

const _rawUnits: Unit[] = [
  { id: 106507, code: '0501', type: 'UNIDADE II — 172,37 m²', floor: 5, prumada: '1', area: 172.37, price: 4200680, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106508, code: '0502', type: 'UNIDADE I — 146,46 m²', floor: 5, prumada: '2', area: 146.46, price: 3467790, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106509, code: '0601', type: 'UNIDADE II — 172,37 m²', floor: 6, prumada: '1', area: 172.37, price: 4286440, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106510, code: '0602', type: 'UNIDADE I — 146,46 m²', floor: 6, prumada: '2', area: 146.46, price: 3480550, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106511, code: '0701', type: 'UNIDADE II — 172,37 m²', floor: 7, prumada: '1', area: 172.37, price: 4302180, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106512, code: '0702', type: 'UNIDADE I — 146,46 m²', floor: 7, prumada: '2', area: 146.46, price: 3551570, status: 'negotiation', tower: 'Torre Jardim Cristofel' },
  { id: 106513, code: '0801', type: 'UNIDADE II — 172,37 m²', floor: 8, prumada: '1', area: 172.37, price: 4463170, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106514, code: '0802', type: 'UNIDADE I — 146,46 m²', floor: 8, prumada: '2', area: 146.46, price: 3684480, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106515, code: '0901', type: 'UNIDADE II — 172,37 m²', floor: 9, prumada: '1', area: 172.37, price: 4525730, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106516, code: '0902', type: 'UNIDADE I — 146,46 m²', floor: 9, prumada: '2', area: 146.46, price: 3837990, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106517, code: '1001', type: 'UNIDADE II — 172,37 m²', floor: 10, prumada: '1', area: 172.37, price: 4670190, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106518, code: '1002', type: 'UNIDADE I — 146,46 m²', floor: 10, prumada: '2', area: 146.46, price: 3831690, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106519, code: '1101', type: 'UNIDADE II — 172,37 m²', floor: 11, prumada: '1', area: 172.37, price: 4662520, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106520, code: '1102', type: 'UNIDADE I — 146,46 m²', floor: 11, prumada: '2', area: 146.46, price: 4012410, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106521, code: '1201', type: 'UNIDADE II — 172,37 m²', floor: 12, prumada: '1', area: 172.37, price: 4811350, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106522, code: '1202', type: 'UNIDADE I — 146,46 m²', floor: 12, prumada: '2', area: 146.46, price: 3302710, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106523, code: '1301', type: 'UNIDADE II — 172,37 m²', floor: 13, prumada: '1', area: 172.37, price: 4883500, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106524, code: '1302', type: 'UNIDADE I — 146,46 m²', floor: 13, prumada: '2', area: 146.46, price: 4065900, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106525, code: '1401', type: 'UNIDADE III — 322,18 m²', floor: 14, prumada: '1', area: 322.18, price: 9977780, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106526, code: '1501', type: 'UNIDADE III — 322,18 m²', floor: 15, prumada: '1', area: 322.18, price: 10010470, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106527, code: '1601', type: 'UNIDADE III — 322,18 m²', floor: 16, prumada: '1', area: 322.18, price: 10210670, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106528, code: '1701', type: 'UNIDADE IV — 545,67 m²', floor: 17, prumada: '1', area: 545.67, price: 9819140, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106480, code: '0501', type: 'UNIDADE II — 206,08 m²', floor: 5, prumada: '1', area: 206.08, price: 5040310, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106481, code: '0502', type: 'UNIDADE I — 172,03 m²', floor: 5, prumada: '2', area: 172.03, price: 4080370, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106482, code: '0601', type: 'UNIDADE II — 206,08 m²', floor: 6, prumada: '1', area: 206.08, price: 5143180, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106483, code: '0602', type: 'UNIDADE I — 172,03 m²', floor: 6, prumada: '2', area: 172.03, price: 4185010, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106484, code: '0701', type: 'UNIDADE II — 206,08 m²', floor: 7, prumada: '1', area: 206.08, price: 5248130, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106485, code: '0702', type: 'UNIDADE I — 172,03 m²', floor: 7, prumada: '2', area: 172.03, price: 4292320, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106486, code: '0801', type: 'UNIDADE II — 206,08 m²', floor: 8, prumada: '1', area: 206.08, price: 5355250, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106487, code: '0802', type: 'UNIDADE I — 172,03 m²', floor: 8, prumada: '2', area: 172.03, price: 4330160, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106488, code: '0901', type: 'UNIDADE II — 206,08 m²', floor: 9, prumada: '1', area: 206.08, price: 5464510, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106489, code: '0902', type: 'UNIDADE I — 172,03 m²', floor: 9, prumada: '2', area: 172.03, price: 4515220, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106490, code: '1001', type: 'UNIDADE II — 206,08 m²', floor: 10, prumada: '1', area: 206.08, price: 5576020, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106491, code: '1002', type: 'UNIDADE I — 172,03 m²', floor: 10, prumada: '2', area: 172.03, price: 4631020, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106492, code: '1101', type: 'UNIDADE II — 206,08 m²', floor: 11, prumada: '1', area: 206.08, price: 5689850, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106493, code: '1102', type: 'UNIDADE I — 172,03 m²', floor: 11, prumada: '2', area: 172.03, price: 4749740, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106494, code: '1201', type: 'UNIDADE II — 206,08 m²', floor: 12, prumada: '1', area: 206.08, price: 5775200, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106495, code: '1202', type: 'UNIDADE I — 172,03 m²', floor: 12, prumada: '2', area: 172.03, price: 4820980, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106496, code: '1301', type: 'UNIDADE II — 206,08 m²', floor: 13, prumada: '1', area: 206.08, price: 5765700, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106497, code: '1302', type: 'UNIDADE I — 172,03 m²', floor: 13, prumada: '2', area: 172.03, price: 4893310, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106498, code: '1401', type: 'UNIDADE II — 206,08 m²', floor: 14, prumada: '1', area: 206.08, price: 4466560, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106499, code: '1402', type: 'UNIDADE I — 172,03 m²', floor: 14, prumada: '2', area: 172.03, price: 4966710, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106500, code: '1501', type: 'UNIDADE II — 206,08 m²', floor: 15, prumada: '1', area: 206.08, price: 4117370, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106501, code: '1502', type: 'UNIDADE I — 172,03 m²', floor: 15, prumada: '2', area: 172.03, price: 3780760, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106502, code: '1601', type: 'UNIDADE II — 206,08 m²', floor: 16, prumada: '1', area: 206.08, price: 4999580, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106503, code: '1602', type: 'UNIDADE I — 172,03 m²', floor: 16, prumada: '2', area: 172.03, price: 5116800, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106504, code: '1701', type: 'UNIDADE IV — 369,16 m²', floor: 17, prumada: '1', area: 369.16, price: 7591960, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106505, code: '1702', type: 'UNIDADE III — 278,74 m²', floor: 17, prumada: '2', area: 278.74, price: 5954220, status: 'available', tower: 'Torre Doutor Vale' },
];

export const units = applyOv(_rawUnits, 'edition')
export const towers = ['Torre Jardim Cristofel', 'Torre Doutor Vale'] as const;