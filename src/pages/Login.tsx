import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = email.trim().length > 5 && password.length >= 6

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    // In real app: Firebase signInWithEmailAndPassword
    localStorage.setItem('nx_onboarded', localStorage.getItem('nx_onboarded') || 'true')
    navigate('/assessments')
  }

  function handleGoogle() {
    // In real app: Firebase GoogleAuthProvider popup
    localStorage.setItem('nx_onboarded', 'true')
    navigate('/assessments')
  }

  return (
    <section className="container-base py-10">
      <div className="max-w-md mx-auto">
        <h1 className="section-title text-slate-100">Welcome back</h1>
        <p className="mt-2 text-slate-300">Sign in with your email and password or continue with Google.</p>

        <form onSubmit={handleSubmit} className="mt-6 card">
          <div className="card-body space-y-5">
            <Field label="Email Address">
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-md border border-slate-700/70 bg-slate-900/60 text-slate-200 px-3 py-2"
              />
            </Field>

            <button disabled={!canSubmit} className={`btn-primary w-full ${!canSubmit ? 'opacity-60 cursor-not-allowed' : ''}`}>Sign In →</button>

            <button type="button" onClick={handleGoogle} className="btn-ghost w-full">Continue with Google</button>

            <div className="text-center text-sm text-slate-400">
              New here? <Link to="/signup" className="text-violet-400 hover:text-violet-300">Create an account</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
