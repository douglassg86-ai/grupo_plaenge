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
  setor: string;
  vagas?: Vaga[];
}

const VAGAS: Record<string, Vaga[]> = {
  '0201': [{ num: 83, tipo: 'DE' }],
  '0202': [{ num: 86, tipo: 'DE' }],
  '0203': [{ num: 68, tipo: 'DE' }],
  '0204': [{ num: 73, tipo: 'DE' }],
  '0301': [{ num: 35, tipo: 'DE' }],
  '0302': [{ num: 36, tipo: 'DE' }],
  '0303': [{ num: 23, tipo: 'DE' }],
  '0304': [{ num: 69, tipo: 'DE' }],
  '0401': [{ num: 44, tipo: 'SE' }, { num: 45, tipo: 'S' }],
  '0402': [{ num: 85, tipo: 'DE' }],
  '0403': [{ num: 26, tipo: 'DE' }],
  '0404': [{ num: 29, tipo: 'DE' }],
  '0501': [{ num: 32, tipo: 'DE' }],
  '0502': [{ num: 89, tipo: 'DE' }],
  '0503': [{ num: 63, tipo: 'DE' }],
  '0504': [{ num: 28, tipo: 'DE' }],
  '0601': [{ num: 82, tipo: 'DE' }],
  '0602': [{ num: 49, tipo: 'SE' }, { num: 50, tipo: 'S' }],
  '0603': [{ num: 20, tipo: 'SE' }, { num: 21, tipo: 'S' }],
  '0604': [{ num: 42, tipo: 'SE' }, { num: 43, tipo: 'S' }],
  '0701': [{ num: 46, tipo: 'SE' }, { num: 47, tipo: 'S' }],
  '0702': [{ num: 56, tipo: 'SE' }, { num: 57, tipo: 'S' }],
  '0703': [{ num: 60, tipo: 'SE' }, { num: 80, tipo: 'S' }],
  '0704': [{ num: 1, tipo: 'SE' }, { num: 6, tipo: 'S' }],
  '0801': [{ num: 52, tipo: 'SE' }, { num: 53, tipo: 'S' }],
  '0802': [{ num: 64, tipo: 'SE' }, { num: 61, tipo: 'S' }],
  '0803': [{ num: 58, tipo: 'SE' }, { num: 59, tipo: 'S' }],
  '0804': [{ num: 2, tipo: 'SE' }, { num: 3, tipo: 'S' }],
  '0902': [{ num: 10, tipo: 'SE' }, { num: 11, tipo: 'S' }],
  '0903': [{ num: 18, tipo: 'SE' }, { num: 19, tipo: 'S' }],
  '0904': [{ num: 4, tipo: 'SE' }, { num: 5, tipo: 'S' }],
  '1002': [{ num: 13, tipo: 'SE' }, { num: 14, tipo: 'S' }],
  '1003': [{ num: 66, tipo: 'DE' }, { num: 65, tipo: 'S' }],
  '1004': [{ num: 7, tipo: 'SE' }, { num: 8, tipo: 'S' }],
  '1101': [{ num: 24, tipo: 'DE' }, { num: 25, tipo: 'S' }],
  '1102': [{ num: 84, tipo: 'DE' }, { num: 55, tipo: 'S' }],
  '1103': [{ num: 34, tipo: 'DE' }, { num: 12, tipo: 'S' }],
  '1104': [{ num: 72, tipo: 'DE' }, { num: 48, tipo: 'S' }],
  '1201': [{ num: 16, tipo: 'SE' }, { num: 17, tipo: 'S' }],
  '1203': [{ num: 27, tipo: 'DE' }, { num: 15, tipo: 'S' }],
  '1204': [{ num: 30, tipo: 'DE' }, { num: 9, tipo: 'S' }],
  '1301': [{ num: 38, tipo: 'DE' }, { num: 37, tipo: 'S' }],
  '1303': [{ num: 70, tipo: 'DE' }, { num: 54, tipo: 'S' }],
  '1304': [{ num: 71, tipo: 'DE' }, { num: 51, tipo: 'S' }],
  '1401': [{ num: 33, tipo: 'DE' }, { num: 39, tipo: 'S' }],
  '1402': [{ num: 41, tipo: 'DE' }, { num: 40, tipo: 'S' }],
  '1403': [{ num: 81, tipo: 'DE' }, { num: 67, tipo: 'S' }],
  '1404': [{ num: 76, tipo: 'DE' }, { num: 75, tipo: 'S' }],
};

const _rawUnits: Unit[] = [
  { id: 101460, code: '0201', type: 'UNIDADE I — 197,73 m²', floor: 2, prumada: '1', area: 197.73, price: 2987220, status: 'available', setor: 'Torre' },
  { id: 101461, code: '0202', type: 'UNIDADE II — 177,47 m²', floor: 2, prumada: '2', area: 177.47, price: 2753810, status: 'sold', setor: 'Torre' },
  { id: 101462, code: '0203', type: 'UNIDADE III — 167,35 m²', floor: 2, prumada: '3', area: 167.35, price: 2722990, status: 'sold', setor: 'Torre' },
  { id: 101463, code: '0204', type: 'UNIDADE III — 167,35 m²', floor: 2, prumada: '4', area: 167.35, price: 2777430, status: 'negotiation', setor: 'Torre' },
  { id: 101464, code: '0301', type: 'UNIDADE IV — 150,45 m²', floor: 3, prumada: '1', area: 150.45, price: 2823800, status: 'available', setor: 'Torre' },
  { id: 101465, code: '0302', type: 'UNIDADE V — 145,08 m²', floor: 3, prumada: '2', area: 145.08, price: 2653410, status: 'sold', setor: 'Torre' },
  { id: 101466, code: '0303', type: 'UNIDADE V — 145,08 m²', floor: 3, prumada: '3', area: 145.08, price: 2609900, status: 'negotiation', setor: 'Torre' },
  { id: 101467, code: '0304', type: 'UNIDADE V — 145,08 m²', floor: 3, prumada: '4', area: 145.08, price: 2662130, status: 'sold', setor: 'Torre' },
  { id: 101468, code: '0401', type: 'UNIDADE VI — 155,45 m²', floor: 4, prumada: '1', area: 155.45, price: 2974230, status: 'sold', setor: 'Torre' },
  { id: 101469, code: '0402', type: 'UNIDADE IV — 150,45 m²', floor: 4, prumada: '2', area: 150.45, price: 2839380, status: 'available', setor: 'Torre' },
  { id: 101470, code: '0403', type: 'UNIDADE V — 145,08 m²', floor: 4, prumada: '3', area: 145.08, price: 2676790, status: 'sold', setor: 'Torre' },
  { id: 101471, code: '0404', type: 'UNIDADE V — 145,08 m²', floor: 4, prumada: '4', area: 145.08, price: 2730330, status: 'sold', setor: 'Torre' },
  { id: 101472, code: '0501', type: 'UNIDADE V — 145,08 m²', floor: 5, prumada: '1', area: 145.08, price: 2835340, status: 'available', setor: 'Torre' },
  { id: 101473, code: '0502', type: 'UNIDADE IV — 150,45 m²', floor: 5, prumada: '2', area: 150.45, price: 2865140, status: 'sold', setor: 'Torre' },
  { id: 101474, code: '0503', type: 'UNIDADE V — 145,08 m²', floor: 5, prumada: '3', area: 145.08, price: 2717590, status: 'sold', setor: 'Torre' },
  { id: 101475, code: '0504', type: 'UNIDADE V — 145,08 m²', floor: 5, prumada: '4', area: 145.08, price: 2771920, status: 'sold', setor: 'Torre' },
  { id: 101476, code: '0601', type: 'UNIDADE IV — 150,45 m²', floor: 6, prumada: '1', area: 150.45, price: 2985050, status: 'available', setor: 'Torre' },
  { id: 101477, code: '0602', type: 'UNIDADE VI — 155,45 m²', floor: 6, prumada: '2', area: 155.45, price: 3023780, status: 'available', setor: 'Torre' },
  { id: 101478, code: '0603', type: 'UNIDADE V — 145,08 m²', floor: 6, prumada: '3', area: 145.08, price: 2758990, status: 'sold', setor: 'Torre' },
  { id: 101479, code: '0604', type: 'UNIDADE V — 145,08 m²', floor: 6, prumada: '4', area: 145.08, price: 2814110, status: 'sold', setor: 'Torre' },
  { id: 101480, code: '0701', type: 'UNIDADE V — 145,08 m²', floor: 7, prumada: '1', area: 145.08, price: 2856960, status: 'sold', setor: 'Torre' },
  { id: 101481, code: '0702', type: 'UNIDADE IV — 150,45 m²', floor: 7, prumada: '2', area: 150.45, price: 2904650, status: 'sold', setor: 'Torre' },
  { id: 101482, code: '0703', type: 'UNIDADE V — 145,08 m²', floor: 7, prumada: '3', area: 145.08, price: 2847650, status: 'sold', setor: 'Torre' },
  { id: 101483, code: '0704', type: 'UNIDADE V — 145,08 m²', floor: 7, prumada: '4', area: 145.08, price: 2856960, status: 'sold', setor: 'Torre' },
  { id: 101484, code: '0801', type: 'UNIDADE IV — 150,45 m²', floor: 8, prumada: '1', area: 150.45, price: 3057990, status: 'sold', setor: 'Torre' },
  { id: 101485, code: '0802', type: 'UNIDADE V — 145,08 m²', floor: 8, prumada: '2', area: 145.08, price: 2908680, status: 'available', setor: 'Torre' },
  { id: 101486, code: '0803', type: 'UNIDADE V — 145,08 m²', floor: 8, prumada: '3', area: 145.08, price: 2908680, status: 'available', setor: 'Torre' },
  { id: 101487, code: '0804', type: 'UNIDADE V — 145,08 m²', floor: 8, prumada: '4', area: 145.08, price: 2900450, status: 'sold', setor: 'Torre' },
  { id: 101488, code: '0901', type: 'UNIDADE DUPLEX — 295,09 m²', floor: 9, prumada: '1', area: 295.09, price: 6124780, status: 'available', setor: 'Torre' },
  { id: 101489, code: '0902', type: 'UNIDADE IV — 150,45 m²', floor: 9, prumada: '2', area: 150.45, price: 3061550, status: 'available', setor: 'Torre' },
  { id: 101490, code: '0903', type: 'UNIDADE V — 145,08 m²', floor: 9, prumada: '3', area: 145.08, price: 2934400, status: 'sold', setor: 'Torre' },
  { id: 101491, code: '0904', type: 'UNIDADE V — 145,08 m²', floor: 9, prumada: '4', area: 145.08, price: 2943980, status: 'sold', setor: 'Torre' },
  { id: 101492, code: '1002', type: 'UNIDADE VII — 150,42 m²', floor: 10, prumada: '2', area: 150.42, price: 3106880, status: 'available', setor: 'Torre' },
  { id: 101493, code: '1003', type: 'UNIDADE V — 145,08 m²', floor: 10, prumada: '3', area: 145.08, price: 2978380, status: 'sold', setor: 'Torre' },
  { id: 101494, code: '1004', type: 'UNIDADE V — 145,08 m²', floor: 10, prumada: '4', area: 145.08, price: 2988150, status: 'sold', setor: 'Torre' },
  { id: 101495, code: '1101', type: 'UNIDADE VIII — 162,98 m²', floor: 11, prumada: '1', area: 162.98, price: 3437140, status: 'negotiation', setor: 'Torre' },
  { id: 101496, code: '1102', type: 'UNIDADE V — 145,08 m²', floor: 11, prumada: '2', area: 145.08, price: 2999640, status: 'sold', setor: 'Torre' },
  { id: 101497, code: '1103', type: 'UNIDADE V — 145,08 m²', floor: 11, prumada: '3', area: 145.08, price: 3023040, status: 'sold', setor: 'Torre' },
  { id: 101498, code: '1104', type: 'UNIDADE V — 145,08 m²', floor: 11, prumada: '4', area: 145.08, price: 3032930, status: 'sold', setor: 'Torre' },
  { id: 101499, code: '1201', type: 'UNIDADE IV — 150,45 m²', floor: 12, prumada: '1', area: 150.45, price: 3192380, status: 'sold', setor: 'Torre' },
  { id: 101500, code: '1202', type: 'UNIDADE DUPLEX — 295,09 m²', floor: 12, prumada: '2', area: 295.09, price: 6138560, status: 'sold', setor: 'Torre' },
  { id: 101501, code: '1203', type: 'UNIDADE V — 145,08 m²', floor: 12, prumada: '3', area: 145.08, price: 3018060, status: 'sold', setor: 'Torre' },
  { id: 101502, code: '1204', type: 'UNIDADE V — 145,08 m²', floor: 13, prumada: '4', area: 145.08, price: 3078450, status: 'sold', setor: 'Torre' },
  { id: 101503, code: '1301', type: 'UNIDADE VII — 150,42 m²', floor: 13, prumada: '1', area: 150.42, price: 3239630, status: 'sold', setor: 'Torre' },
  { id: 101504, code: '1303', type: 'UNIDADE V — 145,08 m²', floor: 13, prumada: '3', area: 145.08, price: 3063360, status: 'sold', setor: 'Torre' },
  { id: 101505, code: '1304', type: 'UNIDADE V — 145,08 m²', floor: 13, prumada: '4', area: 145.08, price: 3124640, status: 'sold', setor: 'Torre' },
  { id: 101506, code: '1401', type: 'UNIDADE DUPLEX — 303,56 m²', floor: 14, prumada: '1', area: 303.56, price: 5896940, status: 'sold', setor: 'Torre' },
  { id: 101507, code: '1402', type: 'UNIDADE DUPLEX — 321,46 m²', floor: 14, prumada: '2', area: 321.46, price: 6187990, status: 'available', setor: 'Torre' },
  { id: 101508, code: '1403', type: 'UNIDADE DUPLEX — 303,56 m²', floor: 14, prumada: '3', area: 303.56, price: 5781280, status: 'sold', setor: 'Torre' },
  { id: 101509, code: '1404', type: 'UNIDADE DUPLEX — 303,56 m²', floor: 14, prumada: '4', area: 303.56, price: 5896940, status: 'sold', setor: 'Torre' },
  { id: 101456, code: '0101', type: 'UNIDADE GARDEN - CASA — 369,73 m²', floor: 0, prumada: '1', area: 369.73, price: 5408310, status: 'sold', setor: 'Casas' },
  { id: 101457, code: '0102', type: 'UNIDADE GARDEN - CASA — 366,05 m²', floor: 0, prumada: '2', area: 366.05, price: 5556090, status: 'sold', setor: 'Casas' },
  { id: 101458, code: '0103', type: 'UNIDADE GARDEN - CASA — 366,31 m²', floor: 0, prumada: '3', area: 366.31, price: 5671160, status: 'sold', setor: 'Casas' },
  { id: 101459, code: '0104', type: 'UNIDADE GARDEN - CASA — 366,35 m²', floor: 0, prumada: '4', area: 366.35, price: 5671390, status: 'sold', setor: 'Casas' },
];

export const units = applyOv(_rawUnits, 'verdant').map(u => ({ ...u, vagas: VAGAS[u.code] ?? [] }))
export const setores = ['Torre', 'Casas'] as const;