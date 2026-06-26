import { createContext } from 'react'
import type { LoginCredentials, Session } from '../../core/types/Auth.types'

export interface AuthContextValue {
  session: Session | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)