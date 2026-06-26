import { useMemo, useState } from 'react'
import type {
  WatchlistFilter,
  WatchlistSortOption,
  WatchlistStatus,
} from '../../core/types/Watchlist.types'
import {
  filterWatchlistEntries,
  sortWatchlistEntries,
} from '../../core/utils/WatchlistSort.utils'
import { useWatchlistSnapshot } from '../../data/hooks/useWatchlistSnapshot'

export const useWatchlistPageController = () => {
  const { entries, statusCounts, updateStatus, remove } = useWatchlistSnapshot()
  const [filter, setFilter] = useState<WatchlistFilter>('all')
  const [sortBy, setSortBy] = useState<WatchlistSortOption>('date_added')

  const visibleEntries = useMemo(() => {
    const filtered = filterWatchlistEntries(entries, filter)
    return sortWatchlistEntries(filtered, sortBy)
  }, [entries, filter, sortBy])

  const handleStatusChange = (entryId: string, status: WatchlistStatus) => {
    updateStatus(entryId, status)
  }

  const handleRemove = (mediaType: 'movie' | 'tv', mediaId: number) => {
    remove(mediaType, mediaId)
  }

  return {
    entries: visibleEntries,
    statusCounts,
    filter,
    sortBy,
    setFilter,
    setSortBy,
    handleStatusChange,
    handleRemove,
    isEmpty: entries.length === 0,
    isFilterEmpty: entries.length > 0 && visibleEntries.length === 0,
  }
}