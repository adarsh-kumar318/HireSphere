import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiBriefcase, FiLogIn, FiUserPlus, FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/logo.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-[#334155] shadow-sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12 items-center">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold text-white text-lg">
            <img 
              src={logo} 
              alt="SkillSphere" 
              className="h-9 w-9 object-contain" 
              onError={(e) => { e.target.style.display = 'none' }} 
            />
            <FiBriefcase className="text-cyan-400" />
            <span>Skill<span className="gradient-text">Sphere</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/messages" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`
              }
            >
              Messages
            </NavLink>
            <NavLink 
              to="/login" 
              className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <FiLogIn /> Login
            </NavLink>
            <Link to="/register" className="ml-2">
              <button className="btn-primary flex items-center gap-1.5">
                <FiUserPlus /> Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-[#0F172A] border-t border-[#334155] px-4 pt-2 pb-4 space-y-2">
          <NavLink 
            to="/" 
            end 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/messages" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-xl text-base font-medium ${isActive ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
            }
          >
            Messages
          </NavLink>
          <NavLink 
            to="/login" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <FiLogIn /> Login
          </NavLink>
          <div className="pt-2 border-t border-[#334155]">
            <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full">
              <button className="w-full btn-primary flex items-center justify-center gap-1.5 py-2.5">
                <FiUserPlus /> Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
