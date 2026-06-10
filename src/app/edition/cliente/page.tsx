import EditionHomePageClient from '@/components/edition/home-page-client';

export const metadata = {
  title: 'EDITION Moinhos | Plaenge',
  description: 'Uma edição limitada de elegância e exclusividade no bairro mais charmoso de Porto Alegre.',
  robots: 'noindex',
};

export default function EditionClientePage() {
  return <EditionHomePageClient isClientePage />;
}
