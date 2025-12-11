'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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
  
  // Initialize all blocks
  for(const blockName of Object.keys(blockTotals)) {
    lotsByBlock[blockName] = [];
  }
  
  // Create a map for quick lookup
  const lotMap = new Map(lots.map(lot => lot.id, lot));
  
  // Create the full grid
  let idCounter = 1;
  for (const [block, total] of Object.entries(blockTotals)) {
      for (let i = 1; i <= total; i++) {
          const lotId = `${block} L${i}`;
          const existingLot = lots.find(l => l.block === block && l.number === i.toString());
          if (existingLot) {
              lotsByBlock[block].push(existingLot);
          } else {
              lotsByBlock[block].push({
                  id: idCounter++, // temp id
                  block: block,
                  number: i.toString(),
                  status: 'sold',
                  price: 0,
                  area: 0,
                  type: 'SECO',
              });
          }
      }
      // Sort lots numerically
      lotsByBlock[block].sort((a,b) => parseInt(a.number) - parseInt(b.number));
  }


  return (
    <div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4 justify-center">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-orange-400 border border-orange-500"></div>
                <span>Oportunidade</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-green-400 border border-green-500"></div>
                <span>Disponível</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-yellow-400 border border-yellow-500"></div>
                <span>Em negociação</span>
            </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-400 border border-red-500"></div>
                <span>Vendido</span>
            </div>
        </div>

        <Accordion 
            type="single" 
            collapsible 
            className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
        {Object.entries(lotsByBlock).map(([block, blockLots]) => {
            const availableCount = blockLots.filter(l => l.status === 'available' || l.status === 'opportunity').length;
            const totalCount = blockTotals[block] || blockLots.length;
            return (
            <AccordionItem value={block} key={block} className="border border-border rounded-lg bg-background">
                <AccordionTrigger className="px-4 py-3 text-lg font-bold text-primary hover:no-underline">
                <div className="flex justify-between w-full items-center pr-2">
                    <span>Quadra {block}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                        {availableCount}/{totalCount}
                    </span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 border-t border-border">
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {blockLots.map(lot => (
                    <Button
                        key={lot.id}
                        onClick={() => onLotSelect(lot)}
                        disabled={lot.status === 'sold' || lot.status === 'negotiation'}
                        className={cn(
                        'h-12 text-xs font-bold relative',
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
                </AccordionContent>
            </AccordionItem>
            )
        })}
        </Accordion>
    </div>
  );
}
