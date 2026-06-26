import { AUTH_CREDENTIALS } from '../../../core/constants/Auth.constants'
import type { LoginCredentials } from '../../../core/types/Auth.types'
import type { AuthService } from './index'

export class HardwiredAuthService implements AuthService {
  async verifyCredentials(credentials: LoginCredentials): Promise<boolean> {
    const { username, password } = credentials

    return (
      username === AUTH_CREDENTIALS.USERNAME &&
      password === AUTH_CREDENTIALS.PASSWORD
    )
  }
}