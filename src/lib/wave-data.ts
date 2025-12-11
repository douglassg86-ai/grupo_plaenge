export interface Lot {
    id: number;
    block: string;
    number: string;
    type: string;
    area: number;
    price: number;
    status: 'available' | 'sold' | 'negotiation' | 'opportunity';
  }

const lotData = {
    'Quadra A': {'QA L11': { price: '498.455,90', area: '319,55', type: 'SECO' }, 'QA L12': { price: '534.083,29', area: '342.39', type: 'SECO' }},
    'Quadra B': {'QB L5': { price: '433.830,56', area: '278,12', type: 'SECO' }},
    'Quadra C': {'QC L1': { price: '622.050,09', area: '341,32', type: 'CANTO/LAGO' }, 'QC L2': { price: '510.659,90', area: '280.20', type: 'CANTO/LAGO' }, 'QC L4': { price: '567.904,11', area: '311,61', type: 'LAGO' }, 'QC L5': { price: '554.363,05', area: '304,18', type: 'LAGO' }, 'QC L9': { price: '502.695,64', area: '275,83', type: 'LAGO' }},
    'Quadra E': {'QE L9': { price: '659.347,79', area: '323,63', type: 'LAGO' }, 'QE L10': { price: '598.950,73', area: '294,33', type: 'LAGO' }, 'QE L19': { price: '727.130,45', area: '356,9', type: 'LAGO' }, 'QE L20': { price: '645.656,80', area: '316,91', type: 'LAGO' }},
    'Quadra F': {'QF L7': { price: '625.880,51', area: '290,2', type: 'LAGO' }, 'QF L8': { price: '633.709,41', area: '293,83', type: 'LAGO' }, 'QF L10': { price: '671.214,79', area: '311.11', type: 'LAGO' }, 'QF L11': { price: '678.396,67', area: '314,55', type: 'LAGO' }, 'QF L12': { price: '679.367,20', area: '315.00', type: 'LAGO' }, 'QF L20': { price: '500.592,79', area: '232.11', type: 'LAGO' }, 'QF L21': { price: '670.416,81', area: '310,85', type: 'LAGO' }},
    'Quadra G': {'QG L9': { price: '601.024,82', area: '264,06', type: 'LAGO' }},
    'Quadra H': {'QH L2': { price: '780.349,37', area: '406,86', type: 'LAGO' }, 'QH L3': { price: '751.848,18', area: '392', type: 'LAGO' }, 'QH L4': { price: '731.518,64', area: '369,89', type: 'LAGO' }, 'QH L5': { price: '705.351,17', area: '346.21', type: 'LAGO' }, 'QH L6': { price: '702.885,98', area: '345.00', type: 'LAGO' }, 'QH L10': { price: '560.836,59', area: '287,93', type: 'LAGO' }},
    'Quadra I': {'QI L1': { price: '614.159,36', area: '301,45', type: 'LAGO' }, 'QI L19': { price: '506.385,09', area: '264,02', type: 'LAGO' }, 'QI L20': { price: '585.942,91', area: '305,5', type: 'LAGO' }},
    'Quadra J': {'QJ L1': { price: '471.784,73', area: '245,98', type: 'CANTO/LAGO' }, 'QJ L13': { price: '733.004,86', area: '339,87', type: 'LAGO' }},
    'Quadra K': {'QK L33': { price: '546.793,54', area: '253.53', type: 'LAGO' }},
    'Quadra N': {'QN L3': { price: '589.539,76', area: '273,35', type: 'LAGO' }, 'QN L18': { price: '515.322,88', area: '268,68', type: 'CANTO/LAGO' }, 'QN L19': { price: '486.649,76', area: '270.57', type: 'CANTO/LAGO' }, 'QN L20': { price: '481.307,89', area: '267,6', type: 'CANTO/LAGO' }}
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

        if (availableData) {
            return {
                id: idCounter++,
                block: shortBlock,
                number: `${lotNum}`,
                price: parseCurrency(availableData.price),
                area: parseCurrency(availableData.area),
                type: availableData.type,
                status: 'available' as const
            };
        } else {
            return {
                id: idCounter++,
                block: shortBlock,
                number: `${lotNum}`,
                price: 0,
                area: 0,
                type: 'SECO',
                status: 'sold' as const
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
