/* ============================================================
   Dashboard Topbar / Navbar — Tailwind dark-theme standalone
   Used exclusively by DashboardLayout. No Bootstrap dependency.
   Matches SkillSphere color scheme: bg-[#1E293B], border-[#334155]
   ============================================================ */
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiBell, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U'

  return (
    <header className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 h-16 bg-[#1E293B] border-b border-[#334155]">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all lg:hidden"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>

        <span className="text-base font-semibold text-white capitalize hidden sm:block">
          {user?.role ? `${user.role} Dashboard` : 'Dashboard'}
        </span>
      </div>

      {/* Right: bell + user avatar + logout */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Notifications"
        >
          <FiBell size={20} />
        </button>

        {/* Avatar + name */}
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold text-xs flex-shrink-0">
            {initials}
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-200 max-w-[120px] truncate">
            {user?.name || 'User'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          title="Sign out"
          aria-label="Sign out"
        >
          <FiLogOut size={18} />
        </button>
      </div>
    </header>
  )
}

export default Navbar