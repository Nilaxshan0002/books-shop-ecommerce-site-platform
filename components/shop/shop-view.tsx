'use client'

import { useMemo, useState } from 'react'
import { LayoutGrid, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { BookCard } from '@/components/book-card'
import { BookListItem } from '@/components/shop/book-list-item'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { books, categories, type BookTag } from '@/lib/books'
import { cn } from '@/lib/utils'

const sorts = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  rating: 'Top rated',
  newest: 'Newest',
} as const
type SortKey = keyof typeof sorts

const tagOptions: { value: BookTag; label: string }[] = [
  { value: 'bestseller', label: 'Bestsellers' },
  { value: 'new', label: 'New releases' },
  { value: 'sale', label: 'On sale' },
  { value: 'featured', label: 'Staff picks' },
]

const MAX_PRICE = 40

type Filters = {
  query: string
  categories: string[]
  tags: string[]
  maxPrice: number
  minRating: number
}

function FilterPanel({
  filters,
  setFilters,
}: {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}) {
  const toggle = (key: 'categories' | 'tags', value: string) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }))

  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Genre</legend>
        <div className="flex flex-col gap-2">
          {categories.map((c) => {
            const count = books.filter((b) => b.category === c.name).length
            return (
              <label key={c.name} className="flex cursor-pointer items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(c.name)}
                    onChange={() => toggle('categories', c.name)}
                    className="size-4 rounded accent-[var(--primary)]"
                  />
                  {c.name}
                </span>
                <span className="text-xs text-muted-foreground">{count}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Collections</legend>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((t) => {
            const on = filters.tags.includes(t.value)
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={on}
                onClick={() => toggle('tags', t.value)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  on ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Max price</legend>
        <input
          type="range"
          min={5}
          max={MAX_PRICE}
          step={1}
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
          className="w-full accent-[var(--accent)]"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-sm text-muted-foreground">
          <span>$5</span>
          <span className="font-medium text-foreground">Up to ${filters.maxPrice}</span>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 font-serif text-lg font-semibold">Rating</legend>
        <div className="flex flex-col gap-2">
          {[0, 4, 4.5, 4.7].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => setFilters((f) => ({ ...f, minRating: r }))}
                className="accent-[var(--primary)]"
              />
              {r === 0 ? 'Any rating' : `${r}★ & up`}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

export function ShopView({
  initialCategory,
  initialTag,
  initialQuery,
}: {
  initialCategory: string
  initialTag: string
  initialQuery: string
}) {
  const empty: Filters = { query: '', categories: [], tags: [], maxPrice: MAX_PRICE, minRating: 0 }
  const [filters, setFilters] = useState<Filters>({
    ...empty,
    query: initialQuery,
    categories: initialCategory ? [initialCategory] : [],
    tags: initialTag ? [initialTag] : [],
  })
  const [sort, setSort] = useState<SortKey>('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    const list = books.filter(
      (b) =>
        (!q || `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q)) &&
        (!filters.categories.length || filters.categories.includes(b.category)) &&
        (!filters.tags.length || filters.tags.some((t) => b.tags.includes(t as BookTag))) &&
        b.price <= filters.maxPrice &&
        b.rating >= filters.minRating,
    )
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    if (sort === 'newest') sorted.sort((a, b) => b.year - a.year)
    return sorted
  }, [filters, sort])

  const activeChips = [
    ...filters.categories.map((c) => ({ label: c, clear: () => setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })) })),
    ...filters.tags.map((t) => ({ label: tagOptions.find((o) => o.value === t)?.label ?? t, clear: () => setFilters((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) })) })),
    ...(filters.maxPrice < MAX_PRICE ? [{ label: `Under $${filters.maxPrice}`, clear: () => setFilters((f) => ({ ...f, maxPrice: MAX_PRICE })) }] : []),
    ...(filters.minRating ? [{ label: `${filters.minRating}★+`, clear: () => setFilters((f) => ({ ...f, minRating: 0 })) }] : []),
    ...(filters.query ? [{ label: `"${filters.query}"`, clear: () => setFilters((f) => ({ ...f, query: '' })) }] : []),
  ]

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-28">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border bg-card p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <label htmlFor="shop-search" className="sr-only">
              Search books
            </label>
            <input
              id="shop-search"
              type="search"
              value={filters.query}
              onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
              placeholder="Search by title, author or genre"
              className="h-10 w-full rounded-full bg-secondary/60 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium lg:hidden">
                <SlidersHorizontal className="size-4" aria-hidden /> Filters
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Filters</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-8">
                  <FilterPanel filters={filters} setFilters={setFilters} />
                </div>
              </SheetContent>
            </Sheet>
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-full border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              {Object.entries(sorts).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            <div className="hidden rounded-full border p-1 sm:flex" role="group" aria-label="View mode">
              {(['grid', 'list'] as const).map((v) => {
                const Icon = v === 'grid' ? LayoutGrid : List
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    aria-label={`${v} view`}
                    onClick={() => setView(v)}
                    className={cn('grid size-8 place-items-center rounded-full transition', view === v ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary')}
                  >
                    <Icon className="size-4" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <p className="mr-2 text-sm text-muted-foreground" aria-live="polite">
            Showing <span className="font-semibold text-foreground">{results.length}</span> of {books.length} books
          </p>
          {activeChips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={c.clear}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent/20"
            >
              {c.label} <X className="size-3" aria-label="remove" />
            </button>
          ))}
          {activeChips.length > 0 && (
            <button type="button" onClick={() => setFilters(empty)} className="text-xs font-medium underline underline-offset-4">
              Clear all
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-20 text-center">
            <Search className="size-10 text-muted-foreground" aria-hidden />
            <p className="font-serif text-2xl">No books match those filters</p>
            <p className="text-muted-foreground">Try widening your price range or clearing a genre.</p>
            <button type="button" onClick={() => setFilters(empty)} className="mt-2 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">
              Reset filters
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
            {results.map((b, i) => (
              <div key={b.slug} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500" style={{ animationDelay: `${i * 40}ms` }}>
                <BookCard book={b} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {results.map((b, i) => (
              <div key={b.slug} className="animate-in fade-in slide-in-from-left-4 fill-mode-both duration-500" style={{ animationDelay: `${i * 40}ms` }}>
                <BookListItem book={b} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
