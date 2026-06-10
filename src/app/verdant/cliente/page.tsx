import VerdantHomePageClient from '@/components/verdant/home-page-client';

export const metadata = {
  title: 'VERDANT | Plaenge',
  description: 'Apartamentos e casas de alto padrão em Porto Alegre.',
  robots: 'noindex',
};

export default function VerdantClientePage() {
  return <VerdantHomePageClient isClientePage />;
}
