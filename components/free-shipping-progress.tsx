import { Truck } from 'lucide-react'
import { FREE_SHIPPING_THRESHOLD, formatPrice } from '@/lib/books'

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-sm">
        <Truck className="size-4 text-primary" aria-hidden />
        {remaining > 0 ? (
          <span>
            Add <strong>{formatPrice(remaining)}</strong> more for free shipping
          </span>
        ) : (
          <span className="font-medium text-primary">You&apos;ve unlocked free shipping!</span>
        )}
      </p>
      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress to free shipping"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
