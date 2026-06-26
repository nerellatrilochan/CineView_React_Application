import { RatingBadge, WatchlistToggle } from '@/Common'
import { PosterImage } from '@/Common'
import { useWatchlistMediaToggle, type WatchlistMediaType } from '@/Collection'
import {
  StyledCard,
  StyledCardLink,
  StyledRatingWrapper,
  StyledTitle,
  StyledWatchlistWrapper,
} from './StyledComponents'

interface MovieCardProps {
  title: string
  posterPath: string | null
  rating: number
  to: string
  mediaId: number
  mediaType?: WatchlistMediaType
}

export const MovieCard = ({
  title,
  posterPath,
  rating,
  to,
  mediaId,
  mediaType = 'movie',
}: MovieCardProps) => {
  const { isInWatchlist, onToggle } = useWatchlistMediaToggle({
    mediaType,
    mediaId,
    title,
    posterPath,
    rating,
  })

  return (
    <StyledCard>
      <StyledCardLink to={to} aria-label={`View ${title}`}>
        <PosterImage path={posterPath} alt={title} />
        <StyledRatingWrapper>
          <RatingBadge rating={rating} />
        </StyledRatingWrapper>
        <StyledWatchlistWrapper
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          <WatchlistToggle isInWatchlist={isInWatchlist} onToggle={onToggle} />
        </StyledWatchlistWrapper>
        <StyledTitle>{title}</StyledTitle>
      </StyledCardLink>
    </StyledCard>
  )
}