import { useTranslation } from 'react-i18next'
import { RatingBadge } from '@/Common'
import type { MovieSummary } from '@/Common'
import { getBackdropUrl } from '@/Common'
import {
  StyledActions,
  StyledBackdrop,
  StyledBackdropOverlay,
  StyledContent,
  StyledHero,
  StyledOverview,
  StyledTitle,
  StyledTrailerButton,
} from './StyledComponents'

interface HeroBannerProps {
  movie: MovieSummary
  onPlayTrailer: () => void
  hasTrailer: boolean
}

export const HeroBanner = ({ movie, onPlayTrailer, hasTrailer }: HeroBannerProps) => {
  const { t } = useTranslation('common')
  const backdropUrl = getBackdropUrl(movie.backdrop_path)

  return (
    <StyledHero>
      <StyledBackdrop $imageUrl={backdropUrl} aria-hidden />
      <StyledBackdropOverlay aria-hidden />
      <StyledContent>
        <StyledTitle>{movie.title}</StyledTitle>
        <StyledActions>
          <RatingBadge rating={movie.vote_average} />
          {hasTrailer && (
            <StyledTrailerButton type="button" onClick={onPlayTrailer}>
              {t('watchTrailer')}
            </StyledTrailerButton>
          )}
        </StyledActions>
        {movie.overview && <StyledOverview>{movie.overview}</StyledOverview>}
      </StyledContent>
    </StyledHero>
  )
}