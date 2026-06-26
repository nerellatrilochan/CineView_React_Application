import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/Common'
import { REDIRECT_QUERY_PARAM } from '../../../core/constants/Auth.constants'
import { useAuthController } from '../../controllers/useAuthController'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthController()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirectTarget = `${location.pathname}${location.search}`
    const loginPath = `${ROUTES.LOGIN}?${REDIRECT_QUERY_PARAM}=${encodeURIComponent(redirectTarget)}`
    return <Navigate to={loginPath} replace />
  }

  return <Outlet />
}