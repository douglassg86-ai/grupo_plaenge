import DacoesHomePageClient from '@/components/dacoes/home-page-client';

export const metadata = {
  title: 'Dações | Grupo Plaenge',
  description: 'Apartamentos de alto padrão com disponibilidade imediata. Porto Alegre / RS.',
};

export default function DacoesClientePage() {
  return <DacoesHomePageClient isClientePage />;
}
