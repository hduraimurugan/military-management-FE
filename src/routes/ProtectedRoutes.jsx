import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UnauthorizedPage } from '../pages/UnauthorizedPage.jsx'
import { LoadingPage } from '../pages/LoadingPage.jsx'

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, role } = useAuth()

  if (loading) {
    return <LoadingPage />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Option 1: Redirect to Unauthorized Page route
    return <Navigate to="/unauthorized" replace />

    // Option 2: Just show the page component directly
    // return <UnauthorizedPage />
  }

  return children
}
