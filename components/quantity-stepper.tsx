'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function QuantityStepper({
  value,
  onChange,
  max = 10,
  min = 1,
  size = 'md',
}: {
  value: number
  onChange: (value: number) => void
  max?: number
  min?: number
  size?: 'sm' | 'md'
}) {
  const btn = cn(
    'grid place-items-center rounded-full transition hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent',
    size === 'sm' ? 'size-7' : 'size-10',
  )
  return (
    <div className={cn('inline-flex items-center rounded-full border bg-card', size === 'sm' ? 'gap-1 p-0.5' : 'gap-2 p-1')}>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min && min > 0}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" />
      </button>
      <span className={cn('min-w-6 text-center font-medium tabular-nums', size === 'sm' ? 'text-sm' : 'text-base')} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
