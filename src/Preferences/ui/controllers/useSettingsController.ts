import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/Common'
import { useAuthController } from '@/Auth'
import { usePreferencesSnapshot } from '../../data/hooks/usePreferencesSnapshot'

export const useSettingsController = () => {
  const navigate = useNavigate()
  const { logout } = useAuthController()
  const preferences = usePreferencesSnapshot()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return {
    ...preferences,
    handleLogout,
  }
}