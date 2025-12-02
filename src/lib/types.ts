
export type Availability = {
  unit: string;
  type: string;
  area: number;
  status: 'Disponível' | 'Vendido' | 'Pasta Alocada' | 'Consulte Disponibilidade';
  paymentFlow?: {
    total: string;
    downPayment: string;
    monthlyInstallment: string;
    reinforcement: string;
    financingBalance: string;
  };
};

export type Project = {
  id: number;
  name: string;
  brand: 'Plaenge' | 'Vanguard';
  slug: string;
  description: string;
  heroImageId: string;
  galleryImageIds: string[];
  floorPlanImageIds: string[];
  bannerImageIds?: string[];
  location: {
    address: string;
    mapImageId: string;
  };
  videoUrl?: string;
  availability: Availability[];
};
