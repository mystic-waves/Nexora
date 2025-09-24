import { useEffect, useRef, useState } from 'react'

export type Option = {
  label: string
  value: string
}

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: Option[]
  className?: string
  placeholder?: string
}

export default function Select({ value, onChange, options, className = '', placeholder }: SelectProps) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (!btnRef.current || !listRef.current) return
      if (btnRef.current.contains(target)) return
      if (listRef.current.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        className="w-full inline-flex items-center justify-between rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate text-left mr-2">
          {selected?.label ?? placeholder ?? 'Select'}
        </span>
        <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-md border border-slate-700/70 bg-slate-900/95 shadow-xl"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm transition hover:bg-white/10 ${
                opt.value === value ? 'bg-white/10 text-slate-100' : 'text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
