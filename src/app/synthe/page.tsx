import type { Metadata } from 'next';
import SyntheHomePageClient from '@/components/synthe/home-page-client';

export const metadata: Metadata = {
  title: "SYNTHÈ Mont'Serrat | Grupo Plaenge",
  description: "Pré-lançamento. 32 unidades de 172 m² a 298 m², 3 suítes, hall privativo. A síntese do equilíbrio. Plaenge · TGD · Rua Pedro Ivo, 550 · Mont'Serrat · Porto Alegre.",
};

export default function SynthePage() {
  return <SyntheHomePageClient />;
}
