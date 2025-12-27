
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
    'Quadra A': {'A L11': { price: '498.455,90', area: '319,55', type: 'SECO' }, 'A L12': { price: '534.083,29', area: '342,39', type: 'SECO' }},
    'Quadra B': {'B L5': { price: '433.830,56', area: '278,12', type: 'SECO' }},
    'Quadra C': {'C L1': { price: '622.050,09', area: '341,32', type: 'CANTO/LAGO' }, 'C L2': { price: '510.659,90', area: '280,20', type: 'CANTO/LAGO' }, 'C L4': { price: '567.904,11', area: '311,61', type: 'LAGO' }, 'C L5': { price: '554.363,05', area: '304,18', type: 'LAGO' }, 'C L9': { price: '502.695,64', area: '275,83', type: 'LAGO' }},
    'Quadra D': {},
    'Quadra E': {'E L9': { price: '659.347,79', area: '323,63', type: 'LAGO' }, 'E L10': { price: '598.950,73', area: '294,33', type: 'LAGO' }, 'E L19': { price: '727.130,45', area: '356,90', type: 'LAGO' }, 'E L20': { price: '645.656,80', area: '316,91', type: 'LAGO' }},
    'Quadra F': {'F L7': { price: '625.880,51', area: '290,20', type: 'LAGO' }, 'F L8': { price: '633.709,41', area: '293,83', type: 'LAGO' }, 'F L10': { price: '671.214,79', area: '311,22', type: 'LAGO' }, 'F L11': { price: '678.396,67', area: '314,55', type: 'LAGO' }, 'F L12': { price: '679.367,20', area: '315,00', type: 'LAGO' }, 'F L20': { price: '500.592,79', area: '261,00', type: 'LAGO' }, 'F L21': { price: '670.416,81', area: '310,85', type: 'LAGO' }},
    'Quadra G': {'G L9': { price: '601.024,82', area: '264,06', type: 'LAGO' }},
    'Quadra H': {'H L2': { price: '780.349,37', area: '406,86', type: 'LAGO' }, 'H L3': { price: '751.848,18', area: '392,00', type: 'LAGO' }, 'H L4': { price: '731.518,64', area: '369,89', type: 'LAGO' }, 'H L5': { price: '705.351,17', area: '346,21', type: 'LAGO' }, 'H L6': { price: '702.885,98', area: '345,00', type: 'LAGO' }, 'H L10': { price: '560.836,59', area: '287,93', type: 'LAGO' }},
    'Quadra I': {'I L1': { price: '614.159,36', area: '301,45', type: 'LAGO' }, 'I L19': { price: '506.385,09', area: '264,02', type: 'LAGO' }, 'I L20': { price: '585.942,91', area: '305,50', type: 'LAGO' }},
    'Quadra J': {'J L1': { price: '471.784,73', area: '245,98', type: 'CANTO/LAGO' }, 'J L13': { price: '733.004,86', area: '339,87', type: 'LAGO' }},
    'Quadra K': {'K L33': { price: '546.793,54', area: '253,53', type: 'LAGO' }},
    'Quadra L': {},
    'Quadra M': {},
    'Quadra N': {'N L3': { price: '589.539,76', area: '273,35', type: 'LAGO' }, 'N L18': { price: '515.322,88', area: '268,68', type: 'CANTO/LAGO' }, 'N L19': { price: '486.649,76', area: '270,57', type: 'CANTO/LAGO' }, 'N L20': { price: '481.307,89', area: '267,60', type: 'CANTO/LAGO' }}
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

    