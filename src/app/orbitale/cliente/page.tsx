import OrbitaleHomePageClient from '@/components/orbitale/home-page-client';

export const metadata = {
  title: 'ORBITALE | Plaenge',
  description: 'Apartamentos de alto padrão em Petrópolis, Porto Alegre.',
  robots: 'noindex',
};

export default function OrbitaleClientePage() {
  return <OrbitaleHomePageClient isClientePage />;
}
