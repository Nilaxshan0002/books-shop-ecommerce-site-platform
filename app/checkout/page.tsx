import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { CheckoutView } from '@/components/cart/checkout-view'

export const metadata: Metadata = { title: 'Checkout' }

export default function CheckoutPage() {
  return (
    <>
      <PageBanner eyebrow="Almost there" title="Checkout" crumbs={[{ href: '/', label: 'Home' }, { href: '/cart', label: 'Bag' }, { label: 'Checkout' }]} />
      <CheckoutView />
    </>
  )
}
