
'use client';

import * as React from 'react';
import type { Availability as AvailabilityType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useManager, trackClick } from '@/lib/use-manager';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,

  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle as AlertTitleComponent } from './ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type AvailabilityGridProps = {
  availability: AvailabilityType[];
};

export function AvailabilityGrid({ availability }: AvailabilityGridProps) {
  const [selectedUnit, setSelectedUnit] = React.useState<AvailabilityType | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);
  const manager = useManager();

  const handleUnitClick = (unit: AvailabilityType) => {
    setSelectedUnit(unit);
    setIsInfoDialogOpen(true);
  };

  const getFloorImage = (floor: number) => {
    if (floor >= 2 && floor <= 9) return '/SHIFT/cpavimentos-01.png';
    if (floor === 10) return '/SHIFT/cpavimentos-02.png';
    if (floor === 11) return '/SHIFT/cpavimentos-03.png';
    if (floor === 12) return '/SHIFT/cpavimentos-04.png';
    if (floor === 13) return '/SHIFT/cpavimentos-05.png';
    if (floor === 14) return '/SHIFT/cpavimentos-06.png';
    if (floor === 15) return '/SHIFT/cpavimentos-07.png';
    return null;
  };

  const floors = React.useMemo(() => {
    const grouped: Record<number, AvailabilityType[]> = {};
    availability.forEach((item) => {
      const floorNumber = Math.floor(parseInt(item.unit) / 100);
      if (!grouped[floorNumber]) {
        grouped[floorNumber] = [];
      }
      grouped[floorNumber].push(item);
    });
    Object.keys(grouped).forEach((floor) => {
      grouped[parseInt(floor)].sort((a, b) => parseInt(a.unit) - parseInt(b.unit));
    });
    return Object.entries(grouped).sort(([a], [b]) => parseInt(b) - parseInt(a));
  }, [availability]);
  
  return (
    <Card>
      <CardContent className="p-4">
        <Accordion type="single" collapsible className="w-full">
            {floors.map(([floor, units]) => {
              const floorImage = getFloorImage(parseInt(floor));
              const hasAvailable = units.some(u => u.status === 'Disponível');
              const hasSold = units.some(u => u.status === 'Vendido');
              const hasNegotiation = units.some(u => u.status === 'Em negociação');

              return (
              <AccordionItem value={`item-${floor}`} key={floor}>
                <AccordionTrigger className="font-bold text-lg hover:no-underline">
                  {floor}º Andar
                </AccordionTrigger>
                <AccordionContent>
                  {floorImage && (
                      <div className="my-4">
                        <Image
                          src={floorImage}
                          alt={`Planta do ${floor}º andar`}
                          width={800}
                          height={400}
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                    )}
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 pt-2">
                    {units.map((unit) => (
                      <Button
                        key={unit.unit}
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnitClick(unit)}
                        className={cn(
                          'font-mono h-10 w-full text-xs p-1 relative group',
                           {
                            'bg-green-100 border-green-300 text-green-800 hover:bg-green-200': unit.status === 'Disponível',
                            'bg-red-100 border-red-300 text-red-800': unit.status === 'Vendido',
                            'bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200': unit.status === 'Em negociação',
                           },
                        )}
                      >
                        {unit.unit}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        {hasAvailable && (
                          <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-300"></div>
                              <span>Disponível</span>
                          </div>
                        )}
                        {hasNegotiation && (
                          <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-sm bg-yellow-100 border border-yellow-300"></div>
                              <span>Reserva / Em negociação</span>
                          </div>
                        )}
                        {hasSold && (
                          <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-sm bg-red-100 border border-red-300"></div>
                              <span>Vendido</span>
                          </div>
                        )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )})}
        </Accordion>
        
        <AlertDialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
          <AlertDialogContent className="max-w-md md:max-w-2xl">
            <AlertDialogHeader className="text-center">
              {selectedUnit && <AlertDialogTitle className="sr-only">Detalhes da Unidade {selectedUnit.unit}</AlertDialogTitle>}
                {selectedUnit && (
                  <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-base font-semibold text-foreground mb-2">
                    <span>Unidade {selectedUnit.unit}</span>
                    <span className='text-muted-foreground font-normal'>&bull;</span>
                    <span>{selectedUnit.area.toFixed(2)} m²</span>
                    <span className='text-muted-foreground font-normal'>&bull;</span>
                    <span className={cn('font-bold', {
                        'text-green-600': selectedUnit.status === 'Disponível',
                        'text-red-600': selectedUnit.status === 'Vendido',
                        'text-yellow-600': selectedUnit.status === 'Em negociação',
                    })}>{selectedUnit.status}</span>
                  </div>
                )}
              <AlertDialogDescription asChild>
                <div className="space-y-4 text-sm text-center">
                  {selectedUnit?.paymentFlow && selectedUnit.status !== 'Vendido' && (
                    <div className="space-y-2">
                      <h3 className="font-bold text-foreground">Fluxo de Pagamento (Entrega Abr/29)</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center h-auto p-1 text-[10px] md:text-xs">Total</TableHead>
                            <TableHead className="text-center h-auto p-1 text-[10px] md:text-xs">Entrada 12,5% (5x)</TableHead>
                            <TableHead className="text-center h-auto p-1 text-[10px] md:text-xs">Mensais 9% (30x)</TableHead>
                            <TableHead className="text-center h-auto p-1 text-[10px] md:text-xs">Reforços 13% (3x)</TableHead>
                            <TableHead className="text-center h-auto p-1 text-[10px] md:text-xs">Financiamento (65,5%)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-center p-1 text-[10px] md:text-xs">{selectedUnit.paymentFlow.total}</TableCell>
                            <TableCell className="text-center p-1 text-[10px] md:text-xs">{selectedUnit.paymentFlow.downPayment}</TableCell>
                            <TableCell className="text-center p-1 text-[10px] md:text-xs">{selectedUnit.paymentFlow.monthlyInstallment}</TableCell>
                            <TableCell className="text-center p-1 text-[10px] md:text-xs">{selectedUnit.paymentFlow.reinforcement}</TableCell>
                            <TableCell className="text-center p-1 text-[10px] md:text-xs">{selectedUnit.paymentFlow.financingBalance}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        *As parcelas de entrada não são concomitantes com as mensais. Reforços são anuais e concomitantes com as mensais.
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                     <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800 [&>svg]:text-amber-600 p-3 text-center">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitleComponent className="text-[11px] md:text-xs">Atenção!</AlertTitleComponent>
                      <AlertDescription className="text-[11px] md:text-xs">
                        O espelho de vendas não reflete a disponibilidade em tempo real. A prioridade é por ordem de envio. Não perca tempo!
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 flex flex-col gap-2">
              {selectedUnit && selectedUnit.status !== 'Vendido' && manager && (
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={() => {
                  trackClick(manager.slug, 'SHIFT')
                  const msg = `Olá ${manager.name}! Tenho interesse na unidade ${selectedUnit.unit} (${selectedUnit.area.toFixed(2)} m²) do SHIFT.`
                  window.open(`https://wa.me/${manager.phone}?text=${encodeURIComponent(msg)}`, '_blank')
                  setIsInfoDialogOpen(false)
                }}>
                  Consultar via WhatsApp
                </Button>
              )}
              <AlertDialogCancel className="w-full">Voltar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
