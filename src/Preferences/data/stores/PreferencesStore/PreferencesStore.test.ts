import { beforeEach, describe, expect, it } from 'vitest'
import { PREFERENCES_STORAGE_KEY } from '../../../core/constants/Preferences.constants'
import { PreferencesStore } from './index'

describe('PreferencesStore', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults theme to system preference when nothing is stored', () => {
    const store = new PreferencesStore()
    expect(['light', 'dark']).toContain(store.theme)
  })

  it('hydrates valid preferences from localStorage', () => {
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({ language: 'es', theme: 'light', region: 'ES' }),
    )

    const store = new PreferencesStore()
    expect(store.language).toBe('es')
    expect(store.theme).toBe('light')
    expect(store.region).toBe('ES')
    expect(store.tmdbLanguage).toBe('es-ES')
  })

  it('persists changes to localStorage', () => {
    const store = new PreferencesStore()
    store.setLanguage('es')
    store.setTheme('dark')
    store.setRegion('IN')

    const stored = JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)!)
    expect(stored).toEqual({ language: 'es', theme: 'dark', region: 'IN' })
  })

  it('toggles theme between light and dark', () => {
    const store = new PreferencesStore()
    store.setTheme('light')
    store.toggleTheme()
    expect(store.theme).toBe('dark')
    store.toggleTheme()
    expect(store.theme).toBe('light')
  })
})