'use client'

export type PaymentStep = { label: string; pct: number; count: number }

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function PaymentBreakdown({ price, plan }: { price: number; plan: PaymentStep[] }) {
  return (
    <div className="mt-3 pt-3 border-t space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Condições de Pagamento
      </p>
      <div className="space-y-1.5">
        {plan.map(step => {
          const total = price * step.pct
          const each = total / step.count
          return (
            <div key={step.label} className="flex justify-between items-baseline text-sm">
              <span className="text-muted-foreground">{step.label}</span>
              <span className="font-medium tabular-nums">
                {step.count > 1 ? `${step.count}x de ${fmt(each)}` : fmt(total)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
