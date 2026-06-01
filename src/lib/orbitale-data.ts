export interface Unit {
  id: number; code: string; type: string; floor: number;
  prumada: string; area: number; price: number;
  status: 'available' | 'sold' | 'negotiation';
}

export const units: Unit[] = [
  { id: 82983, code: '0201', type: 'Garden A — 502,86 m²', floor: 2, prumada: '1', area: 502.86, price: 7554250, status: 'sold' },
  { id: 82984, code: '0202', type: 'Garden B — 397,10 m²', floor: 2, prumada: '2', area: 397.1, price: 6627410, status: 'available' },
  { id: 82985, code: '0301', type: 'Tipo A — 230,94 m²', floor: 3, prumada: '1', area: 230.94, price: 5696380, status: 'available' },
  { id: 82986, code: '0302', type: 'Tipo B — 231,53 m²', floor: 3, prumada: '2', area: 231.53, price: 5568220, status: 'sold' },
  { id: 82987, code: '0401', type: 'Tipo A — 231,62 m²', floor: 4, prumada: '1', area: 231.62, price: 5829780, status: 'sold' },
  { id: 82988, code: '0402', type: 'Tipo B — 231,53 m²', floor: 4, prumada: '2', area: 231.53, price: 5681830, status: 'sold' },
  { id: 82998, code: '0501', type: 'Tipo A — 232,38 m²', floor: 5, prumada: '1', area: 232.38, price: 5937900, status: 'sold' },
  { id: 82989, code: '0502', type: 'Tipo B — 231,53 m²', floor: 5, prumada: '2', area: 231.53, price: 5768320, status: 'sold' },
  { id: 82999, code: '0601', type: 'Tipo A — 233,14 m²', floor: 6, prumada: '1', area: 233.14, price: 6048080, status: 'sold' },
  { id: 82990, code: '0602', type: 'Tipo B — 231,53 m²', floor: 6, prumada: '2', area: 231.53, price: 5856220, status: 'sold' },
  { id: 83000, code: '0701', type: 'Tipo A — 233,90 m²', floor: 7, prumada: '1', area: 233.9, price: 6160240, status: 'sold' },
  { id: 82991, code: '0702', type: 'Tipo B — 231,53 m²', floor: 7, prumada: '2', area: 231.53, price: 5945290, status: 'sold' },
  { id: 83001, code: '0801', type: 'Tipo A — 234,66 m²', floor: 8, prumada: '1', area: 234.65, price: 6273970, status: 'sold' },
  { id: 82992, code: '0802', type: 'Tipo B — 231,53 m²', floor: 8, prumada: '2', area: 231.53, price: 6035860, status: 'negotiation' },
  { id: 83002, code: '0901', type: 'Tipo A — 236,18 m²', floor: 9, prumada: '1', area: 235.41, price: 6388750, status: 'sold' },
  { id: 82993, code: '0902', type: 'Tipo B — 231,53 m²', floor: 9, prumada: '2', area: 231.53, price: 6126450, status: 'sold' },
  { id: 83003, code: '1001', type: 'Tipo A — 236,94 m²', floor: 10, prumada: '1', area: 236.16, price: 6505240, status: 'sold' },
  { id: 82994, code: '1002', type: 'Tipo B — 231,53 m²', floor: 10, prumada: '2', area: 231.53, price: 6218220, status: 'sold' },
  { id: 83004, code: '1101', type: 'Tipo A — 237,70 m²', floor: 11, prumada: '1', area: 236.92, price: 6624050, status: 'sold' },
  { id: 82995, code: '1102', type: 'Tipo B — 231,53 m²', floor: 11, prumada: '2', area: 231.53, price: 6311530, status: 'sold' },
  { id: 83005, code: '1201', type: 'Tipo A — 238,46 m²', floor: 12, prumada: '1', area: 237.68, price: 6745020, status: 'sold' },
  { id: 82996, code: '1202', type: 'Tipo B — 231,53 m²', floor: 12, prumada: '2', area: 231.53, price: 6406320, status: 'sold' },
  { id: 83006, code: '1301', type: 'Tipo A — 235,42 m²', floor: 13, prumada: '1', area: 238.43, price: 6867810, status: 'sold' },
  { id: 82997, code: '1302', type: 'Tipo B — 231,53 m²', floor: 13, prumada: '2', area: 231.53, price: 6502280, status: 'sold' },
  { id: 83007, code: '1401', type: 'Tipo B — 231,53 m²', floor: 14, prumada: '1', area: 366.69, price: 8111240, status: 'sold' },
  { id: 83008, code: '1402', type: 'Rooftop B — 394,53 m²', floor: 14, prumada: '2', area: 394.53, price: 7993680, status: 'sold' },
];
