import { reaction } from 'mobx'
import { useContext, useEffect, useState } from 'react'
import type { PreferencesSnapshot } from '../../core/types/Preferences.types'
import { PreferencesStoreContext } from '../stores/context'

export const usePreferencesSnapshot = (): PreferencesSnapshot => {
  const store = useContext(PreferencesStoreContext)

  if (!store) {
    throw new Error('usePreferencesSnapshot must be used within PreferencesProvider')
  }

  const [, setVersion] = useState(0)

  useEffect(
    () =>
      reaction(
        () => [store.language, store.theme, store.region, store.tmdbLanguage],
        () => setVersion((current) => current + 1),
      ),
    [store],
  )

  return {
    language: store.language,
    theme: store.theme,
    region: store.region,
    tmdbLanguage: store.tmdbLanguage,
    setLanguage: store.setLanguage.bind(store),
    setTheme: store.setTheme.bind(store),
    setRegion: store.setRegion.bind(store),
    toggleTheme: store.toggleTheme.bind(store),
  }
}