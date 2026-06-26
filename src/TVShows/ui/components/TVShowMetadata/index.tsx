import { useTranslation } from 'react-i18next'
import { RatingBadge, WatchlistToggle } from '@/Common'
import type { TVShowDetail } from '@/Common'
import { useWatchlistMediaToggle } from '@/Collection'
import {
  StyledMetaList,
  StyledMetadata,
  StyledOverview,
  StyledTitle,
  StyledTitleRow,
  StyledTrailerButton,
} from './StyledComponents'

interface TVShowMetadataProps {
  show: TVShowDetail
  hasTrailer: boolean
  onPlayTrailer: () => void
}

export const TVShowMetadata = ({
  show,
  hasTrailer,
  onPlayTrailer,
}: TVShowMetadataProps) => {
  const { t } = useTranslation(['tvShows', 'common'])
  const { isInWatchlist, onToggle } = useWatchlistMediaToggle({
    mediaType: 'tv',
    mediaId: show.id,
    title: show.name,
    posterPath: show.poster_path,
    rating: show.vote_average,
  })

  return (
    <StyledMetadata>
      <StyledTitleRow>
        <StyledTitle>{show.name}</StyledTitle>
        <WatchlistToggle isInWatchlist={isInWatchlist} onToggle={onToggle} />
      </StyledTitleRow>

      <StyledMetaList>
        <li>
          <RatingBadge rating={show.vote_average} />
        </li>
        {show.first_air_date && <li>{show.first_air_date.slice(0, 4)}</li>}
        <li>{t('tvShows:metadata.seasonCount', { count: show.number_of_seasons })}</li>
        <li>{t('tvShows:metadata.episodeCount', { count: show.number_of_episodes })}</li>
        <li>{show.status}</li>
        <li>{show.genres.map((genre) => genre.name).join(', ')}</li>
      </StyledMetaList>

      {hasTrailer && (
        <StyledTrailerButton type="button" onClick={onPlayTrailer}>
          {t('common:watchTrailer')}
        </StyledTrailerButton>
      )}

      <StyledOverview>{show.overview}</StyledOverview>
    </StyledMetadata>
  )
}