import { useContext } from 'react'
import { AuthContext } from '../../data/stores/context'

export const useAuthController = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthController must be used within AuthProvider')
  }

  return context
}