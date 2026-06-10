import TrendHomePageClient from '@/components/trend/home-page-client';

export const metadata = {
  title: 'TREND Downtown | Vanguard',
  description: 'Residencial, office, studios e mall — tudo integrado no coração de Porto Alegre.',
  robots: 'noindex',
};

export default function TrendClientePage() {
  return <TrendHomePageClient isClientePage />;
}
