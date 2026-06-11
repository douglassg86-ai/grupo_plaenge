import HomePageClient from '@/components/wave/home-page-client';

export const metadata = {
  title: 'Wave Home Resort | Vanguard',
  description: 'Condomínio de lotes com conceito resort em Porto Alegre.',
  robots: 'noindex',
};

export default function WaveClientePage() {
  return <HomePageClient isSharePage />;
}
