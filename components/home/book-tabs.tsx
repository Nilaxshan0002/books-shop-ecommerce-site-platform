'use client'

import { useState } from 'react'
import { BookCard } from '@/components/book-card'
import { SectionHeading } from '@/components/home/section-heading'
import { books, type BookTag } from '@/lib/books'
import { cn } from '@/lib/utils'

const tabs: { value: BookTag; label: string }[] = [
  { value: 'bestseller', label: 'Bestsellers' },
  { value: 'new', label: 'New Releases' },
  { value: 'sale', label: 'On Sale' },
  { value: 'featured', label: 'Staff Picks' },
]

export function BookTabs() {
  const [active, setActive] = useState<BookTag>('bestseller')
  const list = books.filter((b) => b.tags.includes(active)).slice(0, 5)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Trending now"
        title="What everyone's reading"
        description="Updated daily from our shop floor and online orders."
        href={`/shop?tag=${active}`}
      />
      <div role="tablist" aria-label="Book collections" className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            role="tab"
            type="button"
            aria-selected={active === t.value}
            onClick={() => setActive(t.value)}
            className={cn(
              'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300',
              active === t.value
                ? 'border-primary bg-primary text-primary-foreground shadow-md'
                : 'border-border bg-card hover:border-primary/50 hover:text-primary',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={active} role="tabpanel" className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((book, i) => (
          <div
            key={book.slug}
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-500"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  )
}
