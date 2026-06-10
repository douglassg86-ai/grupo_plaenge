import MoodHomePageClient from '@/components/mood/home-page-client';

export const metadata = {
  title: 'MOOD Central Parque | Vanguard',
  description: 'O que te define também te move. Studios e apartamentos de 29 a 65 m² no Central Parque, Porto Alegre.',
  robots: 'noindex',
};

export default function MoodClientePage() {
  return <MoodHomePageClient isClientePage />;
}
