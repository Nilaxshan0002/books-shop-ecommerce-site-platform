'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { buttonVariants } from '@/components/ui/button'
import { useStore } from '@/components/store-provider'
import { QuantityStepper } from '@/components/quantity-stepper'
import { FreeShippingProgress } from '@/components/free-shipping-progress'
import { coverFor, formatPrice } from '@/lib/books'
import { cn } from '@/lib/utils'

export function CartSheet() {
  const { cartOpen, setCartOpen, lines, subtotal, itemCount, updateQuantity, removeFromCart } = useStore()

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle className="font-serif text-2xl">Your bag</SheetTitle>
          <SheetDescription>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid size-20 animate-float place-items-center rounded-full bg-muted">
              <ShoppingBag className="size-9 text-muted-foreground" aria-hidden />
            </div>
            <p className="font-serif text-xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Every great story starts with a single page.</p>
            <Link
              href="/shop"
              onClick={() => setCartOpen(false)}
              className={cn(buttonVariants(), 'h-11 rounded-full px-6')}
            >
              Browse books
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b p-4">
              <FreeShippingProgress subtotal={subtotal} />
            </div>
            <ul className="flex-1 divide-y overflow-y-auto px-4">
              {lines.map(({ book, quantity }) => (
                <li key={book.slug} className="flex gap-4 py-4 animate-in fade-in slide-in-from-right-4">
                  <Link
                    href={`/books/${book.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-md shadow"
                  >
                    <Image src={coverFor(book.slug) || '/placeholder.svg'} alt={book.title} fill sizes="64px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{book.title}</p>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(book.slug)}
                        aria-label={`Remove ${book.title}`}
                        className="text-muted-foreground transition hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        value={quantity}
                        max={Math.min(10, book.stock)}
                        onChange={(q) => updateQuantity(book.slug, q)}
                        size="sm"
                      />
                      <span className="font-semibold">{formatPrice(book.price * quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <SheetFooter className="border-t bg-muted/40">
              <div className="flex items-center justify-between text-base">
                <span>Subtotal</span>
                <span className="font-serif text-xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping, taxes and discounts calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className={cn(buttonVariants(), 'h-11 rounded-full text-base')}
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={() => setCartOpen(false)}
                className={cn(buttonVariants({ variant: 'outline' }), 'h-11 rounded-full text-base')}
              >
                View full bag
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
