import type { PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'

type CarouselProps = PropsWithChildren<{
  autoPlay?: boolean
  intervalMs?: number
  className?: string
  itemClassName?: string
  visibleCount?: number // used for responsive width calc when not using grid
}>

export default function Carousel({ children, autoPlay = true, intervalMs = 3500, className = '', itemClassName = '', visibleCount = 1 }: CarouselProps) {
  const items = Array.isArray(children) ? children : [children]
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  const next = () => setIndex((i) => (i + 1) % items.length)
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return
    timerRef.current && window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [autoPlay, intervalMs, items.length])

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
          aria-live={autoPlay ? 'off' : 'polite'}
        >
          {items.map((child, i) => (
            <div
              key={i}
              className={"shrink-0"}
              style={{ width: `${100 / visibleCount}%` }}
            >
              <div className={itemClassName}>{child}</div>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button aria-label="Previous" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow p-2 hover:bg-white">‹</button>
          <button aria-label="Next" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 shadow p-2 hover:bg-white">›</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${i === index ? 'bg-[var(--color-primary)]' : 'bg-slate-300'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
