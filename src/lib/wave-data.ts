
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
    'Quadra A': {'A L11': { price: '509.654,45', area: '319,55', type: 'SECO' }},
    'Quadra B': {'B L5': { price: '443.577,21', area: '278,12', type: 'SECO' }},
    'Quadra C': {
        'C L2': { price: '522.132,64', area: '280,20', type: 'CANTO/LAGO' },
        'C L5': { price: '566.817,65', area: '304,18', type: 'LAGO' },
        'C L9': { price: '513.989,45', area: '275,83', type: 'LAGO' }
    },
    'Quadra D': {},
    'Quadra E': {
        'E L9':  { price: '674.161,03', area: '323,63', type: 'LAGO' },
        'E L10': { price: '612.407,06', area: '294,33', type: 'LAGO' },
        'E L15': { price: '551.511,81', area: '281,23', type: 'LAGO' },
        'E L19': { price: '743.466,52', area: '356,90', type: 'LAGO' },
        'E L20': { price: '660.162,44', area: '316,91', type: 'LAGO' },
        'E L23': { price: '587.881,02', area: '296,09', type: 'LAGO' },
        'E L24': { price: '574.300,33', area: '289,25', type: 'LAGO' }
    },
    'Quadra F': {
        'F L7':  { price: '639.941,85', area: '290,20', type: 'LAGO' },
        'F L8':  { price: '647.946,64', area: '293,83', type: 'LAGO' },
        'F L10': { price: '686.294,64', area: '311,22', type: 'LAGO' },
        'F L20': { price: '511.839,36', area: '261,00', type: 'LAGO' }
    },
    'Quadra G': {'G L9': { price: '614.527,74', area: '264,06', type: 'LAGO' }},
    'Quadra H': {
        'H L3':  { price: '768.739,58', area: '392,00', type: 'LAGO' },
        'H L5':  { price: '721.197,94', area: '346,21', type: 'LAGO' },
        'H L10': { price: '573.436,63', area: '287,93', type: 'LAGO' }
    },
    'Quadra I': {
        'I L1':  { price: '627.957,37', area: '301,45', type: 'LAGO' },
        'I L19': { price: '517.761,79', area: '264,02', type: 'LAGO' },
        'I L20': { price: '599.106,99', area: '305,50', type: 'LAGO' }
    },
    'Quadra J': {'J L13': { price: '749.472,91', area: '339,87', type: 'LAGO' }},
    'Quadra K': {'K L33': { price: '559.078,08', area: '253,53', type: 'LAGO' }},
    'Quadra L': {},
    'Quadra M': {},
    'Quadra N': {
        'N L3':  { price: '602.784,65', area: '273,35', type: 'LAGO' },
        'N L19': { price: '486.649,76', area: '270,57', type: 'CANTO/LAGO' }
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
