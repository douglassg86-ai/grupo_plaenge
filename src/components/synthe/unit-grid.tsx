'use client';

import { useState } from 'react';
import { useManager, trackClick } from '@/lib/use-manager';
import { units, type Unit } from '@/lib/synthe-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function UnitGrid() {
  const [selected, setSelected] = useState<Unit | null>(null);
  const manager = useManager();
  const floors = [...new Set(units.map(u => u.floor))].sort((a, b) => b - a);
  const prumadas = [...new Set(units.map(u => u.prumada))].sort((a, b) => Number(a) - Number(b));
  const getUnit = (floor: number, prumada: string) => units.find(u => u.floor === floor && u.prumada === prumada);

  return (
    <div className="space-y-5">
      {/* Badge pré-lançamento */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-3 h-3 rounded-sm inline-block bg-stone-300 border border-stone-400" />
          <span className="text-muted-foreground">Pré-lançamento — todas as unidades disponíveis para cadastro</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 text-center text-sm max-w-xs">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-2xl font-display font-bold text-stone-600">32</p>
          <p className="text-muted-foreground text-xs">Total de unidades</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-2xl font-display font-bold text-stone-600">16</p>
          <p className="text-muted-foreground text-xs">Pavimentos</p>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="text-xs border-collapse w-full min-w-max">
          <thead>
            <tr>
              <th className="w-14 text-right pr-2 text-muted-foreground font-normal">Andar</th>
              {prumadas.map(p => (
                <th key={p} className="px-1 py-1 text-center text-muted-foreground font-normal w-24">Apt {p}</th>
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
                        onClick={() => setSelected(unit)}
                        className="w-full rounded px-1 py-1.5 font-medium border transition-colors text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 border-stone-300 cursor-pointer"
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

      <p className="text-xs text-muted-foreground italic">
        Unidades em destaque (18º andar): Penthouse com Rooftop Privativo.
      </p>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-primary">
                Apto {selected.code} — {selected.floor}º andar
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div className="bg-stone-50 rounded-lg px-4 py-3 text-center border border-stone-200">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Pré-lançamento</p>
                <p className="font-semibold text-foreground">Cadastre seu interesse</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Tipologia', value: selected.type },
                  { label: 'Área Privativa', value: `${selected.area.toFixed(2)} m²` },
                  { label: 'Andar', value: `${selected.floor}º` },
                  { label: 'Suítes', value: '3 suítes' },
                  { label: 'Vagas', value: selected.floor <= 6 ? '2 vagas' : '3 vagas' },
                  { label: 'Hall', value: 'Privativo por andar' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="font-medium text-foreground text-xs leading-snug">{value}</p>
                  </div>
                ))}
              </div>
              {manager && (
                <Button className="w-full" onClick={() => {
                  trackClick(manager.slug, 'SYNTHÈ')
                  window.open(`https://wa.me/${manager.phone}?text=${encodeURIComponent(`Olá ${manager.name}! Tenho interesse no Apto ${selected.code} do SYNTHÈ (pré-lançamento).`)}`, '_blank')
                }}>
                  Cadastrar Interesse via WhatsApp
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
