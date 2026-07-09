import type { Metadata } from 'next';
import ShiftPptCorretor from '@/components/shift/ppt-corretor';

export const metadata: Metadata = {
  title: 'SHIFT — Apresentação | Vanguard',
  robots: 'noindex, nofollow',
};

export default function ShiftPptCorretorPage() {
  return <ShiftPptCorretor />;
}
