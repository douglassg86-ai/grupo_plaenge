'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';

const SHARE_URL = 'https://b.link/cliente_wave';

export default function ShareButton() {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast({
        title: "Link Copiado!",
        description: "O link de compartilhamento foi copiado para sua área de transferência.",
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
      });
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" />
      Compartilhar
    </Button>
  );
}
