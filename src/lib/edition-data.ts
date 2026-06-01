export interface Unit {
  id: number;
  code: string;
  type: string;
  floor: number;
  prumada: string;
  area: number;
  price: number;
  status: 'available' | 'sold' | 'negotiation';
  tower: string;
}

export const units: Unit[] = [
  { id: 106507, code: '0501', type: 'UNIDADE II', floor: 5, prumada: '1', area: 172.37, price: 4091290, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106508, code: '0502', type: 'UNIDADE I', floor: 5, prumada: '2', area: 146.46, price: 3377490, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106509, code: '0601', type: 'UNIDADE II', floor: 6, prumada: '1', area: 172.37, price: 4174810, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106510, code: '0602', type: 'UNIDADE I', floor: 6, prumada: '2', area: 146.46, price: 3446430, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106511, code: '0701', type: 'UNIDADE II', floor: 7, prumada: '1', area: 172.37, price: 4260000, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106512, code: '0702', type: 'UNIDADE I', floor: 7, prumada: '2', area: 146.46, price: 3516750, status: 'negotiation', tower: 'Torre Jardim Cristofel' },
  { id: 106513, code: '0801', type: 'UNIDADE II', floor: 8, prumada: '1', area: 172.37, price: 4346940, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106514, code: '0802', type: 'UNIDADE I', floor: 8, prumada: '2', area: 146.46, price: 3588530, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106515, code: '0901', type: 'UNIDADE II', floor: 9, prumada: '1', area: 172.37, price: 4481360, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106516, code: '0902', type: 'UNIDADE I', floor: 9, prumada: '2', area: 146.46, price: 3738040, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106517, code: '1001', type: 'UNIDADE II', floor: 10, prumada: '1', area: 172.37, price: 4548570, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106518, code: '1002', type: 'UNIDADE I', floor: 10, prumada: '2', area: 146.46, price: 3794120, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106519, code: '1101', type: 'UNIDADE II', floor: 11, prumada: '1', area: 172.37, price: 4616810, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106520, code: '1102', type: 'UNIDADE I', floor: 11, prumada: '2', area: 146.46, price: 3907920, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106521, code: '1201', type: 'UNIDADE II', floor: 12, prumada: '1', area: 172.37, price: 4686060, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106522, code: '1202', type: 'UNIDADE I', floor: 12, prumada: '2', area: 146.46, price: 3270330, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106523, code: '1301', type: 'UNIDADE II', floor: 13, prumada: '1', area: 172.37, price: 4756330, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106524, code: '1302', type: 'UNIDADE I', floor: 13, prumada: '2', area: 146.46, price: 4026040, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106525, code: '1401', type: 'UNIDADE III', floor: 14, prumada: '1', area: 322.18, price: 9717970, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106526, code: '1501', type: 'UNIDADE III', floor: 15, prumada: '1', area: 322.18, price: 9912330, status: 'available', tower: 'Torre Jardim Cristofel' },
  { id: 106527, code: '1601', type: 'UNIDADE III', floor: 16, prumada: '1', area: 322.18, price: 10110570, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106528, code: '1701', type: 'UNIDADE IV', floor: 17, prumada: '1', area: 545.67, price: 9722880, status: 'sold', tower: 'Torre Jardim Cristofel' },
  { id: 106480, code: '0501', type: 'UNIDADE II', floor: 5, prumada: '1', area: 206.08, price: 4909060, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106481, code: '0502', type: 'UNIDADE I', floor: 5, prumada: '2', area: 172.03, price: 3974110, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106482, code: '0601', type: 'UNIDADE II', floor: 6, prumada: '1', area: 206.08, price: 5009250, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106483, code: '0602', type: 'UNIDADE I', floor: 6, prumada: '2', area: 172.03, price: 4076020, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106484, code: '0701', type: 'UNIDADE II', floor: 7, prumada: '1', area: 206.08, price: 5111470, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106485, code: '0702', type: 'UNIDADE I', floor: 7, prumada: '2', area: 172.03, price: 4180540, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106486, code: '0801', type: 'UNIDADE II', floor: 8, prumada: '1', area: 206.08, price: 5215800, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106487, code: '0802', type: 'UNIDADE I', floor: 8, prumada: '2', area: 172.03, price: 4287710, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106488, code: '0901', type: 'UNIDADE II', floor: 9, prumada: '1', area: 206.08, price: 5322220, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106489, code: '0902', type: 'UNIDADE I', floor: 9, prumada: '2', area: 172.03, price: 4397640, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106490, code: '1001', type: 'UNIDADE II', floor: 10, prumada: '1', area: 206.08, price: 5430820, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106491, code: '1002', type: 'UNIDADE I', floor: 10, prumada: '2', area: 172.03, price: 4510420, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106492, code: '1101', type: 'UNIDADE II', floor: 11, prumada: '1', area: 206.08, price: 5541690, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106493, code: '1102', type: 'UNIDADE I', floor: 11, prumada: '2', area: 172.03, price: 4626050, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106494, code: '1201', type: 'UNIDADE II', floor: 12, prumada: '1', area: 206.08, price: 5624820, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106495, code: '1202', type: 'UNIDADE I', floor: 12, prumada: '2', area: 172.03, price: 4695440, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106496, code: '1301', type: 'UNIDADE II', floor: 13, prumada: '1', area: 206.08, price: 5709170, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106497, code: '1302', type: 'UNIDADE I', floor: 13, prumada: '2', area: 172.03, price: 4765880, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106498, code: '1401', type: 'UNIDADE II', floor: 14, prumada: '1', area: 206.08, price: 4422770, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106499, code: '1402', type: 'UNIDADE I', floor: 14, prumada: '2', area: 172.03, price: 4837370, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106500, code: '1501', type: 'UNIDADE II', floor: 15, prumada: '1', area: 206.08, price: 4077000, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106501, code: '1502', type: 'UNIDADE I', floor: 15, prumada: '2', area: 172.03, price: 3743690, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106502, code: '1601', type: 'UNIDADE II', floor: 16, prumada: '1', area: 206.08, price: 4950560, status: 'sold', tower: 'Torre Doutor Vale' },
  { id: 106503, code: '1602', type: 'UNIDADE I', floor: 16, prumada: '2', area: 172.03, price: 4983560, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106504, code: '1701', type: 'UNIDADE IV', floor: 17, prumada: '1', area: 369.16, price: 7394270, status: 'available', tower: 'Torre Doutor Vale' },
  { id: 106505, code: '1702', type: 'UNIDADE III', floor: 17, prumada: '2', area: 278.74, price: 5895850, status: 'available', tower: 'Torre Doutor Vale' },
];

export const towers = ['Torre Jardim Cristofel', 'Torre Doutor Vale'] as const;
