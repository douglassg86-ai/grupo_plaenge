
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
            {floors.map(([floor, units]) => (
              <AccordionItem value={`item-${floor}`} key={floor}>
                <AccordionTrigger className="font-bold text-lg hover:no-underline">
                  {floor}º Andar
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 pt-2">
                    {units.map((unit) => (
                      <Button
                        key={unit.unit}
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnitClick(unit)}
                        className={cn('font-mono h-10 w-full text-xs p-1')}
                      >
                        {unit.unit}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Envie sua pasta!</AlertDialogTitle>
              {selectedUnit && (
                <AlertDialogDescription asChild>
                  <div>
                    <div className="font-bold text-lg text-foreground">Unidade: {selectedUnit.unit}</div>
                    <div className="text-base mb-4 text-foreground">Área: {selectedUnit.area.toFixed(2)} m²</div>
                    <p className='mb-2'>Para alocar a pasta do seu cliente nesta unidade, clique no botão abaixo e anexe os documentos necessários. A assinatura acontecerá no dia 01/12/2025.</p>
                    <div className='text-sm text-muted-foreground'>
                      <p className="font-medium text-foreground/90 mb-1">A pasta é composta por:</p>
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
                <AlertDialogAction asChild>
                  <Link href={mailtoLink} target="_blank">
                    Enviar documentação
                  </Link>
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardContent>
    </Card>
  );
}
