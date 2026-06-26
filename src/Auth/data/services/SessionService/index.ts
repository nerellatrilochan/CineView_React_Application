import { SESSION_STORAGE_KEY } from '../../../core/constants/Auth.constants'
import type { Session } from '../../../core/types/Auth.types'

export interface SessionService {
  getSession(): Session | null
  createSession(username: string): Session
  clearSession(): void
  isAuthenticated(): boolean
}

const createToken = (username: string): string =>
  btoa(`${username}:${Date.now()}`)

export class BrowserSessionService implements SessionService {
  getSession(): Session | null {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null

    try {
      return JSON.parse(raw) as Session
    } catch {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
  }

  createSession(username: string): Session {
    const session: Session = {
      username,
      token: createToken(username),
      createdAt: new Date().toISOString(),
    }

    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    return session
  }

  clearSession(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null
  }
}