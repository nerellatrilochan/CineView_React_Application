import { StyledWatchlistButton } from './StyledComponents'

interface WatchlistToggleProps {
  isInWatchlist?: boolean
}

export const WatchlistToggle = ({ isInWatchlist = false }: WatchlistToggleProps) => (
  <StyledWatchlistButton
    type="button"
    disabled
    aria-label={isInWatchlist ? 'Remove from watchlist (coming soon)' : 'Add to watchlist (coming soon)'}
    title="Watchlist — coming in Milestone 5"
  >
    {isInWatchlist ? '✓' : '+'}
  </StyledWatchlistButton>
)