import {
    createContext,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
  } from 'react'
import type { LoginCredentials, Session } from '../../core/types/Auth.types'
import { HardwiredAuthService } from '../services/AuthService/index.fixture'
import { BrowserSessionService } from '../services/SessionService'
  
interface AuthContextValue {
  session: Session | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

const authService = new HardwiredAuthService()
const sessionService = new BrowserSessionService()

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(() =>
    sessionService.getSession(),
  )

  const login = useCallback(async (credentials: LoginCredentials) => {
    const isValid = await authService.verifyCredentials(credentials)
    if (!isValid) return false

    const newSession = sessionService.createSession(credentials.username)
    setSession(newSession)
    return true
  }, [])

  const logout = useCallback(() => {
    sessionService.clearSession()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session !== null,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}