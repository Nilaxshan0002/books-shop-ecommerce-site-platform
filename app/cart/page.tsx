import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { CartView } from '@/components/cart/cart-view'

export const metadata: Metadata = { title: 'Your bag' }

export default function CartPage() {
  return (
    <>
      <PageBanner eyebrow="Checkout" title="Your shopping bag" crumbs={[{ href: '/', label: 'Home' }, { label: 'Bag' }]} />
      <CartView />
    </>
  )
}
