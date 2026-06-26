import type { WatchlistMediaToggleInput } from '../../core/types/Watchlist.types'
import { useWatchlistSnapshot } from './useWatchlistSnapshot'

export const useWatchlistMediaToggle = (input: WatchlistMediaToggleInput) => {
  const { isInWatchlist, toggle } = useWatchlistSnapshot()

  const inWatchlist = isInWatchlist(input.mediaType, input.mediaId)

  const handleToggle = () => {
    toggle({
      mediaType: input.mediaType,
      mediaId: input.mediaId,
      snapshot: {
        title: input.title,
        posterPath: input.posterPath,
        rating: input.rating,
      },
    })
  }

  return {
    isInWatchlist: inWatchlist,
    onToggle: handleToggle,
  }
}