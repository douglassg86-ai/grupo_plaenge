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
    'Quadra A': { 'A L11': { price: '534.320,00', area: '319,55', type: 'SECO' } },
    'Quadra B': { 'B L5': { price: '465.050,00', area: '278,12', type: 'SECO' } },
    'Quadra C': {
        'C L1': { price: '666.800,00', area: '341,32', type: 'CANTO/LAGO' },
        'C L2': { price: '547.400,00', area: '280,20', type: 'CANTO/LAGO' },
        'C L5': { price: '594.240,00', area: '304,18', type: 'LAGO' },
        'C L9': { price: '538.860,00', area: '275,83', type: 'LAGO' }
    },
    'Quadra D': {},
    'Quadra E': {
        'E L9':  { price: '706.780,00', area: '323,63', type: 'LAGO' },
        'E L10': { price: '642.030,00', area: '294,33', type: 'LAGO' },
        'E L12': { price: '578.080,00', area: '281,17', type: 'LAGO' },
        'E L13': { price: '586.870,00', area: '285,45', type: 'LAGO' },
        'E L15': { price: '578.200,00', area: '281,23', type: 'LAGO' },
        'E L18': { price: '677.410,00', area: '310,18', type: 'LAGO' },
        'E L19': { price: '779.440,00', area: '356,90', type: 'LAGO' },
        'E L20': { price: '692.090,00', area: '316,91', type: 'LAGO' },
        'E L23': { price: '616.340,00', area: '296,09', type: 'LAGO' },
        'E L24': { price: '602.090,00', area: '289,25', type: 'LAGO' }
    },
    'Quadra F': {
        'F L7':  { price: '670.900,00', area: '290,20', type: 'LAGO' },
        'F L8':  { price: '679.310,00', area: '293,83', type: 'LAGO' },
        'F L10': { price: '719.500,00', area: '311,22', type: 'LAGO' },
        'F L20': { price: '536.610,00', area: '261,00', type: 'LAGO' }
    },
    'Quadra G': { 'G L9': { price: '644.270,00', area: '264,06', type: 'LAGO' } },
    'Quadra H': {
        'H L1':  { price: '858.980,00', area: '417,80', type: 'LAGO' },
        'H L2':  { price: '836.480,00', area: '406,86', type: 'LAGO' },
        'H L3':  { price: '805.930,00', area: '392,00', type: 'LAGO' },
        'H L5':  { price: '756.090,00', area: '346,21', type: 'LAGO' },
        'H L10': { price: '601.190,00', area: '287,93', type: 'LAGO' }
    },
    'Quadra I': {
        'I L1':  { price: '658.350,00', area: '301,45', type: 'LAGO' },
        'I L19': { price: '542.810,00', area: '264,02', type: 'LAGO' },
        'I L20': { price: '628.090,00', area: '305,50', type: 'LAGO' }
    },
    'Quadra J': { 'J L13': { price: '785.740,00', area: '339,87', type: 'LAGO' } },
    'Quadra K': {
        'K L20': { price: '501.990,00', area: '244,16', type: 'LAGO' },
        'K L33': { price: '586.140,00', area: '253,53', type: 'LAGO' }
    },
    'Quadra L': {},
    'Quadra M': {},
    'Quadra N': {
        'N L9':  { price: '510.030,00', area: '244,27', type: 'LAGO' },
        'N L15': { price: '509.360,00', area: '243,95', type: 'LAGO' },
        'N L18': { price: '552.400,00', area: '268,68', type: 'CANTO/LAGO' },
        'N L20': { price: '515.940,00', area: '267,60', type: 'CANTO/LAGO' }
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
