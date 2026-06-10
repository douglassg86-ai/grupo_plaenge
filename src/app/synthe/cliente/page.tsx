import SyntheHomePageClient from '@/components/synthe/home-page-client';

export const metadata = {
  title: 'SYNTHÈ | Plaenge',
  description: 'A síntese do equilíbrio. Pré-lançamento em Petrópolis, Porto Alegre.',
  robots: 'noindex',
};

export default function SyntheClientePage() {
  return <SyntheHomePageClient isClientePage />;
}
