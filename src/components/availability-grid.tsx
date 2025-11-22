
'use client';

import { useState, useMemo } from 'react';
import type { Availability } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
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
  
  const maxUnitsPerFloor = useMemo(() => {
    return Math.max(...floors.map(([, units]) => units.length), 0);
  }, [floors]);


  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
            {floors.map(([floor, units]) => (
              <div key={floor} className="grid grid-cols-[3rem_1fr] gap-2 items-center">
                <div className="flex items-center justify-center h-10 bg-muted rounded-md font-bold text-muted-foreground">
                  {floor}º
                </div>
                <div className={cn("grid gap-2 grid-cols-5 md:grid-cols-8 lg:grid-cols-15")}>
                  {units.map((unit) => (
                    <Button
                      key={unit.unit}
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnitClick(unit)}
                      className={cn('font-mono')}
                    >
                      {unit.unit}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Envie sua pasta!</AlertDialogTitle>
              {selectedUnit && (
                <AlertDialogDescription>
                    <p className="font-bold text-lg">Unidade: {selectedUnit.unit}</p>
                    <p className="text-base mb-4">Área: {selectedUnit.area.toFixed(2)} m²</p>
                    <p className='mb-2'>Escolha duas unidades para que o seu cliente não perca esta oportunidade. Algumas unidades já possuem fila de pastas. A assinatura acontecerá no dia 01/12/2025.</p>
                    <p className='text-sm text-muted-foreground'>A pasta é composta por: ficha de cadastro e CNH ou RG.</p>
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link href="https://wa.me/5551980800821" target="_blank">
                  Enviar documentação
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardContent>
    </Card>
  );
}
