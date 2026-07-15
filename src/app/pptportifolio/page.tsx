import type { Metadata } from 'next';
import PptPortifolio from '@/components/ppt-portifolio';

export const metadata: Metadata = {
  title: 'Portfólio Porto Alegre | Vanguard + Plaenge',
  robots: 'noindex, nofollow',
};

export default function PptPortifolioPage() {
  return <PptPortifolio />;
}
