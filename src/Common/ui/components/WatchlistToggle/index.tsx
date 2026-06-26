import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledWatchlistButton } from './StyledComponents'

interface WatchlistToggleProps {
  isInWatchlist?: boolean
  onToggle?: () => void
}

export const WatchlistToggle = ({
  isInWatchlist = false,
  onToggle,
}: WatchlistToggleProps) => {
  const { t } = useTranslation('common')

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onToggle?.()
  }

  return (
    <StyledWatchlistButton
      type="button"
      aria-pressed={isInWatchlist}
      aria-label={isInWatchlist ? t('watchlistRemove') : t('watchlistAdd')}
      title={isInWatchlist ? t('watchlistRemove') : t('watchlistAdd')}
      $active={isInWatchlist}
      onClick={handleClick}
    >
      {isInWatchlist ? '✓' : '+'}
    </StyledWatchlistButton>
  )
}