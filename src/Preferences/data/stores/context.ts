import { createContext } from 'react'
import type { PreferencesStore } from './PreferencesStore'

export const PreferencesStoreContext = createContext<PreferencesStore | null>(null)