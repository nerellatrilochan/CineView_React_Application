import { createContext } from 'react'
import type { WatchlistStore } from './WatchlistStore'

export const WatchlistStoreContext = createContext<WatchlistStore | null>(null)