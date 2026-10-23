'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Flame, ShoppingBag } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { RatingStars } from '@/components/rating-stars'
import { coverFor, discountPercent, formatPrice, getBook } from '@/lib/books'

function useCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null)
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now)
      end.setHours(24, 0, 0, 0)
      setRemaining(end.getTime() - now.getTime())
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const total = remaining ?? 0
  return {
    ready: remaining !== null,
    hours: Math.floor(total / 3_600_000),
    minutes: Math.floor((total / 60_000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  }
}

export function DealOfTheDay() {
  const book = getBook('kingdom-of-ash')!
  const deal = { ...book, price: 17.49, originalPrice: book.price }
  const { addToCart } = useStore()
  const { ready, hours, minutes, seconds } = useCountdown()
  const sold = 72

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-accent/40 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 left-1/3 size-80 rounded-full bg-gold/20 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Link href={`/books/${book.slug}`} className="group relative mx-auto block w-52 sm:w-64">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-2xl shadow-black/40 transition duration-500 group-hover:-rotate-2 group-hover:scale-105">
              <Image src={coverFor(book.slug) || '/placeholder.svg'} alt={`Cover of ${book.title}`} fill sizes="256px" className="object-cover" />
            </div>
            <span className="absolute -right-4 -top-4 grid size-16 place-items-center rounded-full bg-accent text-lg font-bold shadow-lg">
              -{discountPercent(deal)}%
            </span>
          </Link>

          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-sm font-medium">
              <Flame className="size-4 text-gold" aria-hidden /> Deal of the day
            </span>
            <div>
              <h2 className="text-3xl font-semibold sm:text-5xl">{book.title}</h2>
              <p className="mt-2 text-primary-foreground/70">by {book.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={book.rating} />
              <span className="text-sm text-primary-foreground/70">{book.reviews.toLocaleString()} reviews</span>
            </div>
            <p className="max-w-xl leading-relaxed text-primary-foreground/80">{book.description}</p>

            <div className="flex flex-wrap gap-3" aria-live="off">
              {[
                { v: hours, l: 'Hours' },
                { v: minutes, l: 'Mins' },
                { v: seconds, l: 'Secs' },
              ].map((u) => (
                <div key={u.l} className="min-w-20 rounded-xl bg-background/10 px-4 py-3 text-center backdrop-blur">
                  <span className="block font-serif text-3xl font-semibold tabular-nums">
                    {ready ? String(u.v).padStart(2, '0') : '--'}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-primary-foreground/60">{u.l}</span>
                </div>
              ))}
            </div>

            <div className="max-w-md">
              <div className="mb-2 flex justify-between text-sm">
                <span>Sold: {sold}%</span>
                <span className="text-primary-foreground/70">Only {book.stock} left</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-background/15">
                <div
                  className="h-full animate-shimmer rounded-full bg-[linear-gradient(90deg,var(--gold),var(--accent),var(--gold))] bg-[length:200%_100%]"
                  style={{ width: `${sold}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-semibold">{formatPrice(deal.price)}</span>
                <span className="text-lg text-primary-foreground/60 line-through">{formatPrice(deal.originalPrice)}</span>
              </div>
              <button
                type="button"
                onClick={() => addToCart(book.slug)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 font-medium text-accent-foreground shadow-lg transition hover:scale-105 hover:bg-accent/90"
              >
                <ShoppingBag className="size-5" aria-hidden /> Grab the deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
