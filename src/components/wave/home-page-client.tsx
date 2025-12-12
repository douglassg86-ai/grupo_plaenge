
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { lots, blockTotals } from '@/lib/wave-data';
import LotGrid from '@/components/wave/lot-grid';
import LotInfoModal from '@/components/wave/lot-info-modal';
import CommunityPopup from '@/components/wave/community-popup';
import Header from '@/components/wave/header';
import Footer from '@/components/wave/footer';
import Materials from '@/components/wave/materials';
import FloatingWhatsAppButton from '@/components/wave/floating-whatsapp-button';
import type { Lot } from '@/lib/wave-data';

interface HomePageClientProps {
    isSharePage?: boolean;
}

export default function HomePageClient({ isSharePage = false }: HomePageClientProps) {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLotSelect = (lot: Lot) => {
    if (lot.status === 'available' || lot.status === 'opportunity') {
      setSelectedLot(lot);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="wave-theme bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] text-white flex items-center justify-center text-center">
          <div className="absolute inset-0">
            <Image
              src="/WAVE/header-background.jpg"
              alt="Vista do resort ao entardecer"
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="resort sunset"
            />
            <div className="absolute inset-0 bg-primary/60"></div>
          </div>
          <div className="relative z-10 p-4">
            <h1 className="font-display text-5xl md:text-7xl font-bold">
              Wave Home Resort
            </h1>
            <p className="text-lg font-display">Xangri-lá</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container py-10 md:py-16 -mt-16 md:-mt-24 relative z-10">
            <div className="bg-card p-4 md:p-8 rounded-lg shadow-2xl space-y-12">
              
                <p className="text-center font-semibold text-primary/90 text-lg md:text-xl animate-pulse-strong">
                    Contagem regressiva: Últimos lotes da construtora no mais novo condomínio de Xangri-lá. Pronto para construir!
                </p>

              {/* Media Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
                   <iframe
                      src="https://www.youtube.com/embed/uWSRtxyZ2i4"
                      title="Vídeo Wave Home Resort"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                </div>
                 <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
                    <iframe
                      src="https://maps.google.com/maps?q=Av.%20Jos%C3%A9%20Bruno%20Klein%20879,%20Xangri-l%C3%A1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mapa de Wave Home Resort"
                    ></iframe>
                  </div>
              </div>
              
               {/* Implantation Map */}
                <div className="text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                        Mapa de Implantação
                    </h2>
                      <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] rounded-lg overflow-hidden border">
                        <Image src="/WAVE/implantacao_2_01.jpg" alt="Mapa de implantação do resort" layout="fill" objectFit="contain" data-ai-hint="resort map" />
                    </div>
                </div>

              {/* Lots Section */}
              <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
                      Espelho de Vendas
                  </h2>
                  <LotGrid lots={lots} onLotSelect={handleLotSelect} blockTotals={blockTotals} />
              </div>

              {/* Materials Section */}
              <Materials />

            </div>
        </div>
      </main>
      {!isSharePage && <Footer />}
      {!isSharePage && <CommunityPopup />}
      {!isSharePage && <FloatingWhatsAppButton />}
      {selectedLot && (
        <LotInfoModal
          lot={selectedLot}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isSharePage={isSharePage}
        />
      )}
    </div>
  );
}
