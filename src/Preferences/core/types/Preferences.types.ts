export type AppLanguage = 'en' | 'es'
export type AppTheme = 'light' | 'dark'
export type AppRegion = 'US' | 'GB' | 'IN' | 'ES' | 'FR' | 'DE'

export interface UserPreferences {
  language: AppLanguage
  theme: AppTheme
  region: AppRegion
}

export interface PreferencesSnapshot {
  language: AppLanguage
  theme: AppTheme
  region: AppRegion
  tmdbLanguage: string
  setLanguage: (language: AppLanguage) => void
  setTheme: (theme: AppTheme) => void
  setRegion: (region: AppRegion) => void
  toggleTheme: () => void
}