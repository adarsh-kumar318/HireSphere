import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, initializing, isAuthenticated } = useAuth()
  const location = useLocation()

  if (initializing) {
    return <LoadingSpinner fullPage text="Checking your session..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/error" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
