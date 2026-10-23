'use client'

import { useState } from 'react'
import { Tag, X } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/components/store-provider'
import { FreeShippingProgress } from '@/components/free-shipping-progress'
import { formatPrice } from '@/lib/books'

export function OrderSummary({ children }: { children?: React.ReactNode }) {
  const { subtotal, discount, shipping, tax, total, coupon, applyCoupon, removeCoupon } = useStore()
  const [code, setCode] = useState('')

  return (
    <div className="flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm">
      <h2 className="font-serif text-2xl font-semibold">Order summary</h2>
      <FreeShippingProgress subtotal={subtotal} />

      {coupon ? (
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span className="flex items-center gap-2 font-medium">
            <Tag className="size-4" aria-hidden /> {coupon} applied
          </span>
          <button type="button" onClick={removeCoupon} aria-label="Remove coupon">
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (applyCoupon(code)) {
              toast.success(`Coupon ${code.toUpperCase()} applied`)
              setCode('')
            } else toast.error('That code is not valid', { description: 'Try READ10 or BOOKWORM20' })
          }}
        >
          <label htmlFor="coupon" className="sr-only">
            Coupon code
          </label>
          <input
            id="coupon"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Coupon code"
            className="h-11 min-w-0 flex-1 rounded-full border bg-background px-4 text-sm uppercase outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button type="submit" className="h-11 rounded-full border border-foreground px-5 text-sm font-medium transition hover:bg-foreground hover:text-background">
            Apply
          </button>
        </form>
      )}
      <p className="-mt-3 text-xs text-muted-foreground">Hint: try READ10 or BOOKWORM20</p>

      <dl className="flex flex-col gap-3 border-t pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <dt>Discount</dt>
            <dd>-{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd>{shipping === 0 ? <span className="font-medium text-emerald-700">Free</span> : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Estimated tax</dt>
          <dd>{formatPrice(tax)}</dd>
        </div>
        <div className="flex justify-between border-t pt-4 text-lg font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {children}
    </div>
  )
}
