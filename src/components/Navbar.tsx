import { Link, NavLink } from 'react-router-dom'
import LogoIcon from './LogoIcon'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/assessments', label: 'Quiz' },
  { to: '/colleges', label: 'Colleges' },
  { to: '/notifications', label: 'Notifications' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 nav-glass">
      <div className="container-base flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-slate-900/60 border border-slate-700/70 flex items-center justify-center shadow">
            <LogoIcon size={24} />
          </div>
          <span className="text-lg font-semibold brand-gradient">Nexora</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `px-3 py-2 text-sm font-medium rounded-full transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link to="/assessments" className="btn-primary">Login</Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}

function MobileMenu() {
  return (
    <details className="md:hidden">
      <summary className="list-none px-3 py-2 rounded border border-slate-700/60 hover:bg-white/5 select-none text-slate-200">Menu</summary>
      <div className="absolute left-0 right-0 bg-slate-900/95 border-b border-slate-800 shadow-sm">
        <div className="container-base py-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `block px-2 py-2 text-sm rounded ${isActive ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/assessments" className="btn-primary w-full text-center mt-2">Login</Link>
        </div>
      </div>
    </details>
  )
}
