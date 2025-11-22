export type Availability = {
  unit: string;
  type: string;
  area: number;
  status: 'Disponível' | 'Vendido';
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
