import type { Metadata } from 'next';
import YunaHomePageClient from '@/components/yuna/home-page-client';

export const metadata: Metadata = {
  title: 'YUNA Jardim Botânico | Grupo Plaenge',
  description: 'Apartamentos de 2 e 3 dormitórios na Rua Felizardo Furtado, 348 — Jardim Botânico, Porto Alegre. Um jeito de viver interligado, pulsante e arraigado ao coração do bairro.',
};

export default function YunaPage() {
  return <YunaHomePageClient />;
}
