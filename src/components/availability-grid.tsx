
'use client';

import { useState, useMemo } from 'react';
import type { Availability } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type AvailabilityGridProps = {
  availability: Availability[];
};

export function AvailabilityGrid({ availability: initialAvailability }: AvailabilityGridProps) {
  const [availability, setAvailability] = useState(initialAvailability);

  const handleToggleStatus = (unit: string) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.unit === unit
          ? {
              ...item,
              status: item.status === 'Disponível' ? 'Vendido' : 'Disponível',
            }
          : item
      )
    );
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
      <div className="flex justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-green-200 border border-green-400"></div>
            <span className="text-sm text-muted-foreground">Disponível</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-red-200 border border-red-400"></div>
            <span className="text-sm text-muted-foreground">Vendido</span>
        </div>
      </div>
        <div className="space-y-2">
          <TooltipProvider>
            {floors.map(([floor, units]) => (
              <div key={floor} className="grid grid-cols-[3rem_1fr] gap-2 items-center">
                <div className="flex items-center justify-center h-10 bg-muted rounded-md font-bold text-muted-foreground">
                  {floor}º
                </div>
                <div className={cn("grid gap-2 grid-cols-5 md:grid-cols-8 lg:grid-cols-15")}>
                  {units.map((unit) => (
                    <Tooltip key={unit.unit}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(unit.unit)}
                          className={cn(
                            'font-mono',
                            unit.status === 'Disponível'
                              ? 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300'
                              : 'bg-red-100 hover:bg-red-200 text-red-800 border-red-300'
                          )}
                        >
                          {unit.unit}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unidade: {unit.unit}</p>
                        <p>Área: {unit.area.toFixed(2)} m²</p>
                        <p>Tipo: {unit.type}</p>
                        <p>Status: {unit.status}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
