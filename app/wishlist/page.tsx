import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { WishlistView } from '@/components/wishlist-view'

export const metadata: Metadata = { title: 'Wishlist' }

export default function WishlistPage() {
  return (
    <>
      <PageBanner eyebrow="Saved for later" title="Your wishlist" crumbs={[{ href: '/', label: 'Home' }, { label: 'Wishlist' }]} />
      <WishlistView />
    </>
  )
}
