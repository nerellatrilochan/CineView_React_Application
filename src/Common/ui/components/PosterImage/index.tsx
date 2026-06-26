import { getPosterUrl } from '../../../core/utils/TmdbImage.utils'
import {
  StyledPosterFallback,
  StyledPosterImage,
  StyledPosterWrapper,
} from './StyledComponents'

interface PosterImageProps {
  path: string | null
  alt: string
  aspectRatio?: string
}

export const PosterImage = ({
  path,
  alt,
  aspectRatio = '2 / 3',
}: PosterImageProps) => {
  const imageUrl = getPosterUrl(path)

  return (
    <StyledPosterWrapper $aspectRatio={aspectRatio}>
      {imageUrl ? (
        <StyledPosterImage src={imageUrl} alt={alt} loading="lazy" />
      ) : (
        <StyledPosterFallback>No image</StyledPosterFallback>
      )}
    </StyledPosterWrapper>
  )
}