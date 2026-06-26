import { useMemo, type ReactNode } from 'react'
import { WatchlistStoreContext } from './context'
import { WatchlistStore } from './WatchlistStore'

const watchlistStore = new WatchlistStore()

interface CollectionProviderProps {
  children: ReactNode
}

export const CollectionProvider = ({ children }: CollectionProviderProps) => {
  const value = useMemo(() => watchlistStore, [])

  return (
    <WatchlistStoreContext.Provider value={value}>
      {children}
    </WatchlistStoreContext.Provider>
  )
}