import type { Metadata } from 'next';
import { Suspense } from 'react';
import PdfViewer from '@/components/shared/pdf-viewer';

export const metadata: Metadata = {
  title: 'Visualizar documento | Grupo Plaenge',
  robots: 'noindex',
};

export default function VisualizarPage() {
  return (
    <Suspense>
      <PdfViewer />
    </Suspense>
  );
}
