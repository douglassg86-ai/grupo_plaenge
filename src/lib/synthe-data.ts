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
  // Andar 3 — Tipo A (01=176.8 / 02=180.39)
  { id: 200001, code: '0301', type: 'Apartamento — 3 Suítes', floor: 3,  prumada: '1', area: 176.8,  price: 3152750, status: 'available' },
  { id: 200002, code: '0302', type: 'Apartamento — 3 Suítes', floor: 3,  prumada: '2', area: 180.39, price: 3174240, status: 'available' },
  // Andar 4 — Tipo B (01=180.3 / 02=176.89)
  { id: 200003, code: '0401', type: 'Apartamento — 3 Suítes', floor: 4,  prumada: '1', area: 180.3,  price: 3194320, status: 'available' },
  { id: 200004, code: '0402', type: 'Apartamento — 3 Suítes', floor: 4,  prumada: '2', area: 176.89, price: 3176180, status: 'available' },
  // Andar 5 — Tipo A
  { id: 200005, code: '0501', type: 'Apartamento — 3 Suítes', floor: 5,  prumada: '1', area: 176.8,  price: 3189930, status: 'available' },
  { id: 200006, code: '0502', type: 'Apartamento — 3 Suítes', floor: 5,  prumada: '2', area: 180.39, price: 3211630, status: 'available' },
  // Andar 6 — Tipo A
  { id: 200007, code: '0601', type: 'Apartamento — 3 Suítes', floor: 6,  prumada: '1', area: 176.8,  price: 3217840, status: 'available' },
  { id: 200008, code: '0602', type: 'Apartamento — 3 Suítes', floor: 6,  prumada: '2', area: 180.39, price: 3242810, status: 'sold' },
  // Andar 7 — Tipo B
  { id: 200009, code: '0701', type: 'Apartamento — 3 Suítes', floor: 7,  prumada: '1', area: 180.3,  price: 3272250, status: 'available' },
  { id: 200010, code: '0702', type: 'Apartamento — 3 Suítes', floor: 7,  prumada: '2', area: 176.89, price: 3253610, status: 'available' },
  // Andar 8 — Tipo A
  { id: 200011, code: '0801', type: 'Apartamento — 3 Suítes', floor: 8,  prumada: '1', area: 176.8,  price: 3282850, status: 'available' },
  { id: 200012, code: '0802', type: 'Apartamento — 3 Suítes', floor: 8,  prumada: '2', area: 180.39, price: 3305160, status: 'available' },
  // Andar 9 — Tipo B
  { id: 200013, code: '0901', type: 'Apartamento — 3 Suítes', floor: 9,  prumada: '1', area: 180.3,  price: 3350160, status: 'sold' },
  { id: 200014, code: '0902', type: 'Apartamento — 3 Suítes', floor: 9,  prumada: '2', area: 176.89, price: 3315550, status: 'available' },
  // Andar 10 — Tipo A (ambas vendidas; valores interpolados)
  { id: 200015, code: '1001', type: 'Apartamento — 3 Suítes', floor: 10, prumada: '1', area: 176.8,  price: 3355110, status: 'sold' },
  { id: 200016, code: '1002', type: 'Apartamento — 3 Suítes', floor: 10, prumada: '2', area: 180.39, price: 3377930, status: 'sold' },
  // Andar 11 — Tipo B (ambas vendidas; valores interpolados)
  { id: 200017, code: '1101', type: 'Apartamento — 3 Suítes', floor: 11, prumada: '1', area: 180.3,  price: 3428080, status: 'sold' },
  { id: 200018, code: '1102', type: 'Apartamento — 3 Suítes', floor: 11, prumada: '2', area: 176.89, price: 3398210, status: 'sold' },
  // Andar 12 — Tipo A (ambas vendidas; valores interpolados)
  { id: 200019, code: '1201', type: 'Apartamento — 3 Suítes', floor: 12, prumada: '1', area: 176.8,  price: 3427380, status: 'sold' },
  { id: 200020, code: '1202', type: 'Apartamento — 3 Suítes', floor: 12, prumada: '2', area: 180.39, price: 3450710, status: 'sold' },
  // Andar 13 — Tipo B (ambas vendidas; valores interpolados)
  { id: 200021, code: '1301', type: 'Apartamento — 3 Suítes', floor: 13, prumada: '1', area: 180.3,  price: 3505990, status: 'sold' },
  { id: 200022, code: '1302', type: 'Apartamento — 3 Suítes', floor: 13, prumada: '2', area: 176.89, price: 3480860, status: 'sold' },
  // Andar 14 — Tipo A
  { id: 200023, code: '1401', type: 'Apartamento — 3 Suítes', floor: 14, prumada: '1', area: 176.8,  price: 3499640, status: 'available' },
  { id: 200024, code: '1402', type: 'Apartamento — 3 Suítes', floor: 14, prumada: '2', area: 180.39, price: 3523480, status: 'available' },
  // Andar 15 — Tipo B
  { id: 200025, code: '1501', type: 'Apartamento — 3 Suítes', floor: 15, prumada: '1', area: 180.3,  price: 3583900, status: 'available' },
  { id: 200026, code: '1502', type: 'Apartamento — 3 Suítes', floor: 15, prumada: '2', area: 176.89, price: 3563520, status: 'available' },
  // Andar 16 — Tipo A
  { id: 200027, code: '1601', type: 'Apartamento — 3 Suítes', floor: 16, prumada: '1', area: 176.8,  price: 3592560, status: 'available' },
  { id: 200028, code: '1602', type: 'Apartamento — 3 Suítes', floor: 16, prumada: '2', area: 180.39, price: 3617010, status: 'available' },
  // Andar 17 — Tipo B
  { id: 200029, code: '1701', type: 'Apartamento — 3 Suítes', floor: 17, prumada: '1', area: 180.3,  price: 3646250, status: 'available' },
  { id: 200030, code: '1702', type: 'Apartamento — 3 Suítes', floor: 17, prumada: '2', area: 176.89, price: 3625470, status: 'available' },
  // Andar 18 — Penthouse
  { id: 200031, code: '1801', type: 'Penthouse — 3 Suítes + Rooftop Privativo', floor: 18, prumada: '1', area: 295.99, price: 4435300, status: 'sold' },
  { id: 200032, code: '1802', type: 'Penthouse — 3 Suítes + Rooftop Privativo', floor: 18, prumada: '2', area: 295.99, price: 4435300, status: 'sold' },
];

export const units = applyOv(_rawUnits, 'synthe')
