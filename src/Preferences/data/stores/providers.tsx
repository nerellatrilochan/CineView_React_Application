import { useEffect, useMemo, type ReactNode } from 'react'
import { tmdbService } from '@/Common'
import { PreferencesStoreContext } from './context'
import { PreferencesStore } from './PreferencesStore'

const preferencesStore = new PreferencesStore()

interface PreferencesProviderProps {
  children: ReactNode
}

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  useEffect(() => {
    tmdbService.setLocaleProvider(() => ({
      language: preferencesStore.tmdbLanguage,
      region: preferencesStore.region,
    }))
  }, [])

  const value = useMemo(() => preferencesStore, [])

  return (
    <PreferencesStoreContext.Provider value={value}>
      {children}
    </PreferencesStoreContext.Provider>
  )
}