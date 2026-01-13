import type { Project } from '@/lib/types';
import { paymentData } from '@/lib/payment-data';

const fullUnitList = [
  { unit: '1501', area: 24.38 }, { unit: '1502', area: 23.66 }, { unit: '1503', area: 23.66 }, { unit: '1504', area: 24.38 }, { unit: '1505', area: 24.28 }, { unit: '1506', area: 23.75 }, { unit: '1507', area: 23.75 }, { unit: '1508', area: 23.75 }, { unit: '1509', area: 24.5 },
  { unit: '1401', area: 24.38 }, { unit: '1402', area: 23.66 }, { unit: '1403', area: 23.66 }, { unit: '1404', area: 24.38 }, { unit: '1405', area: 24.28 }, { unit: '1406', area: 23.75 }, { unit: '1407', area: 23.75 }, { unit: '1408', area: 108 }, { unit: '1409', area: 34.18 },
  { unit: '1301', area: 24.38 }, { unit: '1302', area: 23.66 }, { unit: '1303', area: 23.66 }, { unit: '1304', area: 24.38 }, { unit: '1305', area: 24.28 }, { unit: '1306', area: 23.75 }, { unit: '1307', area: 23.75 }, { unit: '1308', area: 23.75 }, { unit: '1309', area: 23.75 }, { unit: '1310', area: 91.63 },
  { unit: '1201', area: 24.38 }, { unit: '1202', area: 23.66 }, { unit: '1203', area: 23.66 }, { unit: '1204', area: 24.38 }, { unit: '1205', area: 24.28 }, { unit: '1206', area: 23.75 }, { unit: '1207', area: 23.75 }, { unit: '1208', area: 23.75 }, { unit: '1209', area: 74.7 }, { unit: '1210', area: 33.7 }, { unit: '1211', area: 24.28 },
  { unit: '1101', area: 24.38 }, { unit: '1102', area: 23.66 }, { unit: '1103', area: 23.66 }, { unit: '1104', area: 24.38 }, { unit: '1105', area: 24.28 }, { unit: '1106', area: 23.75 }, { unit: '1107', area: 23.75 }, { unit: '1108', area: 23.75 }, { unit: '1109', area: 23.75 }, { unit: '1110', area: 25.48 }, { unit: '1111', area: 30.13 }, { unit: '1112', area: 81.22 },
  { unit: '1001', area: 24.38 }, { unit: '1002', area: 23.66 }, { unit: '1003', area: 23.66 }, { unit: '1004', area: 24.38 }, { unit: '1005', area: 24.28 }, { unit: '1006', area: 23.75 }, { unit: '1007', area: 23.75 }, { unit: '1008', area: 23.75 }, { unit: '1009', area: 23.75 }, { unit: '1010', area: 76.37 }, { unit: '1011', area: 33.53 }, { unit: '1012', area: 23.75 }, { unit: '1013', area: 24.28 },
  { unit: '901', area: 24.38 }, { unit: '902', area: 23.66 }, { unit: '903', area: 23.66 }, { unit: '904', area: 24.38 }, { unit: '905', area: 24.28 }, { unit: '906', area: 23.75 }, { unit: '907', area: 23.75 }, { unit: '908', area: 23.75 }, { unit: '909', area: 23.75 }, { unit: '910', area: 25.48 }, { unit: '911', area: 25.48 }, { unit: '912', area: 25.78 }, { unit: '913', area: 24.28 }, { unit: '914', area: 23.75 }, { unit: '915', area: 24.28 },
  { unit: '801', area: 24.38 }, { unit: '802', area: 23.66 }, { unit: '803', area: 23.66 }, { unit: '804', area: 24.38 }, { unit: '805', area: 24.28 }, { unit: '806', area: 23.75 }, { unit: '807', area: 23.75 }, { unit: '808', area: 23.75 }, { unit: '809', area: 23.75 }, { unit: '810', area: 25.48 }, { unit: '811', area: 25.48 }, { unit: '812', area: 25.78 }, { unit: '813', area: 24.28 }, { unit: '814', area: 23.75 }, { unit: '815', area: 24.28 },
  { unit: '701', area: 24.38 }, { unit: '702', area: 23.66 }, { unit: '703', area: 23.66 }, { unit: '704', area: 24.38 }, { unit: '705', area: 24.28 }, { unit: '706', area: 23.75 }, { unit: '707', area: 23.75 }, { unit: '708', area: 23.75 }, { unit: '709', area: 23.75 }, { unit: '710', area: 25.48 }, { unit: '711', area: 25.48 }, { unit: '712', area: 25.78 }, { unit: '713', area: 24.28 }, { unit: '714', area: 23.75 }, { unit: '715', area: 24.28 },
  { unit: '601', area: 24.38 }, { unit: '602', area: 23.66 }, { unit: '603', area: 23.66 }, { unit: '604', area: 24.38 }, { unit: '605', area: 24.28 }, { unit: '606', area: 23.75 }, { unit: '607', area: 23.75 }, { unit: '608', area: 23.75 }, { unit: '609', area: 23.75 }, { unit: '610', area: 25.48 }, { unit: '611', area: 25.48 }, { unit: '612', area: 25.78 }, { unit: '613', area: 24.28 }, { unit: '614', area: 23.75 }, { unit: '615', area: 24.28 },
  { unit: '501', area: 24.38 }, { unit: '502', area: 23.66 }, { unit: '503', area: 23.66 }, { unit: '504', area: 24.38 }, { unit: '505', area: 24.28 }, { unit: '506', area: 23.75 }, { unit: '507', area: 23.75 }, { unit: '508', area: 23.75 }, { unit: '509', area: 23.75 }, { unit: '510', area: 25.48 }, { unit: '511', area: 25.48 }, { unit: '512', area: 25.78 }, { unit: '513', area: 24.28 }, { unit: '514', area: 23.75 }, { unit: '515', area: 24.28 },
  { unit: '401', area: 24.38 }, { unit: '402', area: 23.66 }, { unit: '403', area: 23.66 }, { unit: '404', area: 24.38 }, { unit: '405', area: 24.28 }, { unit: '406', area: 23.75 }, { unit: '407', area: 23.75 }, { unit: '408', area: 23.75 }, { unit: '409', area: 23.75 }, { unit: '410', area: 25.48 }, { unit: '411', area: 25.48 }, { unit: '412', area: 25.78 }, { unit: '413', area: 24.28 }, { unit: '414', area: 23.75 }, { unit: '415', area: 24.28 },
  { unit: '301', area: 24.38 }, { unit: '302', area: 23.66 }, { unit: '303', area: 23.66 }, { unit: '304', area: 24.38 }, { unit: '305', area: 24.28 }, { unit: '306', area: 23.75 }, { unit: '307', area: 23.75 }, { unit: '308', area: 23.75 }, { unit: '309', area: 23.75 }, { unit: '310', area: 25.48 }, { unit: '311', area: 25.48 }, { unit: '312', area: 25.78 }, { unit: '313', area: 24.28 }, { unit: '314', area: 23.75 }, { unit: '315', area: 24.28 },
  { unit: '201', area: 24.38 }, { unit: '202', area: 23.66 }, { unit: '203', area: 23.66 }, { unit: '204', area: 24.38 }, { unit: '205', area: 25.78 }, { unit: '206', area: 25.42 }, { unit: '207', area: 25.42 }, { unit: '208', area: 25.48 }, { unit: '209', area: 25.48 }, { unit: '210', area: 25.48 }, { unit: '211', area: 25.48 }, { unit: '212', area: 25.78 }, { unit: '213', area: 47.52 }, { unit: '214', area: 46.48 }, { unit: '215', area: 47.34 },
];

const soldUnits = ["1501", "1502", "1503", "1504", "1505", "1506", "1507", "1508", "1509", "1403", "1404", "1405", "1406", "1407", "1408", "1409", "1302", "1303", "1304", "1305", "1306", "1307", "1308", "1309", "1310", "1202", "1203", "1204", "1205", "1206", "1207", "1208", "1209", "1210", "1211", "1102", "1103", "1105", "1106", "1107", "1108", "1109", "1110", "1111", "1112", "1003", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1013", "902", "903", "905", "906", "907", "908", "909", "910", "911", "912", "913", "914", "915", "805", "806", "807", "808", "809", "810", "811", "812", "813", "814", "815", "705", "706", "707", "710", "711", "712", "713", "714", "715", "605", "610", "611", "612", "615", "505", "510", "511", "512", "412", "308", "213", "214", "215"];

const shiftAvailability = fullUnitList.map(u => ({
  ...u,
  type: u.area > 40 ? 'Apartamento' : 'Studio',
  status: soldUnits.includes(u.unit.padStart(3, '0')) ? 'Vendido' : 'Disponível',
  paymentFlow: paymentData[u.unit]
})) as any[];


export const projects: Project[] = [
  // Plaenge
  {
    id: 1,
    name: 'ORBITALE',
    brand: 'Plaenge',
    slug: 'orbitale',
    description:
      'Um marco arquitetônico que redefine o horizonte da cidade. ORBITALE combina design futurista com conforto e sofisticação, oferecendo uma experiência de vida única e vistas panorâmicas espetaculares.',
    heroImageId: 'orbitale-hero',
    galleryImageIds: ['orbitale-gal-1', 'orbitale-gal-2', 'orbitale-gal-3', 'orbitale-gal-4'],
    floorPlanImageIds: ['orbitale-plan-1', 'orbitale-plan-2'],
    location: {
      address: 'Av. do Futuro, 123, Centro, Metrópole',
      mapImageId: 'map-placeholder',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availability: [
      { unit: '101', type: '2 Quartos', area: 120, status: 'Vendido' },
      { unit: '102', type: '2 Quartos', area: 125, status: 'Disponível' },
      { unit: '201', type: '3 Quartos', area: 180, status: 'Disponível' },
      { unit: 'P-01', type: 'Penthouse', area: 350, status: 'Vendido' },
    ],
  },
  {
    id: 2,
    name: 'EDITION MOINHOS',
    brand: 'Plaenge',
    slug: 'edition-moinhos',
    description:
      'O charme do clássico encontra a funcionalidade do moderno. Localizado no coração do bairro Moinhos, o EDITION oferece exclusividade e elegância em cada detalhe, próximo a tudo que você precisa.',
    heroImageId: 'em-hero',
    galleryImageIds: [
      'em-gal-1',  'em-gal-2',  'em-gal-3',  'em-gal-4',  'em-gal-5',
      'em-gal-6',  'em-gal-7',  'em-gal-8',  'em-gal-9',  'em-gal-10',
      'em-gal-11', 'em-gal-12', 'em-gal-13', 'em-gal-14', 'em-gal-15',
      'em-gal-16', 'em-gal-17', 'em-gal-18', 'em-gal-19', 'em-gal-20',
      'em-gal-21', 'em-gal-22', 'em-gal-23', 'em-gal-24', 'em-gal-25',
      'em-gal-26', 'em-gal-27', 'em-gal-28', 'em-gal-29', 'em-gal-30',
      'em-gal-31'
    ],
    floorPlanImageIds: [
        'em-plan-32', 'em-plan-33', 'em-plan-34', 'em-plan-35', 'em-plan-36'
    ],
    location: {
      address: 'Jardim Cristogel 215',
      mapImageId: 'map-placeholder',
    },
    videoUrl: 'https://www.youtube.com/embed/pkhZo3FDBWE',
    availability: [
      { unit: 'A-3', type: '4 Suítes', area: 250, status: 'Disponível' },
      { unit: 'A-4', type: '4 Suítes', area: 250, status: 'Disponível' },
      { unit: 'B-1', type: 'Garden', area: 320, status: 'Vendido' },
    ],
  },
  {
    id: 3,
    name: 'VERDANT',
    brand: 'Plaenge',
    slug: 'verdant',
    description:
      'Um refúgio verde em meio à cidade. O VERDANT integra natureza e arquitetura de forma harmoniosa, com jardins verticais e espaços que promovem o bem-estar e a conexão com o meio ambiente.',
    heroImageId: 'verdant-hero',
    galleryImageIds: ['verdant-gal-1', 'verdant-gal-2', 'verdant-gal-3', 'verdant-gal-4'],
    floorPlanImageIds: ['verdant-plan-1', 'verdant-plan-2'],
    location: {
      address: 'Alameda das Flores, 789, Jardim Europa, Metrópole',
      mapImageId: 'map-placeholder',
    },
    availability: [
      { unit: 'G-10', type: 'Loft Duplex', area: 150, status: 'Disponível' },
      { unit: 'G-12', type: 'Loft Duplex', area: 150, status: 'Vendido' },
      { unit: 'V-22', type: '2 Quartos', area: 95, status: 'Disponível' },
    ],
  },
  // Vanguard
  {
    id: 4,
    name: 'MOOD CENTRAL PARQUE',
    brand: 'Vanguard',
    slug: 'mood-central-parque',
    description:
      'Vibrante, conectado e cheio de vida. O MOOD está localizado ao lado do Central Parque, ideal para quem busca um estilo de vida dinâmico, com espaços criativos e apartamentos inteligentes.',
    heroImageId: 'mood-hero',
    galleryImageIds: ['mood-gal-1', 'mood-gal-2', 'mood-gal-3', 'mood-gal-4'],
    floorPlanImageIds: ['mood-plan-1'],
    location: {
      address: 'Praça Central, 101, Parque Urbano, Metrópole',
      mapImageId: 'map-placeholder',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availability: [
      { unit: '505', type: 'Studio', area: 45, status: 'Disponível' },
      { unit: '506', type: 'Studio', area: 45, status: 'Vendido' },
      { unit: '810', type: '1 Quarto', area: 60, status: 'Disponível' },
    ],
  },
  {
    id: 6,
    name: 'YUNA JARDIM BOTÂNICO',
    brand: 'Vanguard',
    slug: 'yuna-jardim-botanico',
    description:
      'Equilíbrio e tranquilidade ao lado do Jardim Botânico. O YUNA foi pensado para quem valoriza a paz e a natureza, oferecendo um ambiente sereno e acolhedor para recarregar as energias.',
    heroImageId: 'yuna-hero',
    galleryImageIds: ['yuna-gal-1', 'yuna-gal-2', 'yuna-gal-3'],
    floorPlanImageIds: ['yuna-plan-1'],
    location: {
      address: 'Rua do Jardim, 303, Jardim Botânico, Metrópole',
      mapImageId: 'map-placeholder',
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availability: [
      { unit: 'L-01', type: '2 Quartos com Jardim', area: 110, status: 'Vendido' },
      { unit: 'L-02', type: '2 Quartos com Jardim', area: 112, status: 'Disponível' },
    ],
  },
  {
    id: 7,
    name: 'TREND DOWNTOWN',
    brand: 'Vanguard',
    slug: 'trend-downtown',
    description:
      'O pulso da cidade ao seu alcance. Com design arrojado e localização estratégica no centro, o TREND é perfeito para quem tem uma vida urbana agitada e não abre mão de praticidade e estilo.',
    heroImageId: 'trend-hero',
    galleryImageIds: ['trend-gal-1', 'trend-gal-2', 'trend-gal-3'],
    floorPlanImageIds: ['trend-plan-1'],
    location: {
      address: 'Rua 24 Horas, 404, Downtown, Metrópole',
      mapImageId: 'map-placeholder',
    },
    availability: [
      { unit: '1501', type: 'Studio+', area: 55, status: 'Disponível' },
      { unit: '1502', type: 'Studio+', area: 55, status: 'Disponível' },
      { unit: '2105', type: '1 Quarto', area: 70, status: 'Vendido' },
    ],
  },
  {
    id: 8,
    name: 'SHIFT',
    brand: 'Vanguard',
    slug: 'shift',
    description:
      'O endereço mais cobiçado de Porto Alegre. Localização absolutamente privilegiada na esquina da Rua Silva Jardim com a Rua 24 de Outubro. Morar no Shift é desfrutar da vibração urbana do Moinhos de Vento, um novo projeto VANGUARD | TGD. O entorno oferece referências gastronômicas como Roister e Leiteria, além do lazer no Parcão. O empreendimento conta com 1 Torre e 184 unidades.',
    heroImageId: 'shift-hero',
    galleryImageIds: [],
    floorPlanImageIds: ['shift-floor-plan-1','shift-floor-plan-2','shift-floor-plan-3','shift-floor-plan-4','shift-floor-plan-5','shift-floor-plan-6','shift-floor-plan-7'],
    bannerImageIds: ['shift-banner-1', 'shift-banner-2', 'shift-banner-3', 'shift-banner-4', 'shift-banner-5'],
    location: {
      address: 'Silva Jardim, 21 (esquina com Rua 24 de Outubro), Moinhos de Vento, Porto Alegre, RS',
      mapImageId: 'map-placeholder',
    },
    videoUrl: 'https://youtu.be/wSoKcCmErg8',
    availability: shiftAvailability,
  },
  {
    id: 5,
    name: 'WAVE HOME RESORT',
    brand: 'Vanguard',
    slug: 'wave',
    description: 'Seu refúgio particular em Xangri-lá.',
    heroImageId: 'wave-hero',
    galleryImageIds: [],
    floorPlanImageIds: [],
    location: {
      address: 'Av. José Bruno Klein, 879, Xangri-lá',
      mapImageId: 'map-placeholder',
    },
    videoUrl: 'https://www.youtube.com/embed/uWSRtxyZ2i4',
    availability: [], // A disponibilidade é gerenciada pela página Wave
  },
];

    