import AvulsosHomePageClient from '@/components/avulsos/home-page-client';

export const metadata = {
  title: 'Imóveis Avulsos | Grupo Plaenge',
  description: 'Apartamentos de alto padrão com disponibilidade imediata. Porto Alegre / RS.',
};

export default function AvulsosClientePage() {
  return <AvulsosHomePageClient isClientePage />;
}
