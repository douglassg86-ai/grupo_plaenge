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
    'Quadra A': { 'A L11': { price: '518.928,36', area: '319,55', type: 'SECO' } },
    'Quadra B': { 'B L5': { price: '451.648,74', area: '278,12', type: 'SECO' } },
    'Quadra C': {
        'C L2': { price: '531.633,60', area: '280,20', type: 'CANTO/LAGO' },
        'C L5': { price: '577.131,72', area: '304,18', type: 'LAGO' },
        'C L9': { price: '523.342,24', area: '275,83', type: 'LAGO' }
    },
    'Quadra D': {
        'D L5': { price: '334.714,43', area: '243,36', type: 'JARDIM' }
    },
    'Quadra E': {
        'E L9':  { price: '686.428,37', area: '323,63', type: 'LAGO' },
        'E L10': { price: '623.550,69', area: '294,33', type: 'LAGO' },
        'E L13': { price: '569.973,68', area: '285,45', type: 'LAGO' },
        'E L15': { price: '561.547,37', area: '281,23', type: 'LAGO' },
        'E L18': { price: '657.900,54', area: '310,18', type: 'LAGO' },
        'E L19': { price: '756.994,98', area: '356,90', type: 'LAGO' },
        'E L20': { price: '672.175,06', area: '316,91', type: 'LAGO' },
        'E L23': { price: '598.578,37', area: '296,09', type: 'LAGO' },
        'E L24': { price: '584.750,56', area: '289,25', type: 'LAGO' }
    },
    'Quadra F': {
        'F L7':  { price: '651.586,52', area: '290,20', type: 'LAGO' },
        'F L8':  { price: '659.736,97', area: '293,83', type: 'LAGO' },
        'F L10': { price: '698.782,76', area: '311,22', type: 'LAGO' },
        'F L20': { price: '521.153,02', area: '261,00', type: 'LAGO' }
    },
    'Quadra G': { 'G L9': { price: '625.709,96', area: '264,06', type: 'LAGO' } },
    'Quadra H': {
        'H L1':  { price: '834.244,18', area: '417,80', type: 'LAGO' },
        'H L2':  { price: '812.399,68', area: '406,86', type: 'LAGO' },
        'H L3':  { price: '782.727,91', area: '392,00', type: 'LAGO' },
        'H L5':  { price: '734.321,18', area: '346,21', type: 'LAGO' },
        'H L10': { price: '583.871,14', area: '287,93', type: 'LAGO' }
    },
    'Quadra I': {
        'I L1':  { price: '639.383,96', area: '301,45', type: 'LAGO' },
        'I L19': { price: '527.183,22', area: '264,02', type: 'LAGO' },
        'I L20': { price: '610.008,61', area: '305,50', type: 'LAGO' }
    },
    'Quadra J': { 'J L13': { price: '763.110,65', area: '339,87', type: 'LAGO' } },
    'Quadra K': {
        'K L20': { price: '487.527,67', area: '244,16', type: 'LAGO' },
        'K L26': { price: '487.747,31', area: '244,27', type: 'LAGO' },
        'K L33': { price: '569.251,31', area: '253,53', type: 'LAGO' }
    },
    'Quadra L': {},
    'Quadra M': {
        'M L6': { price: '298.256,08', area: '240,00', type: 'JARDIM' }
    },
    'Quadra N': {
        'N L3':  { price: '613.753,19', area: '273,35', type: 'LAGO' },
        'N L9':  { price: '495.336,37', area: '244,27', type: 'LAGO' },
        'N L15': { price: '494.687,47', area: '243,95', type: 'LAGO' },
        'N L18': { price: '536.488,10', area: '268,68', type: 'CANTO/LAGO' },
        'N L20': { price: '501.076,05', area: '267,60', type: 'CANTO/LAGO' }
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
