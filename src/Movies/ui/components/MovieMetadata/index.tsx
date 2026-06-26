import { useTranslation } from 'react-i18next'
import { RatingBadge, WatchlistToggle } from '@/Common'
import type { MovieDetail } from '@/Common'
import { useWatchlistMediaToggle } from '@/Collection'
import {
  StyledMetaList,
  StyledMetadata,
  StyledOverview,
  StyledTagline,
  StyledTitle,
  StyledTitleRow,
  StyledTrailerButton,
} from './StyledComponents'

interface MovieMetadataProps {
  movie: MovieDetail
  onPlayTrailer: () => void
  hasTrailer: boolean
}

export const MovieMetadata = ({
  movie,
  onPlayTrailer,
  hasTrailer,
}: MovieMetadataProps) => {
  const { t } = useTranslation('common')
  const { isInWatchlist, onToggle } = useWatchlistMediaToggle({
    mediaType: 'movie',
    mediaId: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    rating: movie.vote_average,
  })

  return (
    <StyledMetadata>
      <StyledTitleRow>
        <StyledTitle>{movie.title}</StyledTitle>
        <WatchlistToggle isInWatchlist={isInWatchlist} onToggle={onToggle} />
      </StyledTitleRow>

      {movie.tagline && <StyledTagline>{movie.tagline}</StyledTagline>}

      <StyledMetaList>
        <li>
          <RatingBadge rating={movie.vote_average} />
        </li>
        {movie.release_date && <li>{movie.release_date.slice(0, 4)}</li>}
        {movie.runtime && <li>{t('runtimeMinutes', { count: movie.runtime })}</li>}
        <li>{movie.status}</li>
        <li>{movie.genres.map((genre) => genre.name).join(', ')}</li>
      </StyledMetaList>

      {hasTrailer && (
        <StyledTrailerButton type="button" onClick={onPlayTrailer}>
          {t('watchTrailer')}
        </StyledTrailerButton>
      )}

      <StyledOverview>{movie.overview}</StyledOverview>
    </StyledMetadata>
  )
}