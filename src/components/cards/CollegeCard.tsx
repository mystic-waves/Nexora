type Props = {
  name: string
  location: string
  fees: string
  courses: string[]
}

export default function CollegeCard({ name, location, fees, courses }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="font-semibold text-lg text-slate-100">{name}</h3>
        <p className="mt-1 text-sm text-slate-400">{location} · Fees: {fees}</p>
        <p className="mt-2 text-sm text-slate-300">Courses: {courses.join(', ')}</p>
        <button className="mt-4 btn-primary w-full">Apply Now</button>
      </div>
    </div>
  )
}
