import Link from 'next/link'
import { Atom, Baby, BookOpen, ChefHat, Compass, Heart, Landmark, Leaf, Rocket, Search, Sparkles } from 'lucide-react'
import { books, categories } from '@/lib/books'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/home/section-heading'
import { cn } from '@/lib/utils'

const icons = { Atom, Baby, BookOpen, ChefHat, Compass, Heart, Landmark, Leaf, Rocket, Search, Sparkles }

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Browse" title="Shop by genre" href="/shop" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => {
          const Icon = icons[cat.icon]
          const count = books.filter((b) => b.category === cat.name).length
          return (
            <Reveal key={cat.name} delay={i * 50} className={i === categories.length - 1 ? 'lg:col-span-1' : ''}>
              <Link
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className={cn(
                  'group flex h-full flex-col items-start gap-6 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                  cat.color,
                )}
              >
                <span className="grid size-12 place-items-center rounded-xl bg-white/70 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-serif text-lg font-semibold">{cat.name}</span>
                  <span className="text-sm opacity-70">
                    {count} {count === 1 ? 'title' : 'titles'}
                  </span>
                </span>
              </Link>
            </Reveal>
          )
        })}
        <Reveal delay={categories.length * 50}>
          <Link
            href="/shop"
            className="group flex h-full flex-col items-start justify-between gap-6 rounded-2xl bg-foreground p-5 text-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="font-serif text-lg font-semibold">View all genres</span>
            <span className="text-sm text-gold transition group-hover:translate-x-1">Explore →</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
