import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { books, getBook, relatedBooks } from '@/lib/books'
import { PageBanner } from '@/components/page-banner'
import { BookDetail } from '@/components/book/book-detail'
import { BookCard } from '@/components/book-card'
import { SectionHeading } from '@/components/home/section-heading'

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) return { title: 'Book not found' }
  return { title: `${book.title} by ${book.author}`, description: book.description }
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) notFound()

  return (
    <>
      <PageBanner
        eyebrow={book.category}
        title={book.title}
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/shop', label: 'Shop' },
          { href: `/shop?category=${encodeURIComponent(book.category)}`, label: book.category },
          { label: book.title },
        ]}
      />
      <BookDetail book={book} />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading eyebrow="Keep reading" title="You might also like" href="/shop" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4">
          {relatedBooks(book).map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </section>
    </>
  )
}
