import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/60">
      <div className="container-base py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded bg-[var(--color-primary)]"></div>
            <span className="text-lg font-semibold brand-gradient">Nexora</span>
          </div>
          <p className="text-sm text-slate-400">Discover careers, explore colleges, and unlock your potential.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-200">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-slate-300 hover:text-white">Home</Link></li>
            <li><Link to="/discover" className="text-slate-300 hover:text-white">Discover Careers</Link></li>
            <li><Link to="/colleges" className="text-slate-300 hover:text-white">Colleges</Link></li>
            <li><Link to="/assessments" className="text-slate-300 hover:text-white">Assessments</Link></li>
            <li><Link to="/resources" className="text-slate-300 hover:text-white">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-200">Follow Us</h4>
          <div className="flex gap-3 text-slate-400">
            <a href="#" aria-label="Twitter" className="hover:text-white">Twitter</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
            <a href="#" aria-label="Instagram" className="hover:text-white">Instagram</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-slate-200">Newsletter</h4>
          <form className="flex gap-2">
            <input type="email" className="flex-1 rounded-md border border-slate-700/70 bg-white/5 text-slate-200 placeholder:text-slate-400 px-3 py-2" placeholder="Your email" aria-label="Email" />
            <button className="btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="py-4 border-t border-slate-800/80 text-center text-sm text-slate-500">© {new Date().getFullYear()} Nexora. All rights reserved.</div>
    </footer>
  )
}
