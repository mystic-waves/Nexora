type Props = {
  title: string
  salary: string
  growth: string
  skills: string[]
}

export default function CareerCard({ title, salary, growth, skills }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="font-semibold text-lg text-slate-100">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">Salary: {salary} · Growth: {growth}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="text-xs rounded bg-slate-800 px-2 py-1 text-slate-200">{s}</span>
          ))}
        </div>
        <button className="mt-4 btn-primary w-full">View Details</button>
      </div>
    </div>
  )
}
