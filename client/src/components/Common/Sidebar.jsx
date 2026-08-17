/* ============================================================
   Dashboard Sidebar — Tailwind dark-theme standalone component
   Used exclusively by DashboardLayout. No Bootstrap dependency.
   Matches SkillSphere color scheme: bg-[#1E293B], border-[#334155]
   ============================================================ */
import { NavLink } from 'react-router-dom'
import {
  FiHome, FiPlusCircle, FiList, FiInbox, FiSearch, FiSend,
  FiUser, FiUsers, FiBarChart2, FiMessageSquare, FiShield,
  FiDollarSign, FiAlertTriangle, FiSettings, FiBell,
  FiCalendar, FiStar, FiX,
} from 'react-icons/fi'
import logo from '../../assets/logo.png'

const navConfig = {
  client: [
    { to: '/client/dashboard',        label: 'Dashboard',        icon: FiHome },
    { to: '/client/post-gig',         label: 'Post a Gig',       icon: FiPlusCircle },
    { to: '/client/projects',         label: 'My Projects',      icon: FiList },
    { to: '/client/find-freelancers', label: 'Find Freelancers', icon: FiSearch },
    { to: '/client/proposals',        label: 'Proposals',        icon: FiInbox },
    { to: '/client/payments',         label: 'Payments',         icon: FiDollarSign },
    { to: '/client/collaboration',    label: 'Collaboration',    icon: FiMessageSquare },
    { to: '/client/notifications',    label: 'Notifications',    icon: FiBell },
  ],
  freelancer: [
    { to: '/freelancer/dashboard',     label: 'Dashboard',     icon: FiHome },
    { to: '/freelancer/profile',       label: 'My Profile',    icon: FiUser },
    { to: '/freelancer/marketplace',   label: 'Marketplace',   icon: FiSearch },
    { to: '/freelancer/proposals',     label: 'Proposals',     icon: FiSend },
    { to: '/freelancer/availability',  label: 'Availability',  icon: FiCalendar },
    { to: '/freelancer/reputation',    label: 'Reputation',    icon: FiStar },
    { to: '/freelancer/analytics',     label: 'Analytics',     icon: FiBarChart2 },
    { to: '/freelancer/collaboration', label: 'Collaboration', icon: FiMessageSquare },
    { to: '/freelancer/notifications', label: 'Notifications', icon: FiBell },
  ],
  admin: [
    { to: '/admin/dashboard',    label: 'Dashboard',    icon: FiHome },
    { to: '/admin/users',        label: 'Users',        icon: FiUsers },
    { to: '/admin/verification', label: 'Verification', icon: FiShield },
    { to: '/admin/gigs',         label: 'Gig Approvals', icon: FiList },
    { to: '/admin/payments',     label: 'Payments',     icon: FiDollarSign },
    { to: '/admin/fraud',        label: 'Fraud',        icon: FiAlertTriangle },
    { to: '/admin/disputes',     label: 'Disputes',     icon: FiMessageSquare },
    { to: '/admin/analytics',    label: 'Analytics',    icon: FiBarChart2 },
    { to: '/admin/settings',     label: 'Settings',     icon: FiSettings },
  ],
}

function Sidebar({ role, isOpen, onClose }) {
  const links = navConfig[role] || []

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'flex-shrink-0 flex flex-col',
          'bg-[#1E293B] border-r border-[#334155]',
          'w-64 h-full z-30 overflow-hidden',
          'transition-transform duration-300 ease-in-out',
          isOpen
            ? 'fixed inset-y-0 left-0 translate-x-0'
            : 'hidden lg:flex lg:relative lg:translate-x-0',
        ].join(' ')}
      >
        {/* Brand / logo row */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#334155] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="SkillSphere"
              className="h-8 w-8 object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div>
              <span className="text-sm font-bold text-white tracking-tight">
                Skill<span className="gradient-text">Sphere</span>
              </span>
              <p className="text-xs text-slate-400 capitalize leading-none mt-0.5">
                {role} Portal
              </p>
            </div>
          </div>

          {/* Close button — mobile only */}
          {isOpen && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to.endsWith('/dashboard')}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5',
                ].join(' ')
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export { Sidebar }
export default Sidebar