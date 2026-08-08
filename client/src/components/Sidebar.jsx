import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
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
    <Nav className="flex-column px-3 py-3">
      {links.map(({ to, label, icon: Icon }) => (
        <Nav.Link
          key={to}
          as={NavLink}
          to={to}
          end={to.endsWith('/dashboard')}
          className="d-flex align-items-center gap-2"
          onClick={onNavigate}
        >
          <Icon size={18} />
          {label}
        </Nav.Link>
      ))}
    </Nav>
  )
}

function Sidebar({ role, onNavigate }) {
  return (
    <aside className="dashboard-sidebar d-none d-lg-flex flex-column">
      <div className="p-3 border-bottom">
        <h5 className="mb-0 text-primary fw-bold">SkillSphere</h5>
        <small className="text-muted text-capitalize">{role} Portal</small>
      </div>
      <SidebarNav role={role} onNavigate={onNavigate} />
    </aside>
  )
}

export { Sidebar, SidebarNav }
export default Sidebar
