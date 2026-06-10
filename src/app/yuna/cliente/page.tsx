import YunaHomePageClient from '@/components/yuna/home-page-client';

export const metadata = {
  title: 'YUNA Jardim Botânico | Vanguard',
  description: 'Um jeito de viver interligado, pulsante e arraigado ao coração do Jardim Botânico.',
  robots: 'noindex',
};

export default function YunaClientePage() {
  return <YunaHomePageClient isClientePage />;
}
