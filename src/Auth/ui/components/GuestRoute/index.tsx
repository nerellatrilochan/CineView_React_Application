import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/Common'
import { useAuthController } from '../../controllers/useAuthController'

export const GuestRoute = () => {
  const { isAuthenticated } = useAuthController()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Outlet />
}