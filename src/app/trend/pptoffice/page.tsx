import type { Metadata } from 'next';
import TrendOfficePpt from '@/components/trend/ppt-office';

export const metadata: Metadata = {
  title: 'Trend Downtown Office — Apresentação | Plaenge',
  robots: 'noindex, nofollow',
};

export default function TrendPptOfficePage() {
  return <TrendOfficePpt />;
}
