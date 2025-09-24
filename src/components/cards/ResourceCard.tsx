type Props = {
  title: string
  type: 'Article' | 'Video' | 'Guide'
  description: string
}

export default function ResourceCard({ title, type, description }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-xs text-slate-400">{type}</div>
        <h3 className="font-semibold text-lg mt-1 text-slate-100">{title}</h3>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
        <button className="mt-4 btn-primary w-full">Read</button>
      </div>
    </div>
  )
}
