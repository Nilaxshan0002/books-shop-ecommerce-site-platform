import Image from 'next/image'
import Link from 'next/link'
import { authors } from '@/lib/books'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/home/section-heading'

export function FeaturedAuthors() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Spotlight" title="Authors we love" description="Meet the voices shaping this season's shelves." />
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {authors.map((a, i) => (
          <Reveal key={a.name} delay={i * 100}>
            <Link
              href={`/shop?q=${encodeURIComponent(a.name)}`}
              className="group flex flex-col items-center rounded-2xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="relative mb-4 size-28 overflow-hidden rounded-full ring-4 ring-secondary transition group-hover:ring-accent/40">
                <Image src={a.image || '/placeholder.svg'} alt="" fill sizes="112px" className="object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <p className="font-serif text-lg font-semibold">{a.name}</p>
              <p className="text-sm text-muted-foreground">{a.genre}</p>
              <p className="mt-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium">{a.books} books</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
