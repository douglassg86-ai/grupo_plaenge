
'use client';

import { useState, useMemo } from 'react';
import type { Availability } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { Download, Mail, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type AvailabilityGridProps = {
  availability: Availability[];
};

export function AvailabilityGrid({ availability: initialAvailability }: AvailabilityGridProps) {
  const [availability, setAvailability] = useState(initialAvailability);
  const [selectedUnit, setSelectedUnit] = useState<Availability | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUnitClick = (unit: Availability) => {
    setSelectedUnit(unit);
    setIsDialogOpen(true);
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

  const floors = useMemo(() => {
    const grouped: Record<number, Availability[]> = {};
    availability.forEach((item) => {
      const floorNumber = Math.floor(parseInt(item.unit) / 100);
      if (!grouped[floorNumber]) {
        grouped[floorNumber] = [];
      }
      grouped[floorNumber].push(item);
    });
    // Sort units within each floor by unit number
    Object.keys(grouped).forEach((floor) => {
      grouped[parseInt(floor)].sort((a, b) => parseInt(a.unit) - parseInt(b.unit));
    });
    return Object.entries(grouped).sort(([a], [b]) => parseInt(b) - parseInt(a));
  }, [availability]);
  
  const mailtoLink = useMemo(() => {
    if (!selectedUnit) return '';
    const to = "pastas_poa@vanguard.com.br,do.goncalves@vanguard.com.br";
    const subject = `Alocação de Pasta - Empreendimento SHIFT - Unidade ${selectedUnit.unit}`;
    const body = `Olá!\n\nGostaria de alocar a pasta do meu cliente na unidade ${selectedUnit.unit} (${selectedUnit.area.toFixed(2)} m²) do empreendimento SHIFT.\n\nSeguem os documentos em anexo.\n\nObrigado.`;
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [selectedUnit]);


  return (
    <Card>
      <CardContent className="p-4">
        <Accordion type="single" collapsible className="w-full">
            {floors.map(([floor, units]) => {
              const floorImage = getFloorImage(parseInt(floor));
              const hasAvailable = units.some(u => u.status === 'Disponível');
              const hasAllocated = units.some(u => u.status === 'Pasta Alocada');
              const hasSold = units.some(u => u.status === 'Vendido');

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
                        variant={unit.status === 'Disponível' ? 'outline' : 'default'}
                        size="sm"
                        onClick={() => handleUnitClick(unit)}
                        className={cn(
                          'font-mono h-10 w-full text-xs p-1',
                          {
                            'bg-green-100 border-green-300 text-green-800 hover:bg-green-200': unit.status === 'Disponível',
                            'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200': unit.status === 'Pasta Alocada',
                            'bg-red-100 border-red-300 text-red-800 hover:bg-red-200 cursor-not-allowed': unit.status === 'Vendido',
                          }
                        )}
                        disabled={unit.status === 'Vendido'}
                      >
                        {unit.unit}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      {hasAvailable && (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-300"></div>
                            <span>Disponível</span>
                        </div>
                      )}
                      {hasAllocated && (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-300"></div>
                            <span>Pasta Alocada</span>
                        </div>
                      )}
                      {hasSold && (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-red-100 border border-red-300"></div>
                            <span>Vendido</span>
                        </div>
                      )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )})}
        </Accordion>
        
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Envie sua pasta!</AlertDialogTitle>
              {selectedUnit && (
                <AlertDialogDescription asChild>
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-lg text-foreground">Unidade: {selectedUnit.unit}</div>
                      <div className="text-base text-foreground">Área: {selectedUnit.area.toFixed(2)} m²</div>
                       <div className={cn(
                        'text-sm font-semibold',
                        {
                          'text-green-600': selectedUnit.status === 'Disponível',
                          'text-amber-600': selectedUnit.status === 'Pasta Alocada',
                          'text-red-600': selectedUnit.status === 'Vendido',
                        }
                      )}>Status: {selectedUnit.status}</div>
                    </div>
                    <p className='text-sm'>Para alocar a pasta do seu cliente nesta unidade, clique no botão abaixo e anexe os documentos necessários. A assinatura acontecerá no dia 01/12/2025.</p>
                    
                    <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800 [&>svg]:text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Atenção!</AlertTitle>
                      <AlertDescription>
                        O espelho de vendas não é o reflexo da disponibilidade em tempo real. Muitas unidades já podem possuir pastas em análise. A prioridade será definida por ordem de envio. Não perca tempo!
                      </AlertDescription>
                    </Alert>

                    <div className='text-sm text-muted-foreground'>
                      <p className="font-bold text-foreground/90 mb-2">A pasta é composta por:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Ficha cadastro</li>
                          <li>CNH/IDENTIDADE</li>
                          <li>Comprovante de Residência</li>
                          <li>Certidão de casamento / estado civil</li>
                        </ul>
                    </div>
                  </div>
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              {selectedUnit && (
                <>
                  <Button asChild variant="outline">
                    <Link href="https://b.link/ficha_cadastro" target="_blank">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Ficha
                    </Link>
                  </Button>
                  <AlertDialogAction asChild>
                    <Link href={mailtoLink} target="_blank">
                      <Mail className="mr-2 h-4 w-4" />
                      Enviar documentação
                    </Link>
                  </AlertDialogAction>
                </>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardContent>
    </Card>
  );
}
