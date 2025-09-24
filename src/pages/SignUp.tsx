import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'

export default function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState<number | ''>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [level, setLevel] = useState<'10' | '11' | '12' | ''>('')
  const [stream, setStream] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const needsStream = useMemo(() => level === '11' || level === '12', [level])

  useEffect(() => {
    if (!needsStream) setStream('')
  }, [needsStream])

  const canSubmit =
    name.trim().length >= 2 &&
    !!age && age > 8 &&
    email.trim().length > 5 &&
    password.length >= 6 &&
    !!level &&
    (!needsStream || !!stream)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    // Save a minimal local profile for later use (demo only)
    const profile = { name, age, email, level, stream }
    localStorage.setItem('nx_profile', JSON.stringify(profile))
    localStorage.setItem('nx_onboarded', 'true')

    // In a real app, call Firebase Auth createUserWithEmailAndPassword + Firestore profile
    navigate('/assessments')
  }

  return (
    <section className="container-base py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="section-title text-slate-100">Create your account</h1>
        <p className="mt-2 text-slate-300">Tell us a bit about you. We’ll personalize your experience.</p>

        <form onSubmit={handleSubmit} className="mt-6 card">
          <div className="card-body space-y-5">
            <Field label="Full Name">
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
              />
            </Field>

            <Field label="Age">
              <input
                type="number"
                value={age}
                onChange={(e)=>setAge(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Enter your age"
                min={10}
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
              />
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
              />
            </Field>

            <Field label="Password" hint="Minimum 6 characters">
              <div className="flex items-center rounded-md border border-slate-700/70 bg-slate-900/60 px-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="flex-1 bg-transparent text-slate-200 py-2 outline-none"
                />
                <button type="button" onClick={()=>setShowPassword(s=>!s)} className="text-slate-400 hover:text-slate-200 px-2 py-1">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </Field>

            <Field label="Academic Level">
              <select
                value={level}
                onChange={(e)=>setLevel(e.target.value as any)}
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
              >
                <option value="">Select level</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
              </select>
            </Field>

            {needsStream && (
              <Field label="Stream">
                <select
                  value={stream}
                  onChange={(e)=>setStream(e.target.value)}
                  className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
                >
                  <option value="">Select stream</option>
                  <option>Science (Biology)</option>
                  <option>Science (Maths)</option>
                  <option>Commerce</option>
                  <option>Arts/Humanities</option>
                </select>
              </Field>
            )}

            <button disabled={!canSubmit} className={`btn-primary w-full ${!canSubmit ? 'opacity-60 cursor-not-allowed' : ''}`}>Create Account →</button>

            <div className="text-center text-sm text-slate-400">
              Already have an account? <Link to="/login" className="text-violet-400 hover:text-violet-300">Sign in here</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
