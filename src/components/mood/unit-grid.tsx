'use client';

import { useState } from 'react';
import { useManager, trackClick } from '@/lib/use-manager';
import { units, type Unit } from '@/lib/mood-data';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statusLabel: Record<string, string> = { available: 'Disponível', sold: 'Vendido', negotiation: 'Reservado' };
const statusCell: Record<string, string> = {
  available: 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer text-white',
  sold: 'bg-stone-200 text-stone-400 cursor-default',
  negotiation: 'bg-amber-400 hover:bg-amber-500 cursor-pointer text-white',
};
const statusBadge: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  sold: 'bg-stone-100 text-stone-400 border-stone-200',
  negotiation: 'bg-amber-100 text-amber-800 border-amber-300',
};

function formatCurrency(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

// Group units by floor, sorted desc
function buildGrid() {
  const floors = [...new Set(units.map(u => u.floor))].sort((a, b) => b - a);
  const prumadas = [...new Set(units.map(u => u.prumada))].sort((a, b) => Number(a) - Number(b));
  return { floors, prumadas };
}

export default function UnitGrid() {
  const [selected, setSelected] = useState<Unit | null>(null);
  const manager = useManager();
  const { floors, prumadas } = buildGrid();

  // Only show prumadas that exist (some floors have fewer units)
  const getUnit = (floor: number, prumada: string) =>
    units.find(u => u.floor === floor && u.prumada === prumada);

  return (
    <div className="space-y-5">
      {/* Legend */}
      <div className="flex gap-4 text-xs flex-wrap">
        {Object.entries(statusLabel).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={cn('w-3 h-3 rounded-sm inline-block border', statusCell[key])} />
            {label}
          </div>
        ))}
      </div>

      {/* Summary */}
      <p className="text-xs text-muted-foreground">Total: {units.length} unidades</p>
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        {[
          { label: 'Disponíveis', count: units.filter(u => u.status === 'available').length, color: 'text-emerald-600' },
          { label: 'Reservadas', count: units.filter(u => u.status === 'negotiation').length, color: 'text-amber-600' },
          { label: 'Vendidas', count: units.filter(u => u.status === 'sold').length, color: 'text-stone-400' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-muted/50 rounded-lg p-3">
            <p className={`text-2xl font-display font-bold ${color}`}>{count}</p>
            <p className="text-muted-foreground text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Grid — scrollable horizontally */}
      <div className="overflow-x-auto">
        <table className="text-xs border-collapse w-full min-w-max">
          <thead>
            <tr>
              <th className="w-12 text-right pr-2 text-muted-foreground font-normal">Andar</th>
              {prumadas.map(p => (
                <th key={p} className="px-1 py-1 text-center text-muted-foreground font-normal w-16">Apt {p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {floors.map(floor => (
              <tr key={floor}>
                <td className="text-right pr-2 text-muted-foreground py-0.5">{floor}º</td>
                {prumadas.map(p => {
                  const unit = getUnit(floor, p);
                  if (!unit) return <td key={p} className="px-1 py-0.5" />;
                  return (
                    <td key={p} className="px-1 py-0.5">
                      <button
                        disabled={unit.status === 'sold'}
                        onClick={() => unit.status !== 'sold' && setSelected(unit)}
                        className={cn('w-full rounded px-1 py-1 font-medium border transition-colors text-xs', statusCell[unit.status])}
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
              <Badge className={cn('border', statusBadge[selected.status])}>{statusLabel[selected.status]}</Badge>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { label: 'Tipologia', value: selected.type },
                  { label: 'Área Privativa', value: `${selected.area.toFixed(2)} m²` },
                  { label: 'Andar', value: `${selected.floor}º` },
                  { label: 'Valor', value: formatCurrency(selected.price) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              {manager && (
                <Button className="w-full mt-2" onClick={() => {
                  trackClick(manager.slug, 'MOOD')
                  window.open(`https://wa.me/${manager.phone}?text=${encodeURIComponent(`Olá ${manager.name}! Tenho interesse no Apto ${selected.code} do MOOD Central Parque.`)}`, '_blank')
                }}>
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
