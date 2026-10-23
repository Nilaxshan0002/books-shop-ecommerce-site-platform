import { Quote } from 'lucide-react'
import { testimonials } from '@/lib/books'
import { RatingStars } from '@/components/rating-stars'

export function Testimonials() {
  const loop = [...testimonials, ...testimonials]
  return (
    <section className="overflow-hidden py-16">
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Kind words</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Readers say it best</h2>
      </div>
      <div className="group relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= testimonials.length}
              className="flex w-80 shrink-0 flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:w-96"
            >
              <Quote className="size-8 text-accent/40" aria-hidden />
              <p className="leading-relaxed">{t.quote}</p>
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <RatingStars rating={5} size="size-3.5" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
