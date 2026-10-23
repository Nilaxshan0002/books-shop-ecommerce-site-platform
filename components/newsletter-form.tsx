'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function NewsletterForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const id = `newsletter-${variant}`

  return (
    <form
      className="flex w-full gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          toast.error('Please enter a valid email address')
          return
        }
        setDone(true)
        setEmail('')
        toast.success('Welcome to the reading circle!', { description: 'Check your inbox for a 15% welcome code.' })
      }}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setDone(false)
        }}
        placeholder="you@example.com"
        className={cn(
          'h-11 min-w-0 flex-1 rounded-full px-4 text-sm outline-none transition focus:ring-2',
          variant === 'dark'
            ? 'border border-background/20 bg-background/10 text-background placeholder:text-background/40 focus:ring-gold/50'
            : 'border border-border bg-card text-foreground focus:ring-primary/30',
        )}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid h-11 shrink-0 place-items-center rounded-full bg-accent px-4 text-accent-foreground transition hover:scale-105 hover:bg-accent/90"
      >
        {done ? <Check className="size-5" /> : <ArrowRight className="size-5" />}
      </button>
    </form>
  )
}
