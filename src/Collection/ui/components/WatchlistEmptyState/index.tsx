import { useTranslation } from 'react-i18next'
import {
  StyledEmptyDescription,
  StyledEmptyState,
  StyledEmptyTitle,
} from './StyledComponents'

interface WatchlistEmptyStateProps {
  variant: 'empty' | 'filter'
}

export const WatchlistEmptyState = ({ variant }: WatchlistEmptyStateProps) => {
  const { t } = useTranslation('collection')

  return (
    <StyledEmptyState>
      <StyledEmptyTitle>
        {variant === 'empty'
          ? t('watchlist.empty.title')
          : t('watchlist.empty.filterTitle')}
      </StyledEmptyTitle>
      <StyledEmptyDescription>
        {variant === 'empty'
          ? t('watchlist.empty.description')
          : t('watchlist.empty.filterDescription')}
      </StyledEmptyDescription>
    </StyledEmptyState>
  )
}