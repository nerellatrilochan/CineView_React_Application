import { useTranslation } from 'react-i18next'
import {
  buildMovieDetailPath,
  buildTVShowDetailPath,
  PosterImage,
  RatingBadge,
} from '@/Common'
import { WATCHLIST_STATUSES } from '../../../core/constants/Watchlist.constants'
import type { WatchlistEntry, WatchlistStatus } from '../../../core/types/Watchlist.types'
import {
  StyledCard,
  StyledCardLink,
  StyledMetaRow,
  StyledRemoveButton,
  StyledStatusSelect,
  StyledTitle,
} from './StyledComponents'

interface WatchlistCardProps {
  entry: WatchlistEntry
  onStatusChange: (status: WatchlistStatus) => void
  onRemove: () => void
}

export const WatchlistCard = ({
  entry,
  onStatusChange,
  onRemove,
}: WatchlistCardProps) => {
  const { t } = useTranslation('collection')

  const detailPath =
    entry.mediaType === 'movie'
      ? buildMovieDetailPath(entry.mediaId)
      : buildTVShowDetailPath(entry.mediaId)

  return (
    <StyledCard>
      <StyledCardLink to={detailPath} aria-label={entry.snapshot.title}>
        <PosterImage path={entry.snapshot.posterPath} alt={entry.snapshot.title} />
        <StyledTitle>{entry.snapshot.title}</StyledTitle>
      </StyledCardLink>

      <RatingBadge rating={entry.snapshot.rating} />

      <StyledMetaRow>
        <StyledStatusSelect
          value={entry.status}
          aria-label={t('watchlist.status.label', { title: entry.snapshot.title })}
          onChange={(event) =>
            onStatusChange(event.target.value as WatchlistStatus)
          }
        >
          {WATCHLIST_STATUSES.map((status) => (
            <option key={status} value={status}>
              {t(`watchlist.status.${status}`)}
            </option>
          ))}
        </StyledStatusSelect>

        <StyledRemoveButton type="button" onClick={onRemove}>
          {t('watchlist.remove')}
        </StyledRemoveButton>
      </StyledMetaRow>
    </StyledCard>
  )
}