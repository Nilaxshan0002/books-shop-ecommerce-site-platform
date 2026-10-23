'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { QuantityStepper } from '@/components/quantity-stepper'
import { OrderSummary } from '@/components/cart/order-summary'
import { BookCard } from '@/components/book-card'
import { booksByTag, coverFor, formatPrice } from '@/lib/books'

export function CartView() {
  const { lines, updateQuantity, removeFromCart, toggleWishlist, isWishlisted, clearCart } = useStore()

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed py-20 text-center">
          <span className="grid size-20 animate-float place-items-center rounded-full bg-secondary">
            <ShoppingBag className="size-9 text-primary" aria-hidden />
          </span>
          <h2 className="text-3xl font-semibold">Your bag is empty</h2>
          <p className="max-w-sm text-muted-foreground">Every great story starts with a single page. Find yours in our shop.</p>
          <Link href="/shop" className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground transition hover:bg-primary/90">
            Start browsing <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <h2 className="mb-8 mt-16 text-2xl font-semibold">Popular right now</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
          {booksByTag('bestseller')
            .slice(0, 4)
            .map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{lines.length} {lines.length === 1 ? 'title' : 'titles'} in your bag</p>
          <button type="button" onClick={clearCart} className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-destructive hover:underline">
            Clear bag
          </button>
        </div>
        <ul className="flex flex-col gap-4">
          {lines.map(({ book, quantity }) => (
            <li key={book.slug} className="flex gap-5 rounded-2xl border bg-card p-4 animate-in fade-in slide-in-from-left-4 duration-500">
              <Link href={`/books/${book.slug}`} className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-lg shadow-md">
                <Image src={coverFor(book.slug) || '/placeholder.svg'} alt={`Cover of ${book.title}`} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link href={`/books/${book.slug}`} className="font-serif text-lg font-semibold hover:text-primary">
                      {book.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {book.author} · {book.format}
                    </p>
                  </div>
                  <p className="font-semibold">{formatPrice(book.price * quantity)}</p>
                </div>
                <p className="text-xs text-muted-foreground">{formatPrice(book.price)} each</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <QuantityStepper value={quantity} onChange={(v) => updateQuantity(book.slug, v)} max={Math.min(10, book.stock)} />
                  <div className="flex gap-4 text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isWishlisted(book.slug)) toggleWishlist(book.slug)
                        removeFromCart(book.slug)
                      }}
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent"
                    >
                      <Heart className="size-4" aria-hidden /> Save for later
                    </button>
                    <button type="button" onClick={() => removeFromCart(book.slug)} className="inline-flex items-center gap-1 text-muted-foreground hover:text-destructive">
                      <Trash2 className="size-4" aria-hidden /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/shop" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          ← Continue shopping
        </Link>
      </div>
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <OrderSummary>
          <Link
            href="/checkout"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:scale-[1.02] hover:bg-primary/90"
          >
            Proceed to checkout <ArrowRight className="size-4" aria-hidden />
          </Link>
        </OrderSummary>
      </aside>
    </section>
  )
}
