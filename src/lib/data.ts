import type { Project } from '@/lib/types';

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
      address: 'Rua das Araucárias, 456, Moinhos, Metrópole',
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
    id: 5,
    name: 'WAVE HOME RESORT',
    brand: 'Vanguard',
    slug: 'wave-home-resort',
    description:
      'Sinta-se de férias todos os dias. O WAVE é um home resort completo, com uma área de lazer espetacular que inclui piscinas, spa e espaços de convivência, tudo com vista para o mar.',
    heroImageId: 'wave-hero',
    galleryImageIds: ['wave-gal-1', 'wave-gal-2', 'wave-gal-3'],
    floorPlanImageIds: ['wave-plan-1'],
    location: {
      address: 'Av. Beira Mar, 202, Praia Bela, Litoral',
      mapImageId: 'map-placeholder',
    },
    availability: [
      { unit: 'T1-303', type: '2 Quartos Vista Mar', area: 88, status: 'Disponível' },
      { unit: 'T1-304', type: '2 Quartos Vista Mar', area: 88, status: 'Vendido' },
      { unit: 'T2-501', type: '3 Quartos Vista Mar', area: 115, status: 'Disponível' },
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
];
