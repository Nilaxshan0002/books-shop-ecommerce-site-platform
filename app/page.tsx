import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { BookTabs } from '@/components/home/book-tabs'
import { DealOfTheDay } from '@/components/home/deal-of-the-day'
import { StatsBand } from '@/components/home/stats-band'
import { FeaturedAuthors } from '@/components/home/featured-authors'
import { Testimonials } from '@/components/home/testimonials'
import { NewsletterCta, PromoBanners } from '@/components/home/promo-banners'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <CategoryGrid />
      <BookTabs />
      <DealOfTheDay />
      <PromoBanners />
      <FeaturedAuthors />
      <Testimonials />
      <NewsletterCta />
    </>
  )
}
