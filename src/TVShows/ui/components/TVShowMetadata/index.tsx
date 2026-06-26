import { RatingBadge, WatchlistToggle } from '@/Common'
import type { TVShowDetail } from '@/Common'
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
}: TVShowMetadataProps) => (
  <StyledMetadata>
    <StyledTitleRow>
      <StyledTitle>{show.name}</StyledTitle>
      <WatchlistToggle />
    </StyledTitleRow>

    <StyledMetaList>
      <li>
        <RatingBadge rating={show.vote_average} />
      </li>
      {show.first_air_date && <li>{show.first_air_date.slice(0, 4)}</li>}
      <li>
        {show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}
      </li>
      <li>
        {show.number_of_episodes} episode{show.number_of_episodes !== 1 ? 's' : ''}
      </li>
      <li>{show.status}</li>
      <li>{show.genres.map((g) => g.name).join(', ')}</li>
    </StyledMetaList>

    {hasTrailer && (
      <StyledTrailerButton type="button" onClick={onPlayTrailer}>
        ▶ Watch Trailer
      </StyledTrailerButton>
    )}

    <StyledOverview>{show.overview}</StyledOverview>
  </StyledMetadata>
)