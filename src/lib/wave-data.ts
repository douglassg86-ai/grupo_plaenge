
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
    'Quadra A': { 'A L11': { price: '511.081,49', area: '319,55', type: 'SECO' } },
    'Quadra B': { 'B L5': { price: '444.819,22', area: '278,12', type: 'SECO' } },
    'Quadra C': {
        'C L2': { price: '523.594,61', area: '280,20', type: 'CANTO/LAGO' },
        'C L5': { price: '568.404,74', area: '304,18', type: 'LAGO' },
        'C L9': { price: '515.428,62', area: '275,83', type: 'LAGO' }
    },
    'Quadra D': {},
    'Quadra E': {
        'E L9': { price: '676.048,68', area: '323,63', type: 'LAGO' },
        'E L10': { price: '614.121,80', area: '294,33', type: 'LAGO' },
        'E L15': { price: '553.056,05', area: '281,23', type: 'LAGO' },
        'E L18': { price: '647.952,23', area: '0,00', type: 'SECO' },
        'E L19': { price: '745.548,23', area: '356,90', type: 'LAGO' },
        'E L20': { price: '662.010,90', area: '316,91', type: 'LAGO' },
        'E L23': { price: '589.527,09', area: '296,09', type: 'LAGO' },
        'E L24': { price: '575.908,37', area: '289,25', type: 'LAGO' }
    },
    'Quadra F': {
        'F L7': { price: '641.733,69', area: '290,20', type: 'LAGO' },
        'F L8': { price: '649.760,89', area: '293,83', type: 'LAGO' },
        'F L10': { price: '688.216,26', area: '311,22', type: 'LAGO' },
        'F L20': { price: '513.272,51', area: '261,00', type: 'LAGO' }
    },
    'Quadra G': { 'G L9': { price: '616.248,42', area: '264,06', type: 'LAGO' } },
    'Quadra H': {
        'H L1': { price: '821.629,33', area: '0,00', type: 'SECO' },
        'H L2': { price: '800.115,15', area: '406,86', type: 'LAGO' },
        'H L3': { price: '770.892,05', area: '392,00', type: 'LAGO' },
        'H L5': { price: '723.217,30', area: '346,21', type: 'LAGO' },
        'H L10': { price: '575.042,25', area: '287,93', type: 'LAGO' }
    },
    'Quadra I': {
        'I L1': { price: '629.715,65', area: '301,45', type: 'LAGO' },
        'I L19': { price: '519.211,53', area: '264,02', type: 'LAGO' },
        'I L20': { price: '600.784,49', area: '305,50', type: 'LAGO' }
    },
    'Quadra J': { 'J L13': { price: '751.571,43', area: '339,87', type: 'LAGO' } },
    'Quadra K': {
        'K L26': { price: '480.371,94', area: '0,00', type: 'SECO' },
        'K L33': { price: '560.643,50', area: '253,53', type: 'LAGO' }
    },
    'Quadra L': {},
    'Quadra M': {},
    'Quadra N': {
        'N L3': { price: '604.472,45', area: '273,35', type: 'LAGO' },
        'N L9': { price: '487.846,25', area: '0,00', type: 'SECO' },
        'N L15': { price: '487.207,16', area: '0,00', type: 'SECO' },
        'N L18': { price: '528.375,70', area: '268,68', type: 'CANTO/LAGO' },
        'N L20': { price: '493.499,13', area: '267,60', type: 'CANTO/LAGO' }
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
