import type { Metadata } from 'next'
import { ShopView } from '@/components/shop/shop-view'
import { PageBanner } from '@/components/page-banner'

export const metadata: Metadata = {
  title: 'Shop all books',
  description: 'Browse bestsellers, new releases and staff picks across every genre.',
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string; q?: string }>
}) {
  const { category = '', tag = '', q = '' } = await searchParams
  return (
    <>
      <PageBanner
        eyebrow="The shop"
        title={category || (tag ? `${tag.charAt(0).toUpperCase()}${tag.slice(1)}` : 'All books')}
        crumbs={[{ href: '/', label: 'Home' }, { label: 'Shop' }]}
      />
      <ShopView key={`${category}-${tag}-${q}`} initialCategory={category} initialTag={tag} initialQuery={q} />
    </>
  )
}
