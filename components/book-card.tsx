'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { RatingStars } from '@/components/rating-stars'
import { coverFor, discountPercent, formatPrice, type Book } from '@/lib/books'
import { cn } from '@/lib/utils'

export function BookCard({ book, priority = false }: { book: Book; priority?: boolean }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const saved = isWishlisted(book.slug)
  const off = discountPercent(book)

  return (
    <article className="group relative flex flex-col">
      <div className="relative">
        <Link
          href={`/books/${book.slug}`}
          className="relative block aspect-[2/3] overflow-hidden rounded-xl bg-muted shadow-md shadow-foreground/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-foreground/20"
        >
          <Image
            src={coverFor(book.slug) || '/placeholder.svg'}
            alt={`Cover of ${book.title} by ${book.author}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 to-transparent" aria-hidden />
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col gap-1">
          {off > 0 && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground shadow">-{off}%</span>
          )}
          {book.tags.includes('new') && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground shadow">New</span>
          )}
          {book.tags.includes('bestseller') && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-foreground shadow">Bestseller</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(book.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${book.title} from wishlist` : `Save ${book.title} to wishlist`}
          className={cn(
            'absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-card/90 shadow backdrop-blur transition hover:scale-110',
            saved ? 'text-accent' : 'text-foreground',
          )}
        >
          <Heart className={cn('size-4 transition', saved && 'animate-pop')} fill={saved ? 'currentColor' : 'none'} />
        </button>

        <button
          type="button"
          onClick={() => addToCart(book.slug)}
          className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground opacity-0 shadow-lg transition-all duration-300 hover:bg-primary/90 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
        >
          <ShoppingBag className="size-4" aria-hidden />
          Add to bag
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">{book.category}</p>
        <h3 className="line-clamp-1 font-serif text-lg font-semibold leading-tight">
          <Link href={`/books/${book.slug}`} className="hover:text-primary">
            {book.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-2">
          <RatingStars rating={book.rating} size="size-3.5" />
          <span className="text-xs text-muted-foreground">({book.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-semibold">{formatPrice(book.price)}</span>
          {book.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(book.originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  )
}
