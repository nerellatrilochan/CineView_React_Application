import type {
    WatchlistSortOption,
    WatchlistStatus,
  } from '../types/Watchlist.types'
  
  export const WATCHLIST_STORAGE_KEY = 'cineview_watchlist'
  
  export const WATCHLIST_STORAGE_VERSION = 1 as const
  
  export const WATCHLIST_NOTE_MAX_LENGTH = 300
  
  export const DEFAULT_WATCHLIST_STATUS: WatchlistStatus = 'want_to_watch'
  
  export const WATCHLIST_STATUSES: readonly WatchlistStatus[] = [
    'want_to_watch',
    'watching',
    'completed',
  ]
  
  export const WATCHLIST_SORT_OPTIONS: readonly WatchlistSortOption[] = [
    'date_added',
    'rating',
    'title',
  ]