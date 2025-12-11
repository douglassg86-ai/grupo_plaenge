'use client';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Lot } from '@/lib/wave-data';

interface LotGridProps {
  lots: Lot[];
  blockTotals: Record<string, number>;
  onLotSelect: (lot: Lot) => void;
}

export default function LotGrid({ lots, blockTotals, onLotSelect }: LotGridProps) {
  const [openBlock, setOpenBlock] = useState<string | null>(null);

  const lotsByBlock: Record<string, Lot[]> = lots.reduce((acc, lot) => {
    if (!acc[lot.block]) {
      acc[lot.block] = [];
    }
    acc[lot.block].push(lot);
    return acc;
  }, {} as Record<string, Lot[]>);

  return (
    <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-2"
        value={openBlock ?? undefined}
        onValueChange={setOpenBlock}
    >
      {Object.entries(lotsByBlock).map(([block, blockLots]) => {
        const availableCount = blockLots.filter(l => l.status === 'available').length;
        const totalCount = blockTotals[block] || blockLots.length;
        return (
          <AccordionItem value={block} key={block} className="border border-border rounded-lg bg-background">
            <AccordionTrigger className="px-4 py-3 text-lg font-bold text-primary hover:no-underline">
              <div className="flex justify-between w-full items-center pr-2">
                <span>Quadra {block}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {availableCount} de {totalCount} disponíveis
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 border-t border-border">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {blockLots.map(lot => (
                  <Button
                    key={lot.id}
                    onClick={() => onLotSelect(lot)}
                    disabled={lot.status !== 'available'}
                    className={cn(
                      'h-12 text-xs font-bold',
                      lot.status === 'available' ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' : 'bg-red-100 text-red-800 cursor-not-allowed border border-red-300',
                    )}
                  >
                    {lot.number}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  );
}
