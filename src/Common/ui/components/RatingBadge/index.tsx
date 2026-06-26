import { StyledRatingBadge } from './StyledComponents'

interface RatingBadgeProps {
  rating: number
}

export const RatingBadge = ({ rating }: RatingBadgeProps) => (
  <StyledRatingBadge aria-label={`Rating ${rating.toFixed(1)} out of 10`}>
    ★ {rating.toFixed(1)}
  </StyledRatingBadge>
)