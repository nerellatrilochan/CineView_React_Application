export interface Session {
    username: string
    token: string
    createdAt: string
  }
  
  export interface LoginCredentials {
    username: string
    password: string
  }
  
  export type LoginFieldErrors = Partial<Record<keyof LoginCredentials, string>>