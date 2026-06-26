import { useTranslation } from 'react-i18next'
import { RatingBadge, WatchlistToggle } from '@/Common'
import type { MovieDetail } from '@/Common'
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

  return (
    <StyledMetadata>
      <StyledTitleRow>
        <StyledTitle>{movie.title}</StyledTitle>
        <WatchlistToggle />
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