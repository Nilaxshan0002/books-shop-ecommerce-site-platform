'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { RatingStars } from '@/components/rating-stars'
import { coverFor, formatPrice, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'

export function BookListItem({ book }: { book: Book }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const saved = isWishlisted(book.slug)
  return (
    <article className="group flex gap-5 rounded-2xl border bg-card p-4 transition hover:shadow-lg">
      <Link href={`/books/${book.slug}`} className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-lg sm:w-28">
        <Image src={coverFor(book.slug) || '/placeholder.svg'} alt={`Cover of ${book.title}`} fill sizes="112px" className="object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">{book.category}</p>
        <h3 className="font-serif text-xl font-semibold">
          <Link href={`/books/${book.slug}`} className="hover:text-primary">
            {book.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          {book.author} · {book.year} · {book.pages} pages
        </p>
        <div className="flex items-center gap-2">
          <RatingStars rating={book.rating} size="size-3.5" />
          <span className="text-xs text-muted-foreground">{book.rating} ({book.reviews.toLocaleString()})</span>
        </div>
        <p className="mt-1 line-clamp-2 hidden text-sm text-muted-foreground sm:block">{book.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{formatPrice(book.price)}</span>
            {book.originalPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(book.slug)}
              aria-pressed={saved}
              aria-label="Toggle wishlist"
              className={cn('grid size-10 place-items-center rounded-full border transition hover:border-accent', saved && 'text-accent')}
            >
              <Heart className="size-4" fill={saved ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={() => addToCart(book.slug)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              <ShoppingBag className="size-4" aria-hidden /> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
