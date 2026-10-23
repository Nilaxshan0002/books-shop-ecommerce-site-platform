import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const floating = [
  { slug: 'kingdom-of-ash', className: 'left-0 top-10 w-36 -rotate-6 sm:w-44', delay: '0s' },
  { slug: 'the-midnight-garden', className: 'left-1/2 top-0 z-10 w-44 -translate-x-1/2 sm:w-56', delay: '1.2s' },
  { slug: 'the-last-algorithm', className: 'right-0 top-16 w-36 rotate-6 sm:w-44', delay: '2.4s' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/hero-reading.png" alt="" fill priority sizes="100vw" className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute -left-32 top-20 size-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles className="size-4" aria-hidden />
            Autumn Reading Festival — up to 30% off
          </span>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find the book that <em className="relative not-italic text-primary">
              finds you
              <svg className="absolute -bottom-2 left-0 w-full text-accent" viewBox="0 0 200 12" fill="none" aria-hidden>
                <path d="M2 9c40-6 120-8 196-2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </em>
            .
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Over 50,000 hand-picked titles, from chart-topping bestsellers to hidden gems chosen by our booksellers. Delivered to your door, wrapped with care.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className={cn(buttonVariants(), 'group h-12 rounded-full px-7 text-base')}>
              Shop now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/shop?tag=bestseller"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-12 rounded-full px-7 text-base')}
            >
              Explore bestsellers
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['bg-accent', 'bg-primary', 'bg-gold', 'bg-secondary-foreground'].map((c, i) => (
                <span
                  key={c}
                  className={cn('grid size-10 place-items-center rounded-full border-2 border-background text-xs font-bold text-primary-foreground', c)}
                >
                  {['AJ', 'DK', 'PS', 'LM'][i]}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} aria-hidden />
                ))}
                <span className="ml-1 text-sm font-semibold text-foreground">4.9</span>
              </div>
              <p className="text-sm text-muted-foreground">Loved by 120,000+ readers</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-lg sm:h-[460px]">
          <div className="absolute inset-x-8 bottom-0 h-16 rounded-[50%] bg-foreground/10 blur-2xl" aria-hidden />
          {floating.map((b) => (
            <Link
              key={b.slug}
              href={`/books/${b.slug}`}
              className={cn('absolute block aspect-[2/3] animate-float overflow-hidden rounded-lg shadow-2xl shadow-foreground/30 transition hover:scale-105', b.className)}
              style={{ animationDelay: b.delay }}
            >
              <Image src={`/books/${b.slug}.png`} alt={`Featured book`} fill sizes="224px" className="object-cover" priority />
            </Link>
          ))}
          <div className="absolute bottom-6 left-2 z-20 rounded-2xl border bg-card/95 p-4 shadow-xl backdrop-blur animate-in fade-in zoom-in-90 duration-1000 sm:left-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Book of the month</p>
            <p className="font-serif text-lg font-semibold">The Midnight Garden</p>
          </div>
          <div className="absolute bottom-20 right-2 z-20 grid size-20 place-items-center rounded-full bg-accent text-center text-accent-foreground shadow-xl animate-in fade-in zoom-in-50 duration-1000 sm:right-6">
            <span className="text-xs font-bold leading-tight">
              UP TO
              <br />
              <span className="text-xl">30%</span>
              <br />
              OFF
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
