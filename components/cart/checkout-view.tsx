'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Check, CreditCard, Loader2, Lock, PartyPopper, Truck, Wallet } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { OrderSummary } from '@/components/cart/order-summary'
import { coverFor, formatPrice } from '@/lib/books'
import { cn } from '@/lib/utils'

const steps = ['Shipping', 'Delivery', 'Payment'] as const

const deliveryOptions = [
  { id: 'standard', label: 'Standard', eta: '4–6 business days', price: 'Included' },
  { id: 'express', label: 'Express', eta: '1–2 business days', price: '+$9.99' },
  { id: 'pickup', label: 'Store pickup', eta: 'Ready in 2 hours', price: 'Free' },
]

function Field({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn('flex flex-col gap-1.5 text-sm', className)}>
      <span className="font-medium">{label}</span>
      <input {...props} className="h-11 rounded-xl border bg-card px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </label>
  )
}

export function CheckoutView() {
  const { lines, total, clearCart } = useStore()
  const [step, setStep] = useState(0)
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState<'card' | 'wallet'>('card')
  const [placing, setPlacing] = useState(false)
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null)

  if (order) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-700">
          <span className="grid size-24 place-items-center rounded-full bg-emerald-100 text-emerald-700">
            <PartyPopper className="size-11 animate-pop" aria-hidden />
          </span>
          <h2 className="text-4xl font-semibold">Thank you for your order!</h2>
          <p className="text-muted-foreground">
            Order <span className="font-mono font-semibold text-foreground">#{order.id}</span> totalling {formatPrice(order.total)} is confirmed. A receipt is on its way to your inbox.
          </p>
          <ol className="mt-6 grid w-full grid-cols-3 gap-2 text-xs">
            {['Confirmed', 'Packing', 'Shipped'].map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-2">
                <span className={cn('grid size-9 place-items-center rounded-full', i === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground')}>
                  {i === 0 ? <Check className="size-4" /> : i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <Link href="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition hover:bg-primary/90">
            Keep shopping
          </Link>
        </div>
      </section>
    )
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <h2 className="text-3xl font-semibold">Nothing to check out yet</h2>
        <p className="mt-2 text-muted-foreground">Add a few books to your bag first.</p>
        <Link href="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-primary-foreground">
          Browse books
        </Link>
      </section>
    )
  }

  const next = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setPlacing(true)
    setTimeout(() => {
      setOrder({ id: `INK-${Math.floor(100000 + Math.random() * 900000)}`, total })
      clearCart()
      setPlacing(false)
    }, 1400)
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_400px]">
      <div>
        <ol className="mb-8 flex items-center gap-2" aria-label="Checkout progress">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                aria-current={i === step ? 'step' : undefined}
                className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-full text-sm font-semibold transition',
                  i < step && 'bg-primary text-primary-foreground',
                  i === step && 'bg-accent text-accent-foreground ring-4 ring-accent/20',
                  i > step && 'bg-secondary text-muted-foreground',
                )}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </button>
              <span className={cn('text-sm font-medium', i === step ? 'text-foreground' : 'text-muted-foreground')}>{s}</span>
              {i < steps.length - 1 && <span className={cn('h-0.5 flex-1 rounded-full transition-colors duration-500', i < step ? 'bg-primary' : 'bg-border')} />}
            </li>
          ))}
        </ol>

        <form onSubmit={next} className="rounded-2xl border bg-card p-6 sm:p-8">
          <div key={step} className="animate-in fade-in slide-in-from-right-6 duration-500">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <h2 className="font-serif text-2xl font-semibold sm:col-span-2">Shipping address</h2>
                <Field label="First name" name="first" required autoComplete="given-name" />
                <Field label="Last name" name="last" required autoComplete="family-name" />
                <Field label="Email" name="email" type="email" required autoComplete="email" className="sm:col-span-2" />
                <Field label="Address" name="address" required autoComplete="street-address" className="sm:col-span-2" />
                <Field label="City" name="city" required autoComplete="address-level2" />
                <Field label="ZIP code" name="zip" required autoComplete="postal-code" inputMode="numeric" />
              </div>
            )}
            {step === 1 && (
              <fieldset className="flex flex-col gap-3">
                <legend className="mb-4 font-serif text-2xl font-semibold">Delivery method</legend>
                {deliveryOptions.map((o) => (
                  <label
                    key={o.id}
                    className={cn(
                      'flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition',
                      delivery === o.id ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'hover:border-primary/40',
                    )}
                  >
                    <input type="radio" name="delivery" value={o.id} checked={delivery === o.id} onChange={() => setDelivery(o.id)} className="accent-[var(--primary)]" />
                    <Truck className="size-5 text-primary" aria-hidden />
                    <span className="flex-1">
                      <span className="block font-medium">{o.label}</span>
                      <span className="text-sm text-muted-foreground">{o.eta}</span>
                    </span>
                    <span className="text-sm font-medium">{o.price}</span>
                  </label>
                ))}
              </fieldset>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-2xl font-semibold">Payment</h2>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Payment method">
                  {[
                    { id: 'card' as const, label: 'Card', icon: CreditCard },
                    { id: 'wallet' as const, label: 'Digital wallet', icon: Wallet },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={payment === id}
                      onClick={() => setPayment(id)}
                      className={cn('flex items-center justify-center gap-2 rounded-xl border p-4 text-sm font-medium transition', payment === id ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' : 'hover:border-primary/40')}
                    >
                      <Icon className="size-5" aria-hidden /> {label}
                    </button>
                  ))}
                </div>
                {payment === 'card' ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.3_0.06_160)] p-5 text-primary-foreground shadow-xl sm:col-span-2 sm:max-w-sm">
                      <span className="absolute -right-10 -top-10 size-40 rounded-full bg-accent/40 blur-2xl" aria-hidden />
                      <p className="font-serif text-lg">Inkwell Card</p>
                      <p className="mt-10 font-mono tracking-widest">•••• •••• •••• 4242</p>
                      <p className="mt-3 text-xs uppercase opacity-70">Demo checkout — no real charge</p>
                    </div>
                    <Field label="Card number" name="card" required inputMode="numeric" placeholder="4242 4242 4242 4242" autoComplete="cc-number" className="sm:col-span-2" />
                    <Field label="Expiry" name="exp" required placeholder="MM/YY" autoComplete="cc-exp" />
                    <Field label="CVC" name="cvc" required inputMode="numeric" placeholder="123" autoComplete="cc-csc" />
                  </div>
                ) : (
                  <p className="rounded-xl bg-secondary/60 p-4 text-sm text-muted-foreground">You&apos;ll confirm the payment in your wallet after placing the order.</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t pt-6">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                ← Back
              </button>
            ) : (
              <Link href="/cart" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                ← Return to bag
              </Link>
            )}
            <button
              type="submit"
              disabled={placing}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
            >
              {placing ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden /> Placing order…
                </>
              ) : step === steps.length - 1 ? (
                <>
                  <Lock className="size-4" aria-hidden /> Pay {formatPrice(total)}
                </>
              ) : (
                `Continue to ${steps[step + 1].toLowerCase()}`
              )}
            </button>
          </div>
        </form>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <ul className="flex flex-col gap-3 rounded-2xl border bg-card p-4">
          {lines.map(({ book, quantity }) => (
            <li key={book.slug} className="flex items-center gap-3">
              <span className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded">
                <Image src={coverFor(book.slug) || '/placeholder.svg'} alt="" fill sizes="48px" className="object-cover" />
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">{quantity}</span>
              </span>
              <span className="flex-1 truncate text-sm font-medium">{book.title}</span>
              <span className="text-sm">{formatPrice(book.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <OrderSummary />
      </aside>
    </section>
  )
}
