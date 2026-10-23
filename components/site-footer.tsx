import Link from 'next/link'
import { BookOpen, CreditCard, Mail, MapPin, Phone, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { NewsletterForm } from '@/components/newsletter-form'

const perks = [
  { icon: Truck, title: 'Free shipping', text: 'On all orders over $35' },
  { icon: RotateCcw, title: '30-day returns', text: 'No questions asked' },
  { icon: ShieldCheck, title: 'Secure checkout', text: '256-bit encryption' },
  { icon: CreditCard, title: 'Flexible payment', text: 'Cards, wallets & more' },
]

const columns = [
  {
    title: 'Shop',
    links: [
      { href: '/shop', label: 'All books' },
      { href: '/shop?tag=bestseller', label: 'Bestsellers' },
      { href: '/shop?tag=new', label: 'New releases' },
      { href: '/shop?tag=sale', label: 'On sale' },
    ],
  },
  {
    title: 'Genres',
    links: [
      { href: '/shop?category=Fiction', label: 'Fiction' },
      { href: '/shop?category=Fantasy', label: 'Fantasy' },
      { href: '/shop?category=Mystery', label: 'Mystery' },
      { href: '/shop?category=Kids', label: 'Kids' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'Our story' },
      { href: '/contact', label: 'Contact us' },
      { href: '/contact#faq', label: 'FAQ' },
      { href: '/wishlist', label: 'Wishlist' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="border-b border-background/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-background/10 text-gold">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-background/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.4fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
              <BookOpen className="size-5" aria-hidden />
            </span>
            <span className="font-serif text-2xl font-semibold">Inkwell</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-background/60">
            An independent bookshop for curious minds. Hand-picked stories, shipped with care since 2012.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-background/70">
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> 214 Maple Street, Portland, OR
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden /> (503) 555-0148
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden /> hello@inkwellbooks.com
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-gold">{col.title}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-background/70 transition hover:pl-1 hover:text-background">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="mb-2 font-serif text-xl">Join the reading circle</h2>
          <p className="mb-4 text-sm text-background/60">Monthly picks, author events and members-only deals.</p>
          <NewsletterForm variant="dark" />
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-background/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Inkwell Books. All rights reserved.</p>
          <p>Made for readers, by readers.</p>
        </div>
      </div>
    </footer>
  )
}
