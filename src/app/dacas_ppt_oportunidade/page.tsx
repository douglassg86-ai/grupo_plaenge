import type { Metadata } from 'next';
import PptOportunidade from '@/components/ppt-oportunidade';

export const metadata: Metadata = {
  title: 'Oportunidades — VERDANT · TREND NANO · SYNTHÈ | Plaenge',
  robots: 'noindex, nofollow',
};

export default function DacasPptOportunidadePage() {
  return <PptOportunidade />;
}
