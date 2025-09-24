import CareerCard from '../components/cards/CareerCard'
import { popularCareers } from '../placeholderData.ts'
import type { Career } from '../placeholderData.ts'

export default function DiscoverCareer() {
  return (
    <section className="container-base py-10">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="section-title text-slate-100">Discover Careers</h1>
          <p className="text-slate-400 mt-1">Filter by skills, interests, salary, and growth.</p>
        </div>
        <div className="flex gap-2">
          <input className="rounded-md border border-slate-700/70 bg-white/5 text-slate-200 placeholder:text-slate-400 px-3 py-2 w-48" placeholder="Skills" />
          <input className="rounded-md border border-slate-700/70 bg-white/5 text-slate-200 placeholder:text-slate-400 px-3 py-2 w-48" placeholder="Interests" />
          <select className="rounded-md border border-slate-700/70 bg-white/5 text-slate-200 px-3 py-2">
            <option>Salary</option>
            <option>40k+</option>
            <option>60k+</option>
          </select>
          <select className="rounded-md border border-slate-700/70 bg-white/5 text-slate-200 px-3 py-2">
            <option>Growth</option>
            <option>High</option>
            <option>Medium</option>
          </select>
        </div>
      </header>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCareers.map((c: Career) => (
          <CareerCard key={c.title} title={c.title} salary={c.salary} growth={c.growth} skills={c.skills} />
        ))}
      </div>
    </section>
  )
}
