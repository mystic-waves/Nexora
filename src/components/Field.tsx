import React from 'react'

type Props = {
  label: string
  hint?: string
  children: React.ReactNode
}

export default function Field({ label, hint, children }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm text-slate-300">{label}</label>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      <div className="mt-1">
        {children}
      </div>
    </div>
  )
}
