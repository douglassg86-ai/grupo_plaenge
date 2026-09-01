import rawOverrides from '@/data/availability-overrides.json'
type WaveStatus = 'available' | 'sold' | 'negotiation' | 'opportunity'
const _wov = (rawOverrides as Record<string, Record<string, WaveStatus>>)['wave'] || {}

export interface Lot {
    id: number;
    block: string;
    number: string;
    type: string;
    price: number;
    area: number;
    status: 'available' | 'sold' | 'negotiation' | 'opportunity';
  }

const lotData = {
    'Quadra A': { 'A L11': { price: '530.810,00', area: '319,55', type: 'SECO' } },
    'Quadra B': { 'B L5': { price: '462.000,00', area: '278,12', type: 'SECO' } },
    'Quadra C': {
        'C L1': { price: '662.420,00', area: '341,32', type: 'CANTO/LAGO' },
        'C L2': { price: '543.810,00', area: '280,20', type: 'CANTO/LAGO' },
        'C L5': { price: '590.340,00', area: '304,18', type: 'LAGO' },
        'C L9': { price: '535.320,00', area: '275,83', type: 'LAGO' }
    },
    'Quadra D': {},
    'Quadra E': {
        'E L9':  { price: '702.140,00', area: '323,63', type: 'LAGO' },
        'E L10': { price: '637.820,00', area: '294,33', type: 'LAGO' },
        'E L12': { price: '574.280,00', area: '281,17', type: 'LAGO' },
        'E L13': { price: '583.020,00', area: '285,45', type: 'LAGO' },
        'E L15': { price: '574.400,00', area: '281,23', type: 'LAGO' },
        'E L18': { price: '672.960,00', area: '310,18', type: 'LAGO' },
        'E L19': { price: '774.320,00', area: '356,90', type: 'LAGO' },
        'E L20': { price: '687.550,00', area: '316,91', type: 'LAGO' },
        'E L23': { price: '612.290,00', area: '296,09', type: 'LAGO' },
        'E L24': { price: '598.140,00', area: '289,25', type: 'LAGO' }
    },
    'Quadra F': {
        'F L7':  { price: '666.500,00', area: '290,20', type: 'LAGO' },
        'F L8':  { price: '674.850,00', area: '293,83', type: 'LAGO' },
        'F L10': { price: '714.780,00', area: '311,22', type: 'LAGO' },
        'F L20': { price: '533.090,00', area: '261,00', type: 'LAGO' }
    },
    'Quadra G': { 'G L9': { price: '640.040,00', area: '264,06', type: 'LAGO' } },
    'Quadra H': {
        'H L1':  { price: '853.340,00', area: '417,80', type: 'LAGO' },
        'H L2':  { price: '830.990,00', area: '406,86', type: 'LAGO' },
        'H L3':  { price: '800.640,00', area: '392,00', type: 'LAGO' },
        'H L5':  { price: '751.130,00', area: '346,21', type: 'LAGO' },
        'H L10': { price: '597.240,00', area: '287,93', type: 'LAGO' }
    },
    'Quadra I': {},
    'Quadra J': {},
    'Quadra K': {},
    'Quadra L': {},
    'Quadra M': {},
    'Quadra N': {}
};

export const blockTotals: Record<string, number> = {
    A: 18, B: 5, C: 9, D: 22, E: 27, F: 21, G: 15, H: 11, I: 20, J: 25, K: 33, L: 10, M: 20, N: 20
};

const parseCurrency = (value: string) => parseFloat(value.replace(/\./g, '').replace(',', '.'));

let idCounter = 1;
export const lots: Lot[] = Object.entries(blockTotals).flatMap(([blockName, total]) => {
    const shortBlock = blockName;
    const availableLotsInBlock = lotData[`Quadra ${shortBlock}` as keyof typeof lotData] || {};
    
    return Array.from({ length: total }, (_, i) => {
        const lotNum = i + 1;
        const lotKey = `${shortBlock} L${lotNum}`;
        const availableData = availableLotsInBlock[lotKey as keyof typeof availableLotsInBlock];

        let status: Lot['status'] = 'sold';
        if (availableData) {
            status = 'available';
        }

        if (availableData) {
            return {
                id: idCounter++,
                block: shortBlock,
                number: `${lotNum}`,
                price: parseCurrency(availableData.price),
                area: parseCurrency(availableData.area),
                type: availableData.type,
                status: status
            };
        } else {
             return {
                id: idCounter++,
                block: shortBlock,
                number: `${lotNum}`,
                price: 0,
                area: 0,
                type: 'SECO',
                status: 'sold'
            };
        }
    });
});


// Find the cheapest available lot and mark it as 'opportunity'
const availableLots = lots.filter(lot => lot.status === 'available');
if (availableLots.length > 0) {
  availableLots.sort((a, b) => a.price - b.price);
  const cheapestLotId = availableLots[0].id;
  const cheapestLotInAll = lots.find(lot => lot.id === cheapestLotId);
  if (cheapestLotInAll) {
    cheapestLotInAll.status = 'opportunity';
  }
}

// Apply admin overrides
Object.entries(_wov).forEach(([id, status]) => {
  const lot = lots.find(l => String(l.id) === id)
  if (lot) lot.status = status
})
