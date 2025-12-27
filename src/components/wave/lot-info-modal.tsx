'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import type { Lot } from '@/lib/wave-data';
import { lots as allLots } from '@/lib/wave-data';

interface LotInfoModalProps {
  lot: Lot;
  isOpen: boolean;
  onClose: () => void;
  isSharePage?: boolean;
}

const EXECUTIVE_PHONE = '5551980800821';

export default function LotInfoModal({ lot, isOpen, onClose, isSharePage = false }: LotInfoModalProps) {

    if(lot.status === 'sold'){
        return null;
    }

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(lot.price);

    const whatsappMessage = encodeURIComponent(`Olá, Douglas! Tenho interesse no lote ${lot.block} L${lot.number} (${lot.area} m², ${formattedPrice}) no Wave Home Resort.`);
    const whatsappUrl = `https://wa.me/${EXECUTIVE_PHONE}?text=${whatsappMessage}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-primary">
            Lote {lot.number} - Quadra {lot.block}
          </DialogTitle>
          <DialogDescription className="text-base">
            {lot.type} com {lot.area}m²
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
            <div>
                 <p className="text-3xl font-bold text-center text-primary">{formattedPrice}</p>
                 <div className="mt-2 text-center">
                    <Badge variant="destructive" className="text-sm animate-pulse-strong bg-accent text-accent-foreground">ATÉ 80% FINANCIADO PELA CAIXA</Badge>
                 </div>
            </div>
        </div>

        <DialogFooter>
            <Button variant="secondary" onClick={onClose}>Fechar</Button>
            {!isSharePage && (
              <Button asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Faça uma simulação</a>
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
