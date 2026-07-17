import {
  FiBarChart2,
  FiBell,
  FiBriefcase,
  FiClipboard,
  FiCreditCard,
  FiFileText,
  FiMessageSquare,
  FiGrid,
  FiPlusCircle,
  FiSettings,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const roleLinks = {
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/admin/users', label: 'Users', icon: FiUsers },
    { to: '/admin/verification', label: 'Verification', icon: FiShield },
    { to: '/admin/gigs', label: 'Gig Approvals', icon: FiClipboard },
    { to: '/admin/payments', label: 'Payments', icon: FiCreditCard },
    { to: '/admin/fraud', label: 'Fraud Signals', icon: FiTarget },
    { to: '/admin/disputes', label: 'Disputes', icon: FiFileText },
    { to: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
    { to: '/admin/settings', label: 'Settings', icon: FiSettings },
  ],
  client: [
    { to: '/client/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/client/post-gig', label: 'Post Gig', icon: FiPlusCircle },
    { to: '/client/projects', label: 'Projects', icon: FiBriefcase },
    { to: '/client/find-freelancers', label: 'Find Talent', icon: FiTarget },
    { to: '/client/proposals', label: 'Proposals', icon: FiFileText },
    { to: '/client/payments', label: 'Payments', icon: FiCreditCard },
    { to: '/client/collaboration', label: 'Collaboration', icon: FiMessageSquare },
    { to: '/client/notifications', label: 'Notifications', icon: FiBell },
  ],
  freelancer: [
    { to: '/freelancer/dashboard', label: 'Dashboard', icon: FiGrid },
    { to: '/freelancer/profile', label: 'Profile', icon: FiUsers },
    { to: '/freelancer/marketplace', label: 'Gig Marketplace', icon: FiBriefcase },
    { to: '/freelancer/proposals', label: 'Proposals', icon: FiFileText },
    { to: '/freelancer/availability', label: 'Availability', icon: FiBell },
    { to: '/freelancer/reputation', label: 'Reputation', icon: FiStar },
    { to: '/freelancer/analytics', label: 'Analytics', icon: FiTrendingUp },
    { to: '/freelancer/collaboration', label: 'Collaboration', icon: FiMessageSquare },
  ],
}

function Sidebar({ role }) {
  const links = roleLinks[role] || []

  return (
    <aside className="app-sidebar p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <NavLink to={`/${role}/dashboard`} className="text-white text-decoration-none">
          <strong className="fs-5">SkillSphere</strong>
        </NavLink>
      </div>
      <nav id="appSidebar" className="collapse d-lg-block">
        <div className="d-grid gap-1">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} className="sidebar-link">
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
