import { Link } from 'react-router-dom'
import LogoIcon from './LogoIcon'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-10 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-base py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/60 border border-slate-700/60 shadow">
            <LogoIcon size={40} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight brand-gradient animate-fade-in-up">
            Nexora
          </h1>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">
            Your intelligent career guidance platform. Discover your perfect career path through
            <span className="text-white font-semibold"> personalized assessments</span> and expert recommendations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/assessments" className="btn-primary">Login</Link>
            <Link to="/discover" className="btn-ghost">Get Started →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
