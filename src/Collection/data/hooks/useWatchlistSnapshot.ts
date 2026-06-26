import { reaction } from 'mobx'
import { useContext, useEffect, useState } from 'react'
import type {
  AddWatchlistInput,
  WatchlistEntry,
  WatchlistMediaType,
  WatchlistStatus,
  WatchlistStatusCounts,
} from '../../core/types/Watchlist.types'
import { WatchlistStoreContext } from '../stores/context'

export interface WatchlistSnapshot {
  entries: WatchlistEntry[]
  totalCount: number
  statusCounts: WatchlistStatusCounts
  isInWatchlist: (mediaType: WatchlistMediaType, mediaId: number) => boolean
  getEntry: (
    mediaType: WatchlistMediaType,
    mediaId: number,
  ) => WatchlistEntry | undefined
  add: (input: AddWatchlistInput) => void
  remove: (mediaType: WatchlistMediaType, mediaId: number) => void
  toggle: (input: AddWatchlistInput) => void
  updateStatus: (entryId: string, status: WatchlistStatus) => void
  updateNote: (entryId: string, note: string) => void
}

export const useWatchlistSnapshot = (): WatchlistSnapshot => {
  const store = useContext(WatchlistStoreContext)

  if (!store) {
    throw new Error('useWatchlistSnapshot must be used within CollectionProvider')
  }

  const [, setVersion] = useState(0)

  useEffect(
    () =>
      reaction(
        () => ({
          entries: store.entries.slice(),
          totalCount: store.totalCount,
          statusCounts: store.statusCounts,
        }),
        () => setVersion((current) => current + 1),
      ),
    [store],
  )

  return {
    entries: store.entries,
    totalCount: store.totalCount,
    statusCounts: store.statusCounts,
    isInWatchlist: store.isInWatchlist.bind(store),
    getEntry: store.getEntry.bind(store),
    add: store.add.bind(store),
    remove: store.remove.bind(store),
    toggle: store.toggle.bind(store),
    updateStatus: store.updateStatus.bind(store),
    updateNote: store.updateNote.bind(store),
  }
}