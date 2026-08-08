import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

function AuthLayout() {
  return (
    <main className="min-h-screen bg-[#0F172A] hero-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 text-white no-underline">
            <img src={logo} alt="SkillSphere" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold">SkillSphere</span>
          </Link>
          <h1 className="mt-4 text-xl font-bold text-white">Connect. Collaborate. Create.</h1>
          <p className="text-slate-400 text-sm mt-2">
            The premium marketplace for freelance professionals.
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-7 shadow-2xl">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          &copy; {new Date().getFullYear()} SkillSphere. All rights reserved.
        </p>
      </div>
    </main>
  )
}

export default AuthLayout
