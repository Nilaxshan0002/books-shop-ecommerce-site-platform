'use client'

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'

const inputClass = 'rounded-xl border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'

export function ContactForm() {
  const [sending, setSending] = useState(false)

  return (
    <form
      className="flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-sm sm:p-8"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        setSending(true)
        setTimeout(() => {
          setSending(false)
          form.reset()
          toast.success('Message sent!', { description: 'A bookseller will reply within one business day.' })
        }, 1000)
      }}
    >
      <h2 className="font-serif text-2xl font-semibold">Send us a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Name</span>
          <input name="name" required autoComplete="name" className={`h-11 ${inputClass}`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Email</span>
          <input name="email" type="email" required autoComplete="email" className={`h-11 ${inputClass}`} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Topic</span>
        <select name="topic" className={`h-11 ${inputClass}`}>
          <option>Order question</option>
          <option>Book recommendation</option>
          <option>Special order</option>
          <option>Events</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Message</span>
        <textarea name="message" required rows={6} className={`p-4 ${inputClass}`} />
      </label>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
      >
        {sending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
