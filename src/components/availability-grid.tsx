
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
import { Download, Mail } from 'lucide-react';
import Image from 'next/image';

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
    if (floor >= 2 && floor <= 9) return '/SHIFT/pavirimentos-01.png';
    if (floor === 10) return '/SHIFT/pavirimentos-02.png';
    if (floor === 11) return '/SHIFT/pavirimentos-03.png';
    if (floor === 12) return '/SHIFT/pavirimentos-04.png';
    if (floor === 13) return '/SHIFT/pavirimentos-05.png';
    if (floor === 14) return '/SHIFT/pavirimentos-06.png';
    if (floor === 15) return '/SHIFT/pavirimentos-07.png';
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
                        className={cn('font-mono h-10 w-full text-xs p-1')}
                      >
                        {unit.unit}
                      </Button>
                    ))}
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
                  <div>
                    <div className="font-bold text-lg text-foreground">Unidade: {selectedUnit.unit}</div>
                    <div className="text-base mb-4 text-foreground">Área: {selectedUnit.area.toFixed(2)} m²</div>
                    <p className='mb-2'>Para alocar a pasta do seu cliente nesta unidade, clique no botão abaixo e anexe os documentos necessários. A assinatura acontecerá no dia 01/12/2025.</p>
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
                    <Link href="/SHIFT/ficha_cadastro.pdf" target="_blank" download>
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
