import { NavLink } from 'react-router-dom'
import {
  FiHome, FiPlusCircle, FiList, FiInbox, FiSearch, FiSend,
  FiUser, FiImage, FiUsers, FiBarChart2, FiMessageSquare,
} from 'react-icons/fi'

const navConfig = {
  client: [
    { to: '/client/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/client/post-gig', label: 'Post a Gig', icon: FiPlusCircle },
    { to: '/client/my-gigs', label: 'My Gigs', icon: FiList },
    { to: '/client/proposals', label: 'Proposals', icon: FiInbox },
    { to: '/messages', label: 'Messages', icon: FiMessageSquare },
  ],
  freelancer: [
    { to: '/freelancer/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/freelancer/browse-gigs', label: 'Browse Gigs', icon: FiSearch },
    { to: '/freelancer/my-proposals', label: 'My Proposals', icon: FiSend },
    { to: '/freelancer/profile', label: 'Profile', icon: FiUser },
    { to: '/freelancer/portfolio', label: 'Portfolio', icon: FiImage },
    { to: '/messages', label: 'Messages', icon: FiMessageSquare },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/admin/users', label: 'Manage Users', icon: FiUsers },
    { to: '/admin/gigs', label: 'Manage Gigs', icon: FiList },
    { to: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
  ],
}

function SidebarNav({ role, onNavigate }) {
  const links = navConfig[role] || []

  return (
    <nav className="flex flex-col px-3 py-3 space-y-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to.endsWith('/dashboard')}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-600/20 text-indigo-400'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`
          }
          onClick={onNavigate}
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function Sidebar({ role, onNavigate }) {
  return (
    <aside className="w-64 bg-[#1E293B] border-r border-[#334155] flex flex-col h-full">
      <div className="p-4 border-b border-[#334155]">
        <h5 className="mb-0 text-white font-bold text-lg">SkillSphere</h5>
        <small className="text-slate-400 capitalize">{role} Portal</small>
      </div>
      <SidebarNav role={role} onNavigate={onNavigate} />
    </aside>
  )
}

export { Sidebar, SidebarNav }
export default Sidebar
