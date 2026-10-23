'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  books,
  coupons,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  TAX_RATE,
  type Book,
} from '@/lib/books'

export type CartLine = { book: Book; quantity: number }

type StoreContextValue = {
  lines: CartLine[]
  wishlist: Book[]
  itemCount: number
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  coupon: string | null
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (slug: string, quantity?: number) => void
  updateQuantity: (slug: string, quantity: number) => void
  removeFromCart: (slug: string) => void
  clearCart: () => void
  toggleWishlist: (slug: string) => void
  isWishlisted: (slug: string) => boolean
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

const MAX_QUANTITY = 10

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([])
  const [coupon, setCoupon] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(quantities)
        .map(([slug, quantity]) => {
          const book = books.find((b) => b.slug === slug)
          return book ? { book, quantity } : null
        })
        .filter((l): l is CartLine => l !== null),
    [quantities],
  )

  const wishlist = useMemo(
    () => wishlistSlugs.map((s) => books.find((b) => b.slug === s)).filter((b): b is Book => !!b),
    [wishlistSlugs],
  )

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0)
  const subtotal = lines.reduce((sum, l) => sum + l.book.price * l.quantity, 0)
  const discount = coupon ? subtotal * (coupons[coupon] ?? 0) : 0
  const afterDiscount = subtotal - discount
  const shipping = lines.length === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const tax = afterDiscount * TAX_RATE
  const total = afterDiscount + shipping + tax

  const addToCart = useCallback((slug: string, quantity = 1) => {
    const book = books.find((b) => b.slug === slug)
    if (!book) return
    setQuantities((prev) => {
      const next = Math.min((prev[slug] ?? 0) + quantity, MAX_QUANTITY, book.stock)
      return { ...prev, [slug]: next }
    })
    toast.success(`${book.title} added to your bag`, {
      description: `by ${book.author}`,
      action: { label: 'View bag', onClick: () => setCartOpen(true) },
    })
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    const book = books.find((b) => b.slug === slug)
    if (!book) return
    setQuantities((prev) => {
      if (quantity <= 0) {
        const { [slug]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [slug]: Math.min(Math.floor(quantity), MAX_QUANTITY, book.stock) }
    })
  }, [])

  const removeFromCart = useCallback((slug: string) => {
    setQuantities((prev) => {
      const { [slug]: _removed, ...rest } = prev
      return rest
    })
  }, [])

  const clearCart = useCallback(() => {
    setQuantities({})
    setCoupon(null)
  }, [])

  const toggleWishlist = useCallback((slug: string) => {
    const book = books.find((b) => b.slug === slug)
    const exists = wishlistSlugs.includes(slug)
    setWishlistSlugs((prev) =>
      exists ? prev.filter((s) => s !== slug) : [...prev.filter((s) => s !== slug), slug],
    )
    if (exists) toast('Removed from wishlist', { description: book?.title })
    else toast.success('Saved to wishlist', { description: book?.title })
  }, [wishlistSlugs])

  const isWishlisted = useCallback((slug: string) => wishlistSlugs.includes(slug), [wishlistSlugs])

  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase()
    if (normalized in coupons) {
      setCoupon(normalized)
      toast.success(`Coupon ${normalized} applied`, {
        description: `${Math.round(coupons[normalized] * 100)}% off your order`,
      })
      return true
    }
    toast.error('Invalid coupon code')
    return false
  }, [])

  const removeCoupon = useCallback(() => setCoupon(null), [])

  const value: StoreContextValue = {
    lines,
    wishlist,
    itemCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    coupon,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
    applyCoupon,
    removeCoupon,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
