'use client';
import { useState } from 'react';
import Image from 'next/image';
import { lots, blockTotals } from '@/lib/wave-data';
import LotGrid from '@/components/wave/lot-grid';
import LotInfoModal from '@/components/wave/lot-info-modal';
import CommunityPopup from '@/components/wave/community-popup';
import ExecutiveContact from '@/components/wave/executive-contact';
import Header from '@/components/wave/header';
import Footer from '@/components/wave/footer';
import type { Lot } from '@/lib/wave-data';

export default function HomePageClient() {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLotSelect = (lot: Lot) => {
    setSelectedLot(lot);
    setIsModalOpen(true);
  };

  return (
    <div className="wave-theme bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] text-white flex items-center justify-center text-center">
          <div className="absolute inset-0">
            <Image
              src="/header-background.jpg"
              alt="Vista aérea da praia"
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="resort beach"
            />
            <div className="absolute inset-0 bg-primary/70"></div>
          </div>
          <div className="relative z-10 p-4">
            <h1 className="font-display text-5xl md:text-7xl font-bold">
              Wave Home Resort
            </h1>
            <p className="mt-2 text-lg md:text-xl">
              O seu refúgio particular à beira-mar.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container py-10 md:py-20 -mt-20 relative z-10">
            <div className="bg-card p-6 md:p-10 rounded-lg shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        {/* Implantation Map */}
                        <div className="mb-8">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                                Mapa de Implantação
                            </h2>
                             <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
                                <Image src="/implantacao_2_01.jpg" alt="Mapa de implantação do resort" layout="fill" objectFit="contain" data-ai-hint="resort map" />
                            </div>
                        </div>
                        
                        {/* Lots Section */}
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                                Lotes Disponíveis
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Clique em uma quadra para ver os lotes disponíveis.
                            </p>
                            <LotGrid lots={lots} onLotSelect={handleLotSelect} blockTotals={blockTotals} />
                        </div>
                    </div>
                    
                    {/* Sidebar Info */}
                    <aside>
                        <div className="sticky top-20">
                            <div className="bg-muted p-6 rounded-lg mb-6">
                                <h3 className="font-bold text-lg text-primary mb-2">O Projeto</h3>
                                <p className="text-sm text-muted-foreground">
                                    O Wave Home Resort é um condomínio fechado de lotes, com infraestrutura completa de lazer e segurança, localizado na beira-mar da praia de Xangri-lá. Um convite para viver o verão o ano todo.
                                </p>
                            </div>
                            <ExecutiveContact />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
      </main>
      <Footer />
      <CommunityPopup />
      {selectedLot && (
        <LotInfoModal
          lot={selectedLot}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
