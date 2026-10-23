import Link from 'next/link'
import { BookX } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-28 text-center">
      <span className="grid size-20 animate-float place-items-center rounded-full bg-accent/10 text-accent">
        <BookX className="size-9" aria-hidden />
      </span>
      <p className="font-serif text-7xl font-semibold text-primary">404</p>
      <h1 className="text-3xl font-semibold">This page is missing from our shelves</h1>
      <p className="text-muted-foreground">It may have been borrowed and never returned. Let&apos;s get you back to the stacks.</p>
      <Link href="/shop" className="mt-2 inline-flex h-12 items-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition hover:bg-primary/90">
        Browse the shop
      </Link>
    </section>
  )
}
