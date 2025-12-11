

export type AvailabilityStatus = 'Disponível' | 'Vendido' | 'Pasta Alocada' | 'Consulte Disponibilidade' | 'Em negociação' | 'Oportunidade';

export type Availability = {
  unit: string;
  type: string;
  area: number;
  status: AvailabilityStatus;
  paymentFlow?: {
    total: string;
    downPayment: string;
    monthlyInstallment: string;
    reinforcement: string;
    financingBalance: string;
  };
};

export type ProjectHighlight = {
  icon: string;
  title: string;
  description: string;
};

export type Project = {
  id: number;
  name: string;
  brand: 'Plaenge' | 'Vanguard';
  slug: string;
  description: string;
  longDescription?: string;
  heroImageId: string;
  galleryImageIds: string[];
  floorPlanImageIds: string[];
  bannerImageIds?: string[];
  aboutImageId?: string;
  highlights?: ProjectHighlight[];
  location: {
    address: string;
    mapImageId: string;
  };
  videoUrl?: string;
  availability: Availability[];
  theme?: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    accent: string;
  };
  contactButtonText?: string;
  contactButtonLink?: string;
};
