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
}

const _rawUnits: Unit[] = [
  { id: 82983, code: '0201', type: 'UNIDADE XVIII — 502,86 m²', floor: 2, prumada: '1', area: 502.86, price: 7629040, status: 'sold' },
  { id: 82984, code: '0202', type: 'UNIDADE XV — 397,10 m²', floor: 2, prumada: '2', area: 397.1, price: 6693030, status: 'negotiation' },
  { id: 82985, code: '0301', type: 'UNIDADE I — 230,94 m²', floor: 3, prumada: '1', area: 230.94, price: 5752780, status: 'negotiation' },
  { id: 82986, code: '0302', type: 'UNIDADE II — 231,53 m²', floor: 3, prumada: '2', area: 231.53, price: 5623350, status: 'sold' },
  { id: 82987, code: '0401', type: 'UNIDADE IV — 231,62 m²', floor: 4, prumada: '1', area: 231.62, price: 5887500, status: 'sold' },
  { id: 82988, code: '0402', type: 'UNIDADE II — 231,53 m²', floor: 4, prumada: '2', area: 231.53, price: 5738090, status: 'sold' },
  { id: 82998, code: '0501', type: 'UNIDADE V — 232,38 m²', floor: 5, prumada: '1', area: 232.38, price: 5996690, status: 'sold' },
  { id: 82989, code: '0502', type: 'UNIDADE II — 231,53 m²', floor: 5, prumada: '2', area: 231.53, price: 5825430, status: 'sold' },
  { id: 82999, code: '0601', type: 'UNIDADE VI — 233,14 m²', floor: 6, prumada: '1', area: 233.14, price: 6107960, status: 'sold' },
  { id: 82990, code: '0602', type: 'UNIDADE II — 231,53 m²', floor: 6, prumada: '2', area: 231.53, price: 5914200, status: 'sold' },
  { id: 83000, code: '0701', type: 'UNIDADE VII — 233,90 m²', floor: 7, prumada: '1', area: 233.9, price: 6221230, status: 'sold' },
  { id: 82991, code: '0702', type: 'UNIDADE II — 231,53 m²', floor: 7, prumada: '2', area: 231.53, price: 6004150, status: 'sold' },
  { id: 83001, code: '0801', type: 'UNIDADE VIII — 234,65 m²', floor: 8, prumada: '1', area: 234.65, price: 6336090, status: 'sold' },
  { id: 82992, code: '0802', type: 'UNIDADE II — 231,53 m²', floor: 8, prumada: '2', area: 231.53, price: 6095620, status: 'negotiation' },
  { id: 83002, code: '0901', type: 'UNIDADE X — 235,41 m²', floor: 9, prumada: '1', area: 235.41, price: 6452000, status: 'sold' },
  { id: 82993, code: '0902', type: 'UNIDADE II — 231,53 m²', floor: 9, prumada: '2', area: 231.53, price: 6187110, status: 'sold' },
  { id: 83003, code: '1001', type: 'UNIDADE XI — 236,16 m²', floor: 10, prumada: '1', area: 236.16, price: 6569650, status: 'sold' },
  { id: 82994, code: '1002', type: 'UNIDADE II — 231,53 m²', floor: 10, prumada: '2', area: 231.53, price: 6279790, status: 'sold' },
  { id: 83004, code: '1101', type: 'UNIDADE XII — 236,92 m²', floor: 11, prumada: '1', area: 236.92, price: 6689630, status: 'sold' },
  { id: 82995, code: '1102', type: 'UNIDADE II — 231,53 m²', floor: 11, prumada: '2', area: 231.53, price: 6374020, status: 'sold' },
  { id: 83005, code: '1201', type: 'UNIDADE XIII — 237,68 m²', floor: 12, prumada: '1', area: 237.68, price: 6811800, status: 'sold' },
  { id: 82996, code: '1202', type: 'UNIDADE II — 231,53 m²', floor: 12, prumada: '2', area: 231.53, price: 6469750, status: 'sold' },
  { id: 83006, code: '1301', type: 'UNIDADE IX — 238,43 m²', floor: 13, prumada: '1', area: 238.43, price: 6935810, status: 'sold' },
  { id: 82997, code: '1302', type: 'UNIDADE II — 231,53 m²', floor: 13, prumada: '2', area: 231.53, price: 6566660, status: 'sold' },
  { id: 83007, code: '1401', type: 'UNIDADE XIV — 366,69 m²', floor: 14, prumada: '1', area: 366.69, price: 8191550, status: 'sold' },
  { id: 83008, code: '1402', type: 'UNIDADE XVII — 394,53 m²', floor: 14, prumada: '2', area: 394.53, price: 8072820, status: 'sold' },
];

export const units = applyOv(_rawUnits, 'orbitale')