import { makeAutoObservable, reaction } from 'mobx'
import {
  DEFAULT_LANGUAGE,
  DEFAULT_REGION,
  getSystemTheme,
  LANGUAGE_TO_TMDB,
  PREFERENCES_STORAGE_KEY,
} from '../../../core/constants/Preferences.constants'
import { preferencesSchema } from '../../../core/types/index.zod'
import type {
  AppLanguage,
  AppRegion,
  AppTheme,
  UserPreferences,
} from '../../../core/types/Preferences.types'
import i18n from '../../i18n'

const readStoredPreferences = (): UserPreferences | null => {
  const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    const result = preferencesSchema.safeParse(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

const persistPreferences = (preferences: UserPreferences): void => {
  localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences))
}

const applyThemeToDocument = (theme: AppTheme): void => {
  document.documentElement.setAttribute('data-theme', theme)
}

export class PreferencesStore {
  language: AppLanguage = DEFAULT_LANGUAGE
  theme: AppTheme = getSystemTheme()
  region: AppRegion = DEFAULT_REGION

  constructor() {
    makeAutoObservable(this)
    this.initialize()
    this.setupPersistence()
  }

  get tmdbLanguage(): string {
    return LANGUAGE_TO_TMDB[this.language]
  }

  get snapshot(): UserPreferences {
    return {
      language: this.language,
      theme: this.theme,
      region: this.region,
    }
  }

  initialize(): void {
    const stored = readStoredPreferences()

    if (stored) {
      this.language = stored.language
      this.theme = stored.theme
      this.region = stored.region
    }

    void i18n.changeLanguage(this.language)
    applyThemeToDocument(this.theme)
  }

  setLanguage(language: AppLanguage): void {
    this.language = language
    void i18n.changeLanguage(language)
  }

  setTheme(theme: AppTheme): void {
    this.theme = theme
    applyThemeToDocument(theme)
  }

  setRegion(region: AppRegion): void {
    this.region = region
  }

  toggleTheme(): void {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
  }

  private setupPersistence(): void {
    reaction(
      () => this.snapshot,
      (preferences) => {
        persistPreferences(preferences)
      },
    )
  }
}