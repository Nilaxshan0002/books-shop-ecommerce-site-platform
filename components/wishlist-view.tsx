'use client'

import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/components/store-provider'
import { BookCard } from '@/components/book-card'

export function WishlistView() {
  const { wishlist, addToCart } = useStore()

  if (wishlist.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="mx-auto grid size-20 animate-float place-items-center rounded-full bg-accent/10">
          <Heart className="size-9 text-accent" aria-hidden />
        </span>
        <h2 className="mt-6 text-3xl font-semibold">No saved books yet</h2>
        <p className="mt-2 text-muted-foreground">Tap the heart on any book to save it here for later.</p>
        <Link href="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition hover:bg-primary/90">
          Discover books
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground">
          {wishlist.length} saved {wishlist.length === 1 ? 'book' : 'books'}
        </p>
        <button
          type="button"
          onClick={() => {
            wishlist.forEach((b) => addToCart(b.slug))
            toast.success('All wishlist books added to your bag')
          }}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <ShoppingBag className="size-4" aria-hidden /> Add all to bag
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {wishlist.map((b) => (
          <div key={b.slug} className="animate-in fade-in zoom-in-95 duration-500">
            <BookCard book={b} />
          </div>
        ))}
      </div>
    </section>
  )
}
