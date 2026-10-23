import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { ContactForm } from '@/components/contact-form'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = { title: 'Contact us', description: 'Questions about an order or a recommendation? We’re here to help.' }

const info = [
  { icon: MapPin, title: 'Visit', text: '214 Maple Street, Portland, OR 97205' },
  { icon: Phone, title: 'Call', text: '(503) 555-0148' },
  { icon: Mail, title: 'Email', text: 'hello@inkwellbooks.com' },
  { icon: Clock, title: 'Hours', text: 'Mon–Sat 9am–8pm · Sun 10am–6pm' },
]

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 4–6 business days. Express arrives in 1–2 business days. Orders over $35 ship free.' },
  { q: 'Can I return a book?', a: 'Yes — return any book in its original condition within 30 days for a full refund, no questions asked.' },
  { q: 'Do you offer gift wrapping?', a: 'Every order can be gift-wrapped in our signature recycled paper with a handwritten note, free of charge.' },
  { q: 'Can you order a book you don’t stock?', a: 'Absolutely. Send us the title or ISBN and we’ll special-order it, usually within a week.' },
  { q: 'Do you host events?', a: 'We host author talks, book clubs and kids’ story hours every week. Join our newsletter for the calendar.' },
]

export default function ContactPage() {
  return (
    <>
      <PageBanner eyebrow="Get in touch" title="We'd love to hear from you" crumbs={[{ href: '/', label: 'Home' }, { label: 'Contact' }]} />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {info.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border bg-card p-5 transition hover:border-primary/40 hover:shadow-md">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-serif text-lg font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </section>
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-28 px-4 py-16">
        <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
        <h2 className="mb-8 text-center text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
        <Accordion className="rounded-2xl border bg-card px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}
