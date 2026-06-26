import type { LoginCredentials } from '../../../core/types/Auth.types'

export interface AuthService {
  verifyCredentials(credentials: LoginCredentials): Promise<boolean>
}