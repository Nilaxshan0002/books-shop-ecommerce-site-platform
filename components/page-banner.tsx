import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function PageBanner({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string
  title: string
  description?: string
  crumbs: { href?: string; label: string }[]
}) {
  return (
    <section className="relative overflow-hidden border-b bg-secondary/50">
      <div className="absolute -right-20 -top-24 size-72 rounded-full bg-accent/15 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 left-10 size-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-foreground">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
    </section>
  )
}
