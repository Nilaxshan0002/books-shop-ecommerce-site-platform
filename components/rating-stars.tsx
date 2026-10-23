import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RatingStars({ rating, className, size = 'size-4' }: { rating: number; className?: string; size?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className={cn('relative inline-block', size)}>
            <Star className={cn('absolute inset-0 text-gold/30', size)} fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={cn('text-gold', size)} fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        )
      })}
    </div>
  )
}
