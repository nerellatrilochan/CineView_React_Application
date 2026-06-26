import { useTranslation } from 'react-i18next'
import { StyledWatchlistButton } from './StyledComponents'

interface WatchlistToggleProps {
  isInWatchlist?: boolean
}

export const WatchlistToggle = ({ isInWatchlist = false }: WatchlistToggleProps) => {
  const { t } = useTranslation('common')

  return (
    <StyledWatchlistButton
      type="button"
      disabled
      aria-label={
        isInWatchlist ? t('watchlistRemoveSoon') : t('watchlistAddSoon')
      }
      title={t('watchlistComingSoon')}
    >
      {isInWatchlist ? '✓' : '+'}
    </StyledWatchlistButton>
  )
}