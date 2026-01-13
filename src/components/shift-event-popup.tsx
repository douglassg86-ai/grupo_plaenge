
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ShiftEventPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-01-14T23:59:59');
    const now = new Date();

    if (now > targetDate) {
      return; 
    }
    // For development, you might want to uncomment the next line to always show it
    // setIsOpen(true);
    const hasSeenPopup = sessionStorage.getItem('hasSeenShiftPopup');
    if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenShiftPopup', 'true');
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
  };
  
  const handleConfirm = () => {
    const phoneNumber = '5551994013918';
    const message = encodeURIComponent('Olá, confirmo minha presença no evento do SHIFT!');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    handleDismiss();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDismiss}>
        <DialogContent className="p-0 border-0 max-w-lg overflow-hidden">
            <div className="relative aspect-[9/16] w-full">
                <Image 
                    src="/SHIFT/convite_14_01_2026 copiar.jpg" 
                    alt="Convite para evento SHIFT" 
                    fill
                    className="object-contain"
                    data-ai-hint="event invitation"
                />
            </div>
             <DialogFooter className="p-4 bg-background sm:justify-center gap-2 flex-col sm:flex-col sm:space-y-2">
                 <Button onClick={handleConfirm} size="lg" className="w-full">
                    Confirmar Presença
                </Button>
                <Button variant="outline" onClick={handleDismiss} size="lg" className="w-full">Fechar</Button>
             </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
