import type { WatchlistMediaType } from '../types/Watchlist.types'

export const buildWatchlistMediaKey = (
  mediaType: WatchlistMediaType,
  mediaId: number,
): string => `${mediaType}:${mediaId}`