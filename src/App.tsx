import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DiscoverCareer from './pages/DiscoverCareer'
import Colleges from './pages/Colleges'
import Assessments from './pages/Assessments'
import Resources from './pages/Resources'
import About from './pages/About'
import Contact from './pages/Contact'
import Notifications from './pages/Notifications'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import AssessmentsWizard from './pages/AssessmentsWizard'

export default function App() {
  function Guard({ children }: { children: ReactElement }){
    const location = useLocation()
    const onboarded = typeof window !== 'undefined' ? localStorage.getItem('nx_onboarded') === 'true' : false
    const isAuthRoute = location.pathname.startsWith('/login') || location.pathname.startsWith('/signup')
    if (!onboarded && !isAuthRoute) {
      return <Navigate to="/signup" replace />
    }
    return children
  }
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<DiscoverCareer />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/assessments" element={<Guard><AssessmentsWizard /></Guard>} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notifications" element={<Guard><Notifications /></Guard>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
