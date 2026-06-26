import { RatingBadge, WatchlistToggle } from '@/Common'
import type { MovieDetail } from '@/Common'
import {
  StyledMetaList,
  StyledMetadata,
  StyledOverview,
  StyledTagline,
  StyledTitle,
  StyledTitleRow,
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
}: MovieMetadataProps) => (
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
      {movie.runtime && <li>{movie.runtime} min</li>}
      <li>{movie.status}</li>
      <li>{movie.genres.map((genre) => genre.name).join(', ')}</li>
    </StyledMetaList>

    {hasTrailer && (
      <button type="button" onClick={onPlayTrailer}>
        ▶ Watch Trailer
      </button>
    )}

    <StyledOverview>{movie.overview}</StyledOverview>
  </StyledMetadata>
)