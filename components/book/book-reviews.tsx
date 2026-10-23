'use client'

import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { toast } from 'sonner'
import { RatingStars } from '@/components/rating-stars'
import type { Book } from '@/lib/books'
import { cn } from '@/lib/utils'

type Review = { name: string; rating: number; date: string; title: string; body: string; helpful: number }

const seedReviews: Review[] = [
  { name: 'Clara W.', rating: 5, date: 'Sep 12, 2026', title: 'Absolutely gorgeous', body: 'I read it in two sittings. The writing is lush and the ending stayed with me for days.', helpful: 42 },
  { name: 'Ben T.', rating: 4, date: 'Aug 30, 2026', title: 'A strong read', body: 'Slow start but it picks up beautifully. Characters feel real and lived in.', helpful: 18 },
  { name: 'Ama K.', rating: 5, date: 'Aug 2, 2026', title: 'Bought three copies', body: 'One for me and two as gifts. Everyone loved it — the perfect book club pick.', helpful: 27 },
]

export function BookReviews({ book }: { book: Book }) {
  const [reviews, setReviews] = useState(seedReviews)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [voted, setVoted] = useState<number[]>([])
  const distribution = [72, 18, 6, 3, 1]

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_1fr]">
        <div className="text-center sm:pr-6">
          <p className="font-serif text-5xl font-semibold">{book.rating}</p>
          <RatingStars rating={book.rating} />
          <p className="mt-1 text-sm text-muted-foreground">{book.reviews.toLocaleString()} reviews</p>
        </div>
        <ul className="flex flex-col gap-2">
          {distribution.map((pct, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="w-8">{5 - i}★</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <span className="block h-full rounded-full bg-gold transition-all duration-1000" style={{ width: `${pct}%` }} />
              </span>
              <span className="w-10 text-right text-muted-foreground">{pct}%</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-col gap-4">
        {reviews.map((r, i) => (
          <li key={`${r.name}-${i}`} className="rounded-2xl border bg-card p-5 animate-in fade-in duration-500">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary/10 font-semibold text-primary">{r.name[0]}</span>
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date} · Verified purchase</p>
                </div>
              </div>
              <RatingStars rating={r.rating} size="size-3.5" />
            </div>
            <p className="mt-3 font-semibold">{r.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            <button
              type="button"
              disabled={voted.includes(i)}
              onClick={() => {
                setVoted((v) => [...v, i])
                setReviews((rs) => rs.map((x, j) => (j === i ? { ...x, helpful: x.helpful + 1 } : x)))
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition hover:border-primary disabled:border-primary disabled:text-primary"
            >
              <ThumbsUp className="size-3.5" aria-hidden /> Helpful ({r.helpful})
            </button>
          </li>
        ))}
      </ul>

      <form
        className="flex flex-col gap-4 rounded-2xl border bg-secondary/40 p-6"
        onSubmit={(e) => {
          e.preventDefault()
          const fd = new FormData(e.currentTarget)
          const name = String(fd.get('name') || '').trim()
          const body = String(fd.get('body') || '').trim()
          if (!rating || !name || !body) {
            toast.error('Please add a rating, your name and a review')
            return
          }
          setReviews((rs) => [
            { name, rating, title: String(fd.get('title') || 'My review'), body, helpful: 0, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
            ...rs,
          ])
          setRating(0)
          e.currentTarget.reset()
          toast.success('Thanks for your review!')
        }}
      >
        <h3 className="font-serif text-xl font-semibold">Write a review</h3>
        <div className="flex gap-1" role="radiogroup" aria-label="Your rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              className="transition hover:scale-125"
            >
              <Star className={cn('size-7', (hover || rating) >= n ? 'text-gold' : 'text-muted-foreground/40')} fill="currentColor" strokeWidth={0} />
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" placeholder="Your name" aria-label="Your name" className="h-11 rounded-xl border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="title" placeholder="Review title" aria-label="Review title" className="h-11 rounded-xl border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <textarea name="body" rows={4} placeholder="What did you think?" aria-label="Review" className="rounded-xl border bg-card p-4 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
        <button type="submit" className="w-fit rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
          Submit review
        </button>
      </form>
    </div>
  )
}
