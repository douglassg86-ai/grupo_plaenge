'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Lot } from '@/lib/wave-data';
import { Flame } from 'lucide-react';

interface LotGridProps {
  lots: Lot[];
  blockTotals: Record<string, number>;
  onLotSelect: (lot: Lot) => void;
}

export default function LotGrid({ lots, blockTotals, onLotSelect }: LotGridProps) {
  const lotsByBlock: Record<string, Lot[]> = {};
  
  const blockOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
  
  // Initialize all blocks in the correct order
  for(const blockName of blockOrder) {
    lotsByBlock[blockName] = [];
  }
  
  let idCounter = 1000;
  for (const block of blockOrder) {
      const total = blockTotals[block] || 0;
      for (let i = 1; i <= total; i++) {
          const existingLot = lots.find(l => l.block === block && l.number === i.toString());
          if (existingLot) {
              lotsByBlock[block].push(existingLot);
          } else {
              lotsByBlock[block].push({
                  id: idCounter++,
                  block: block,
                  number: i.toString(),
                  status: 'sold',
                  price: 0,
                  area: 0,
                  type: 'SECO',
              });
          }
      }
      lotsByBlock[block].sort((a,b) => parseInt(a.number) - parseInt(b.number));
  }


  return (
    <div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4 justify-center">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-orange-100 border border-orange-300"></div>
                <span>Oportunidade</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-300"></div>
                <span>Disponível</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-yellow-100 border border-yellow-300"></div>
                <span>Em negociação</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-100 border border-red-300"></div>
                <span>Vendido</span>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(lotsByBlock).map(([block, blockLots]) => {
            if (blockLots.length === 0) return null;
            return (
            <Card key={block} className="border-border rounded-lg bg-card overflow-hidden">
                <h3 className="px-4 py-2 text-lg font-bold text-primary bg-muted border-b">
                    Quadra {block}
                </h3>
                <div className="p-4">
                    <div className="grid grid-cols-5 gap-2">
                        {blockLots.map(lot => (
                        <Button
                            key={lot.id}
                            onClick={() => onLotSelect(lot)}
                            disabled={lot.status === 'sold' || lot.status === 'negotiation'}
                            className={cn(
                            'h-10 text-xs font-bold relative p-0',
                            {
                                'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300': lot.status === 'available',
                                'bg-red-100 text-red-800 cursor-not-allowed border border-red-300': lot.status === 'sold',
                                'bg-yellow-100 text-yellow-800 cursor-not-allowed border border-yellow-300': lot.status === 'negotiation',
                                'bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-300': lot.status === 'opportunity'
                            }
                            )}
                        >
                            {lot.number}
                            {lot.status === 'opportunity' && <Flame className="absolute top-0.5 right-0.5 h-3 w-3 text-orange-500" />}
                        </Button>
                        ))}
                    </div>
                </div>
            </Card>
            )
        })}
        </div>
    </div>
  );
}
