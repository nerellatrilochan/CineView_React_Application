import { RatingBadge, WatchlistToggle } from '@/Common'
import { PosterImage } from '@/Common'
import {
  StyledCard,
  StyledCardLink,
  StyledRatingWrapper,
  StyledTitle,
  StyledWatchlistWrapper,
} from './StyledComponents'

interface MovieCardProps {
  id: number
  title: string
  posterPath: string | null
  rating: number
  to: string
}

export const MovieCard = ({ id, title, posterPath, rating, to }: MovieCardProps) => (
  <StyledCard>
    <StyledCardLink to={to} aria-label={`View ${title}`}>
      <PosterImage path={posterPath} alt={title} />
      <StyledRatingWrapper>
        <RatingBadge rating={rating} />
      </StyledRatingWrapper>
      <StyledWatchlistWrapper onClick={(event) => event.preventDefault()}>
        <WatchlistToggle />
      </StyledWatchlistWrapper>
      <StyledTitle>{title}</StyledTitle>
    </StyledCardLink>
  </StyledCard>
)