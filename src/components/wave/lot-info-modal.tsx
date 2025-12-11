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
import { recommendSimilarLots, LotRecommendation } from '@/ai/flows/recommend-lots-flow';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lot } from '@/lib/wave-data';
import { Loader2 } from 'lucide-react';

interface LotInfoModalProps {
  lot: Lot;
  isOpen: boolean;
  onClose: () => void;
  isSharePage?: boolean;
}

const EXECUTIVE_PHONE = '5551980800821';

export default function LotInfoModal({ lot, isOpen, onClose, isSharePage = false }: LotInfoModalProps) {
    const [recommendations, setRecommendations] = useState<LotRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && lot.status !== 'sold') {
            setIsLoading(true);
            setRecommendations([]);
            recommendSimilarLots({
                type: lot.type,
                area: lot.area,
                price: lot.price,
            }).then(response => {
                setRecommendations(response.output!.recommendations);
                setIsLoading(false);
            }).catch(err => {
                console.error("Error getting recommendations:", err);
                setIsLoading(false);
            })
        }
    }, [isOpen, lot]);

    if(lot.status === 'sold' || lot.status === 'negotiation'){
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

            <div>
                <h4 className="font-bold text-lg mb-2 text-primary">Lotes similares que podem te interessar:</h4>
                {isLoading ? (
                    <div className="flex items-center justify-center h-24">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {recommendations.map(rec => (
                        <Card key={rec.lotId} className="p-3 text-center text-sm">
                            <CardContent className="p-0 space-y-1">
                                <p className="font-bold text-base">Lote {rec.lotNumber}</p>
                                <p className="text-muted-foreground">Qd. {rec.block} ({rec.area}m²)</p>
                                <p className="text-xs text-muted-foreground">{rec.justification}</p>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
            </div>
        </div>

        <DialogFooter>
            <Button variant="secondary" onClick={onClose}>Fechar</Button>
            {!isSharePage && (
              <Button asChild>
                  <a href={whatsappUrl} target="_blank">Faça uma simulação</a>
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
