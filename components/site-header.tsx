'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BookOpen, Heart, Menu, Search, ShoppingBag, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useStore } from '@/components/store-provider'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?tag=bestseller', label: 'Bestsellers' },
  { href: '/shop?tag=new', label: 'New Releases' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function SearchForm({ className, onDone }: { className?: string; onDone?: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  return (
    <form
      role="search"
      className={cn('relative', className)}
      onSubmit={(e) => {
        e.preventDefault()
        router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop')
        onDone?.()
      }}
    >
      <label htmlFor="site-search" className="sr-only">
        Search books
      </label>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search titles, authors…"
        className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </form>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const { itemCount, wishlist, setCartOpen } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bump, setBump] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (itemCount === 0) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 400)
    return () => clearTimeout(t)
  }, [itemCount])

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-xs font-medium sm:text-sm">
          <Truck className="size-4" aria-hidden />
          <span>
            Free shipping on orders over $35 · Use code <strong className="text-gold">READ10</strong> for 10% off
          </span>
        </div>
      </div>
      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-300',
          scrolled ? 'border-border bg-background/85 shadow-sm backdrop-blur-md' : 'border-transparent bg-background',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-20">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Inkwell Books</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                <SearchForm className="mb-4" onDone={() => setMenuOpen(false)} />
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium transition hover:bg-muted"
                >
                  Wishlist ({wishlist.length})
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="group flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
              <BookOpen className="size-5" aria-hidden />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">Inkwell</span>
          </Link>

          <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname === item.href.split('?')[0] && !item.href.includes('?')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary',
                    'after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100',
                    active && 'text-primary after:scale-x-100',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <SearchForm className="hidden w-64 md:block" />
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative grid size-10 place-items-center rounded-full transition hover:bg-muted"
            >
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${itemCount} items`}
              className="relative grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-105 hover:bg-primary/90"
            >
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span
                  className={cn(
                    'absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background',
                    bump && 'animate-pop',
                  )}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
