import type {
    WatchlistEntry,
    WatchlistFilter,
    WatchlistSortOption,
  } from '../types/Watchlist.types'
  
  export const filterWatchlistEntries = (
    entries: WatchlistEntry[],
    filter: WatchlistFilter,
  ): WatchlistEntry[] => {
    if (filter === 'all') return entries
    return entries.filter((entry) => entry.status === filter)
  }
  
  export const sortWatchlistEntries = (
    entries: WatchlistEntry[],
    sortBy: WatchlistSortOption,
  ): WatchlistEntry[] => {
    const sorted = [...entries]
  
    switch (sortBy) {
      case 'rating':
        return sorted.sort(
          (left, right) => right.snapshot.rating - left.snapshot.rating,
        )
      case 'title':
        return sorted.sort((left, right) =>
          left.snapshot.title.localeCompare(right.snapshot.title, undefined, {
            sensitivity: 'base',
          }),
        )
      case 'date_added':
      default:
        return sorted.sort(
          (left, right) =>
            new Date(right.createdAt).getTime() -
            new Date(left.createdAt).getTime(),
        )
    }
  }