'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/BfWHwPvvSl8K0FTD49zAfY';
const POPUP_DISMISSED_KEY = 'wave-community-popup-dismissed';

export default function CommunityPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(POPUP_DISMISSED_KEY, 'true');
    setIsOpen(false);
  };

  const handleJoin = () => {
    handleDismiss();
    window.open(WHATSAPP_LINK, '_blank');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="bg-card p-4 rounded-lg shadow-2xl max-w-sm border border-border">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-primary">Comunidade Exclusiva</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Faça parte da nossa comunidade de corretores no WhatsApp e receba informações em primeira mão.
        </p>
        <Button onClick={handleJoin} className="w-full">
          <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="mr-2" data-ai-hint="whatsapp logo"/>
          Entrar na Comunidade
        </Button>
      </div>
    </div>
  );
}
