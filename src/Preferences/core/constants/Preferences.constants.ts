import type { AppLanguage, AppRegion } from '../types/Preferences.types'

export const PREFERENCES_STORAGE_KEY = 'cineview_preferences'

export const DEFAULT_LANGUAGE: AppLanguage = 'en'
export const DEFAULT_REGION: AppRegion = 'US'

export const LANGUAGE_TO_TMDB: Record<AppLanguage, string> = {
  en: 'en-US',
  es: 'es-ES',
}

export const LANGUAGE_TO_INTL: Record<AppLanguage, string> = {
  en: 'en-US',
  es: 'es-ES',
}

export const SUPPORTED_LANGUAGES: readonly AppLanguage[] = ['en', 'es']

export const SUPPORTED_REGIONS: readonly AppRegion[] = [
  'US',
  'GB',
  'IN',
  'ES',
  'FR',
  'DE',
]

export const getSystemTheme = (): 'light' | 'dark' => {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
  ) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return 'light'
}