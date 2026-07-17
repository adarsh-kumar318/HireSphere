import { FiBell, FiLogOut, FiMenu, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="topbar d-flex align-items-center justify-content-between px-3 px-md-4">
      <button
        className="btn btn-outline-secondary d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#appSidebar"
        aria-controls="appSidebar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FiMenu />
      </button>

      <div>
        <p className="mb-0 small text-secondary">Welcome back</p>
        <strong>{user?.name || user?.businessName || 'User'}</strong>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-light position-relative" type="button" aria-label="Notifications">
          <FiBell />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FiUser />
            <span className="d-none d-sm-inline text-capitalize">{user?.role || 'account'}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button" onClick={handleLogout}>
                <FiLogOut className="me-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
