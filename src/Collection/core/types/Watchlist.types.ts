export type WatchlistStatus = 'want_to_watch' | 'watching' | 'completed'

export type WatchlistMediaType = 'movie' | 'tv'

export type WatchlistFilter = 'all' | WatchlistStatus

export type WatchlistSortOption = 'date_added' | 'rating' | 'title'

export interface WatchlistMediaSnapshot {
  title: string
  posterPath: string | null
  rating: number
}

export interface WatchlistEntry {
  id: string
  mediaType: WatchlistMediaType
  mediaId: number
  status: WatchlistStatus
  note?: string
  snapshot: WatchlistMediaSnapshot
  createdAt: string
  updatedAt: string
}

export interface WatchlistStorage {
  version: 1
  entries: WatchlistEntry[]
}

export interface WatchlistStatusCounts {
  all: number
  want_to_watch: number
  watching: number
  completed: number
}

export interface AddWatchlistInput {
  mediaType: WatchlistMediaType
  mediaId: number
  snapshot: WatchlistMediaSnapshot
  status?: WatchlistStatus
  note?: string
}

export interface WatchlistMediaToggleInput {
  mediaType: WatchlistMediaType
  mediaId: number
  title: string
  posterPath: string | null
  rating: number
}