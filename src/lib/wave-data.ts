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
    'Quadra A': { 'A L11': { price: '523.494,93', area: '319,55', type: 'SECO' } },
    'Quadra B': { 'B L5': { price: '455.623,25', area: '278,12', type: 'SECO' } },
    'Quadra C': {
        'C L2': { price: '536.311,97', area: '280,20', type: 'CANTO/LAGO' },
        'C L5': { price: '582.210,48', area: '304,18', type: 'LAGO' },
        'C L9': { price: '527.947,65', area: '275,83', type: 'LAGO' }
    },
    'Quadra D': {
        'D L5': { price: '337.659,92', area: '243,36', type: 'JARDIM' }
    },
    'Quadra E': {
        'E L9':  { price: '692.468,94', area: '323,63', type: 'LAGO' },
        'E L10': { price: '629.037,94', area: '294,33', type: 'LAGO' },
        'E L13': { price: '574.989,44', area: '285,45', type: 'LAGO' },
        'E L15': { price: '566.488,99', area: '281,23', type: 'LAGO' },
        'E L18': { price: '663.690,06', area: '310,18', type: 'LAGO' },
        'E L19': { price: '763.656,53', area: '356,90', type: 'LAGO' },
        'E L20': { price: '678.090,20', area: '316,91', type: 'LAGO' },
        'E L23': { price: '603.845,86', area: '296,09', type: 'LAGO' },
        'E L24': { price: '589.896,36', area: '289,25', type: 'LAGO' }
    },
    'Quadra F': {
        'F L7':  { price: '657.320,48', area: '290,20', type: 'LAGO' },
        'F L8':  { price: '665.542,65', area: '293,83', type: 'LAGO' },
        'F L10': { price: '704.932,05', area: '311,22', type: 'LAGO' },
        'F L20': { price: '525.739,17', area: '261,00', type: 'LAGO' }
    },
    'Quadra G': { 'G L9': { price: '631.216,21', area: '264,06', type: 'LAGO' } },
    'Quadra H': {
        'H L1':  { price: '841.585,53', area: '417,80', type: 'LAGO' },
        'H L2':  { price: '819.548,80', area: '406,86', type: 'LAGO' },
        'H L3':  { price: '789.615,91', area: '392,00', type: 'LAGO' },
        'H L5':  { price: '740.783,21', area: '346,21', type: 'LAGO' },
        'H L10': { price: '589.009,20', area: '287,93', type: 'LAGO' }
    },
    'Quadra I': {
        'I L1':  { price: '639.383,96', area: '301,45', type: 'LAGO' },
        'I L19': { price: '531.822,43', area: '264,02', type: 'LAGO' },
        'I L20': { price: '615.376,69', area: '305,50', type: 'LAGO' }
    },
    'Quadra J': { 'J L13': { price: '769.826,03', area: '339,87', type: 'LAGO' } },
    'Quadra K': {
        'K L20': { price: '491.817,91', area: '244,16', type: 'LAGO' },
        'K L26': { price: '492.039,49', area: '244,27', type: 'LAGO' },
        'K L33': { price: '574.260,73', area: '253,53', type: 'LAGO' }
    },
    'Quadra L': {},
    'Quadra M': {
        'M L6': { price: '300.880,73', area: '240,00', type: 'JARDIM' }
    },
    'Quadra N': {
        'N L3':  { price: '619.154,22', area: '273,35', type: 'LAGO' },
        'N L9':  { price: '499.695,33', area: '244,27', type: 'LAGO' },
        'N L15': { price: '499.040,72', area: '243,95', type: 'LAGO' },
        'N L18': { price: '541.209,19', area: '268,68', type: 'CANTO/LAGO' },
        'N L20': { price: '505.485,52', area: '267,60', type: 'CANTO/LAGO' }
    }
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
