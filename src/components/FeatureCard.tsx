type Props = {
  icon: string
  title: string
  desc: string
}

export default function FeatureCard({ icon, title, desc }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-2xl mb-3">{icon}</div>
        <h3 className="text-slate-100 font-semibold">{title}</h3>
        <p className="text-slate-400 text-sm mt-1">{desc}</p>
      </div>
    </div>
  )
}
