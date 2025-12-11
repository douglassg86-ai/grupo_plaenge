'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/BfWHwPvvSl8K0FTD49zAfY?mode=ems_copy_t';
const POPUP_DISMISSED_KEY = 'hasJoinedCommunity';

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // We need to wait for the client to be mounted to check localStorage
    const isDismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (!isDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(POPUP_DISMISSED_KEY, 'true');
    setIsOpen(false);
  };

  const handleJoin = () => {
    window.open(WHATSAPP_LINK, '_blank');
    handleDismiss();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
                <DialogTitle className="font-display text-2xl text-primary">Bem-vindo, corretor!</DialogTitle>
                <DialogDescription>
                    Faça parte da nossa comunidade de corretores no WhatsApp e receba informações em primeira mão.
                </DialogDescription>
             </DialogHeader>
             <DialogFooter className="flex-col space-y-2 sm:flex-col sm:space-y-2">
                 <Button onClick={handleJoin} className="w-full">
                    <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="mr-2" data-ai-hint="whatsapp logo" />
                    Entrar na Comunidade
                </Button>
                <Button variant="outline" onClick={handleDismiss} className="w-full">Continue para o app</Button>
             </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
