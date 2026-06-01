import type { Metadata } from 'next';
import TrendHomePageClient from '@/components/trend/home-page-client';

export const metadata: Metadata = {
  title: 'Trend Downtown | Grupo Plaenge',
  description: 'Complexo multiuso em Porto Alegre: Downtown Home (apartamentos 3 dorm.), Downtown Nano (studios), Downtown Office e Mall. Maiojama · Vanguard · Fundo Phorbis.',
};

export default function TrendPage() {
  return <TrendHomePageClient />;
}
