import type { Metadata } from 'next'
import Image from 'next/image'
import { BookHeart, Coffee, Leaf, Users } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { Reveal } from '@/components/reveal'
import { StatsBand } from '@/components/home/stats-band'

export const metadata: Metadata = { title: 'Our story', description: 'An independent bookshop in Portland since 2012.' }

const values = [
  { icon: BookHeart, title: 'Hand-picked', text: 'Every title on our shelves is read and recommended by a real bookseller.' },
  { icon: Users, title: 'Community first', text: 'Weekly author talks, book clubs and kids’ story hours — free for all.' },
  { icon: Leaf, title: 'Planet friendly', text: 'Plastic-free packaging and carbon-neutral shipping on every order.' },
  { icon: Coffee, title: 'Stay a while', text: 'Our café corner serves coffee, tea and the best cardamom buns in town.' },
]

const timeline = [
  { year: '2012', text: 'Opened a tiny 400 sq ft shop on Maple Street with 2,000 books.' },
  { year: '2016', text: 'Moved to our current home and launched the Inkwell Reading Circle.' },
  { year: '2020', text: 'Went online, shipping to readers across all 50 states.' },
  { year: '2026', text: '120,000+ readers, 50,000 titles and still independently owned.' },
]

export default function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="About us" title="A bookshop for curious minds" crumbs={[{ href: '/', label: 'Home' }, { label: 'About' }]} />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
            <Image src="/images/about-store.png" alt="Inside the Inkwell bookshop with wooden shelves and warm lights" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-semibold sm:text-4xl">Stories have always been our business</h2>
            <p className="leading-relaxed text-muted-foreground">
              Inkwell began with a simple belief: the right book at the right time can change a life. What started as a small corner shop has grown into a beloved community hub — and now an online store
              serving readers everywhere.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              We&apos;re still independently owned, still opinionated about our recommendations, and still wrap every order by hand.
            </p>
            <ol className="mt-4 flex flex-col gap-4 border-l-2 border-accent/30 pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[31px] top-1 size-3 rounded-full bg-accent ring-4 ring-background" aria-hidden />
                  <p className="font-serif text-lg font-semibold text-primary">{t.year}</p>
                  <p className="text-sm text-muted-foreground">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>
      <StatsBand />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-semibold sm:text-4xl">What we stand for</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
                <span className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
