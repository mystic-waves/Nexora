import { useMemo, useState } from 'react'
import Select, { type Option } from '../components/Select'

type CollegeItem = {
  name: string
  city: string
  state: string
  type: 'Private' | 'Public'
  rating: number
  district: string
  stream: 'Engineering' | 'Arts & Science'
}

const mockColleges: CollegeItem[] = [
  { name: 'K.S.R. Institute for Engineering and Technology', city: 'Tiruchengode', state: 'Tamil Nadu', type: 'Private', rating: 4.1, district: 'Namakkal', stream: 'Engineering' },
  { name: 'Mahendra Engineering College', city: 'Tiruchengode', state: 'Tamil Nadu', type: 'Private', rating: 3.9, district: 'Namakkal', stream: 'Engineering' },
  { name: 'Muthayammal Engineering College', city: 'Rasipuram', state: 'Tamil Nadu', type: 'Private', rating: 4.0, district: 'Namakkal', stream: 'Engineering' },
  { name: 'Government College of Engineering, Salem', city: 'Salem', state: 'Tamil Nadu', type: 'Public', rating: 4.2, district: 'Salem', stream: 'Engineering' },
  { name: 'University of Kashmir', city: 'Srinagar', state: 'Jammu & Kashmir', type: 'Public', rating: 4.3, district: 'Srinagar', stream: 'Arts & Science' },
  { name: 'University of Jammu', city: 'Jammu', state: 'Jammu & Kashmir', type: 'Public', rating: 4.2, district: 'Jammu', stream: 'Arts & Science' },
  { name: 'Islamic University of Science and Technology (IUST)', city: 'Awantipora', state: 'Jammu & Kashmir', type: 'Public', rating: 4.1, district: 'Pulwama', stream: 'Engineering' },
  { name: 'Sher-e-Kashmir University of Agricultural Sciences and Technology', city: 'Ganderbal', state: 'Jammu & Kashmir', type: 'Public', rating: 4.0, district: 'Ganderbal', stream: 'Arts & Science' },
  { name: 'Government Degree College Anantnag', city: 'Anantnag', state: 'Jammu & Kashmir', type: 'Public', rating: 3.8, district: 'Anantnag', stream: 'Arts & Science' },
]

export default function Colleges() {
  const [query, setQuery] = useState('')
  const [selectedStream, setSelectedStream] = useState<'All Streams' | 'Engineering' | 'Arts & Science'>('All Streams')
  const [selectedType, setSelectedType] = useState<'All Types' | 'Private' | 'Public'>('All Types')
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts (Jammu & Kashmir)')

  const streamOptions: Option[] = [
    { label: 'All Streams', value: 'All Streams' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Arts & Science', value: 'Arts & Science' },
  ]
  const typeOptions: Option[] = [
    { label: 'All Types', value: 'All Types' },
    { label: 'Private', value: 'Private' },
    { label: 'Public', value: 'Public' },
  ]
  const districtOptions: Option[] = [
    { label: 'All Districts (Jammu & Kashmir)', value: 'All Districts (Jammu & Kashmir)' },
    { label: 'Anantnag', value: 'Anantnag' },
    { label: 'Bandipora', value: 'Bandipora' },
    { label: 'Baramulla', value: 'Baramulla' },
    { label: 'Budgam', value: 'Budgam' },
    { label: 'Doda', value: 'Doda' },
    { label: 'Ganderbal', value: 'Ganderbal' },
    { label: 'Jammu', value: 'Jammu' },
    { label: 'Kathua', value: 'Kathua' },
    { label: 'Kishtwar', value: 'Kishtwar' },
    { label: 'Kulgam', value: 'Kulgam' },
    { label: 'Kupwara', value: 'Kupwara' },
    { label: 'Poonch', value: 'Poonch' },
    { label: 'Pulwama', value: 'Pulwama' },
    { label: 'Rajouri', value: 'Rajouri' },
    { label: 'Ramban', value: 'Ramban' },
    { label: 'Reasi', value: 'Reasi' },
    { label: 'Samba', value: 'Samba' },
    { label: 'Shopian', value: 'Shopian' },
    { label: 'Srinagar', value: 'Srinagar' },
    { label: 'Udhampur', value: 'Udhampur' },
  ]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return mockColleges.filter((c) => {
      const matchesQuery = q ? [c.name, c.city, c.state, c.district].some((v) => v.toLowerCase().includes(q)) : true
      const matchesStream = selectedStream === 'All Streams' ? true : c.stream === selectedStream
      const matchesType = selectedType === 'All Types' ? true : c.type === selectedType
      const matchesDistrict = selectedDistrict === 'All Districts (Jammu & Kashmir)'
        ? true
        : c.state === 'Jammu & Kashmir' && c.district === selectedDistrict
      return matchesQuery && matchesStream && matchesType && matchesDistrict
    })
  }, [query, selectedStream, selectedType, selectedDistrict])

  const count = filtered.length
  return (
    <section className="container-base py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">College Directory</h1>
        <p className="mt-2 text-slate-300">Discover colleges and universities that match your academic goals and preferences.</p>
      </div>

      {/* Filters bar */}
      <div className="mt-8 card">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 rounded-md border border-slate-700/70 bg-slate-900/60 px-3 py-2 focus-within:ring-2 focus-within:ring-violet-500/40 focus-within:border-violet-500/60">
                <span className="text-slate-400">🔎</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/60"
                  placeholder="Search colleges, courses, or locations..."
                />
            </div>
               <div className="text-xs text-slate-400 mt-2">Found {count} colleges</div>
            </div>
            <Select
              className="min-w-[180px]"
              value={selectedStream}
              onChange={(v) => setSelectedStream(v as any)}
              options={streamOptions}
            />
            <Select
              className="min-w-[160px]"
              value={selectedType}
              onChange={(v) => setSelectedType(v as any)}
              options={typeOptions}
            />
            <Select
              className="min-w-[240px]"
              value={selectedDistrict}
              onChange={(v) => setSelectedDistrict(v)}
              options={districtOptions}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-200">Colleges ({count})</h3>
            </div>
            <div className="divide-y divide-slate-800 max-h-[480px] overflow-auto pr-1">
              {filtered.map((c) => (
                <button key={c.name} className="w-full text-left py-3 flex flex-col gap-1 hover:bg-white/5 px-2 rounded">
                  <div className="flex items-center justify-between">
                    <div className="text-slate-100 font-medium">{c.name}</div>
                    <div className="text-amber-300 text-sm">★ {c.rating.toFixed(1)}</div>
                  </div>
                  <div className="text-slate-400 text-sm">{c.city}, {c.state} · {c.district}</div>
                  <span className="inline-flex w-fit rounded bg-slate-800 text-slate-200 text-xs px-2 py-0.5">{c.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Right detail placeholder */}
        <div className="card">
          <div className="card-body min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-3">👥</div>
            <h3 className="text-slate-200 font-semibold">Select a College</h3>
            <p className="text-slate-400 mt-1">Choose a college from the list to view detailed information about admissions, courses, and facilities.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
