import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { NewsletterForm } from '@/components/newsletter-form'

export function PromoBanners() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2">
      <Reveal>
        <Link
          href="/shop?category=Kids"
          className="group relative flex h-72 overflow-hidden rounded-3xl bg-[oklch(0.9_0.08_85)] p-8"
        >
          <div className="relative z-10 flex max-w-[55%] flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">For little readers</p>
              <h3 className="mt-2 text-3xl font-semibold">Kids&apos; Corner</h3>
              <p className="mt-2 text-sm text-foreground/70">Picture books and bedtime stories they&apos;ll ask for again.</p>
            </div>
            <span className="inline-flex items-center gap-1 font-medium">
              Shop kids <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
          <div className="absolute -bottom-6 right-6 aspect-[2/3] w-40 rotate-6 overflow-hidden rounded-lg shadow-2xl transition duration-500 group-hover:-translate-y-3 group-hover:rotate-3">
            <Image src="/books/little-fox-big-sky.png" alt="" fill sizes="160px" className="object-cover" />
          </div>
        </Link>
      </Reveal>
      <Reveal delay={120}>
        <Link
          href="/shop?category=Cooking"
          className="group relative flex h-72 overflow-hidden rounded-3xl bg-[oklch(0.88_0.06_30)] p-8"
        >
          <div className="relative z-10 flex max-w-[55%] flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Fresh from the kitchen</p>
              <h3 className="mt-2 text-3xl font-semibold">Cookbooks</h3>
              <p className="mt-2 text-sm text-foreground/70">Seasonal recipes from the world&apos;s best home cooks.</p>
            </div>
            <span className="inline-flex items-center gap-1 font-medium">
              Get cooking <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
          <div className="absolute -bottom-6 right-6 aspect-[2/3] w-40 -rotate-6 overflow-hidden rounded-lg shadow-2xl transition duration-500 group-hover:-translate-y-3 group-hover:-rotate-3">
            <Image src="/books/the-cooking-almanac.png" alt="" fill sizes="160px" className="object-cover" />
          </div>
        </Link>
      </Reveal>
    </section>
  )
}

export function NewsletterCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border bg-card p-10 text-center sm:p-16">
          <div className="absolute -left-16 -top-16 size-64 rounded-full bg-accent/15 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 -right-16 size-64 rounded-full bg-primary/15 blur-3xl" aria-hidden />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Newsletter</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Get 15% off your first order</h2>
            <p className="text-muted-foreground">
              Join 40,000 readers getting our monthly staff picks, early access to signed editions, and exclusive author events.
            </p>
            <div className="mt-2 w-full max-w-md">
              <NewsletterForm />
            </div>
            <p className="text-xs text-muted-foreground">No spam, ever. Unsubscribe in one click.</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
