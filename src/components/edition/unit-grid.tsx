'use client';

import { useState } from 'react';
import { units, towers, type Unit } from '@/lib/edition-data';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useManager, trackClick } from '@/lib/use-manager';
import { PaymentBreakdown, type PaymentStep } from '@/components/shared/payment-breakdown';

const PAYMENT_PLAN: PaymentStep[] = [
  { label: 'Entrada',       pct: 0.20, count: 4  },
  { label: 'Mensais',       pct: 0.15, count: 21 },
  { label: 'Reforços',      pct: 0.15, count: 3  },
  { label: 'Financiamento', pct: 0.50, count: 1  },
];

const statusLabel: Record<string, string> = {
  available: 'Disponível',
  sold: 'Vendido',
  negotiation: 'Reservado',
};

const statusColor: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  sold: 'bg-stone-100 text-stone-400 border-stone-200',
  negotiation: 'bg-amber-100 text-amber-800 border-amber-300',
};

const statusCell: Record<string, string> = {
  available: 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white',
  sold: 'bg-stone-200 text-stone-400 cursor-default',
  negotiation: 'bg-amber-400 hover:bg-amber-500 cursor-pointer text-white',
};

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export default function UnitGrid() {
  const [activeTower, setActiveTower] = useState(towers[0]);
  const [selected, setSelected] = useState<Unit | null>(null);
  const manager = useManager();

  const towerUnits = units.filter((u) => u.tower === activeTower);
  const floors = [...new Set(towerUnits.map((u) => u.floor))].sort((a, b) => b - a);
  const prumadas = [...new Set(towerUnits.map((u) => u.prumada))].sort();

  const getUnit = (floor: number, prumada: string) =>
    towerUnits.find((u) => u.floor === floor && u.prumada === prumada);

  return (
    <div className="space-y-6">
      {/* Tower tabs */}
      <div className="flex gap-2 flex-wrap">
        {towers.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTower(t)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
              activeTower === t
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-foreground border-border hover:bg-muted'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs flex-wrap">
        {Object.entries(statusLabel).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={cn('w-3 h-3 rounded-sm inline-block border', statusCell[key])} />
            {label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="text-sm border-collapse">
          <thead>
            <tr>
              <th className="w-16 text-right pr-3 text-muted-foreground font-normal text-xs">Andar</th>
              {prumadas.map((p) => (
                <th key={p} className="px-2 py-1 text-center text-muted-foreground font-normal text-xs w-28">
                  Apto {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {floors.map((floor) => (
              <tr key={floor}>
                <td className="text-right pr-3 text-muted-foreground text-xs py-0.5">{floor}º</td>
                {prumadas.map((p) => {
                  const unit = getUnit(floor, p);
                  if (!unit) return <td key={p} className="px-2 py-0.5" />;
                  return (
                    <td key={p} className="px-2 py-0.5">
                      <button
                        disabled={unit.status === 'sold'}
                        onClick={() => unit.status !== 'sold' && setSelected(unit)}
                        className={cn(
                          'w-full rounded px-2 py-1.5 text-xs font-medium border transition-colors',
                          statusCell[unit.status]
                        )}
                      >
                        {unit.code}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-primary">
                Apto {selected.code} — {selected.floor}º andar
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <Badge className={cn('border', statusColor[selected.status])}>
                {statusLabel[selected.status]}
              </Badge>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <p className="text-muted-foreground text-xs">Tipologia</p>
                  <p className="font-medium">{selected.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Área Privativa</p>
                  <p className="font-medium">{selected.area.toFixed(2)} m²</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Torre</p>
                  <p className="font-medium">{selected.tower}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Valor</p>
                  <p className="font-medium text-primary">{formatCurrency(selected.price)}</p>
                </div>
              </div>
              <PaymentBreakdown price={selected.price} plan={PAYMENT_PLAN} />
              {manager && (
                <Button
                  className="w-full mt-2"
                  onClick={() => {
                    trackClick(manager.slug, 'EDITION')
                    const msg = `Olá ${manager.name}! Tenho interesse no Apto ${selected.code} (${selected.floor}º andar) do EDITION Moinhos.`
                    window.open(`https://wa.me/${manager.phone}?text=${encodeURIComponent(msg)}`, '_blank')
                  }}
                >
                  Consultar via WhatsApp
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
