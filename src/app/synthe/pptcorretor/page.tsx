import type { Metadata } from 'next';
import SynthePptCorretor from '@/components/synthe/ppt-corretor';

export const metadata: Metadata = {
  title: "SYNTHÈ — Apresentação Corretores | Plaenge",
  robots: 'noindex, nofollow',
};

export default function SynthePptCorretorPage() {
  return <SynthePptCorretor />;
}
