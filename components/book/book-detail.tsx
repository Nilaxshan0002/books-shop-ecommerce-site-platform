'use client'

import Image from 'next/image'
import { useState } from 'react'
import { BookOpen, Heart, RotateCcw, Share2, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/components/store-provider'
import { RatingStars } from '@/components/rating-stars'
import { QuantityStepper } from '@/components/quantity-stepper'
import { BookReviews } from '@/components/book/book-reviews'
import { coverFor, discountPercent, formatPrice, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'

const formats = [
  { name: 'Hardcover', delta: 0 },
  { name: 'Paperback', delta: -6 },
  { name: 'eBook', delta: -10 },
]

export function BookDetail({ book }: { book: Book }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'description' | 'details' | 'reviews'>('description')
  const [showExcerpt, setShowExcerpt] = useState(false)
  const saved = isWishlisted(book.slug)
  const off = discountPercent(book)

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: book.title, url: window.location.href })
      else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard')
      }
    } catch {
      /* user dismissed share sheet */
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative mx-auto max-w-sm [perspective:1200px]">
            <div className="group relative aspect-[2/3] overflow-hidden rounded-r-xl rounded-l-sm shadow-2xl shadow-foreground/30 transition-transform duration-700 [transform:rotateY(-12deg)] hover:[transform:rotateY(0deg)]">
              <Image src={coverFor(book.slug) || '/placeholder.svg'} alt={`Cover of ${book.title}`} fill priority sizes="(min-width:1024px) 420px, 90vw" className="object-cover" />
              <span className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 to-transparent" aria-hidden />
            </div>
            {off > 0 && (
              <span className="absolute -right-3 -top-3 grid size-16 place-items-center rounded-full bg-accent text-lg font-bold text-accent-foreground shadow-lg animate-in zoom-in duration-500">
                -{off}%
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowExcerpt((v) => !v)}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
            aria-expanded={showExcerpt}
          >
            <BookOpen className="size-4" aria-hidden /> {showExcerpt ? 'Close preview' : 'Read a sample'}
          </button>
          {showExcerpt && (
            <blockquote className="mt-4 rounded-2xl border-l-4 border-accent bg-card p-5 font-serif text-lg italic leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
              {book.excerpt}
            </blockquote>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-lg text-muted-foreground">
              by <span className="font-medium text-foreground">{book.author}</span>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={book.rating} />
              <span className="text-sm font-medium">{book.rating}</span>
              <button type="button" onClick={() => setTab('reviews')} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                {book.reviews.toLocaleString()} reviews
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-serif text-4xl font-semibold text-primary">{formatPrice(book.price)}</span>
            {book.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-sm font-semibold text-accent">
                  Save {formatPrice(book.originalPrice - book.price)}
                </span>
              </>
            )}
          </div>

          <p className="leading-relaxed text-muted-foreground">{book.description}</p>

          <div>
            <p className="mb-2 text-sm font-medium">Format</p>
            <div className="flex flex-wrap gap-2">
              {formats.map((f) => (
                <span
                  key={f.name}
                  className={cn(
                    'rounded-xl border px-4 py-2 text-sm',
                    f.name === book.format ? 'border-primary bg-primary/5 font-medium text-primary' : 'text-muted-foreground',
                  )}
                >
                  {f.name}
                  {f.name === book.format && <span className="ml-2">{formatPrice(book.price)}</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className={cn('size-2.5 rounded-full', book.stock > 10 ? 'bg-emerald-500' : 'animate-pulse bg-amber-500')} aria-hidden />
            {book.stock > 10 ? 'In stock — ships within 24 hours' : `Only ${book.stock} left in stock — order soon`}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} max={Math.min(10, book.stock)} />
            <button
              type="button"
              onClick={() => addToCart(book.slug, qty)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:bg-primary/90 sm:flex-none"
            >
              <ShoppingBag className="size-5" aria-hidden /> Add to bag
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(book.slug)}
              aria-pressed={saved}
              aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
              className={cn('grid size-12 place-items-center rounded-full border transition hover:border-accent', saved && 'border-accent bg-accent/10 text-accent')}
            >
              <Heart className={cn('size-5', saved && 'animate-pop')} fill={saved ? 'currentColor' : 'none'} />
            </button>
            <button type="button" onClick={share} aria-label="Share" className="grid size-12 place-items-center rounded-full border transition hover:border-primary">
              <Share2 className="size-5" />
            </button>
          </div>

          <ul className="grid gap-3 rounded-2xl bg-secondary/60 p-5 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="size-5 text-primary" aria-hidden /> Free shipping over $35
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="size-5 text-primary" aria-hidden /> 30-day returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" aria-hidden /> Secure checkout
            </li>
          </ul>

          <div className="mt-4">
            <div role="tablist" className="flex gap-6 border-b">
              {(['description', 'details', 'reviews'] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'relative pb-3 text-sm font-medium capitalize transition',
                    tab === t ? 'text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div role="tabpanel" key={tab} className="pt-6 animate-in fade-in duration-300">
              {tab === 'description' && (
                <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
                  <p>{book.description}</p>
                  <p>
                    Praised by critics and readers alike, {book.title} is one of the most talked-about {book.category.toLowerCase()} titles of {book.year}. Our booksellers describe it as
                    &ldquo;impossible to put down&rdquo; &mdash; perfect for a long weekend or as a thoughtful gift.
                  </p>
                </div>
              )}
              {tab === 'details' && (
                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
                  {[
                    ['Publisher', book.publisher],
                    ['Published', book.year],
                    ['Pages', book.pages],
                    ['Language', book.language],
                    ['Format', book.format],
                    ['ISBN', book.isbn],
                  ].map(([k, v]) => (
                    <div key={k as string} className="rounded-xl border bg-card p-3">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === 'reviews' && <BookReviews book={book} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
