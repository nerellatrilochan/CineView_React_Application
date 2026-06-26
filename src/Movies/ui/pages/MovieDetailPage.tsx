import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ErrorBoundary,
  getBackdropUrl,
  SectionState,
  TrailerModal,
} from '@/Common'
import { CastCarousel } from '../components/CastCarousel'
import { ContentRow } from '../components/ContentRow'
import { MovieMetadata } from '../components/MovieMetadata'
import { useMovieDetailController } from '../controllers/useMovieDetailController'
import styled from 'styled-components'

const StyledPage = styled.div`
  min-height: 100%;
`

const StyledBackdrop = styled.div<{ $url: string | null }>`
  height: 16rem;
  background-color: #020617;
  background-image: ${({ $url }) => ($url ? `url(${$url})` : 'none')};
  background-size: cover;
  background-position: center;
`

const StyledNotFound = styled.div`
  padding: 4rem 1.5rem;
  text-align: center;
  color: #94a3b8;

  h1 {
    color: #f8fafc;
    margin-bottom: 0.5rem;
  }
`

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>()
  const parsedId = Number(movieId)
  const isValidId = Number.isFinite(parsedId) && parsedId > 0

  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  const {
    movie,
    fetchStatus,
    isNotFound,
    hasTrailer,
    trailerKey,
    cast,
    castStatus,
    castError,
    similar,
    similarStatus,
    similarError,
    recommended,
    recommendedStatus,
    recommendedError,
  } = useMovieDetailController(isValidId ? parsedId : 0)

  if (!isValidId || isNotFound) {
    return (
      <StyledNotFound>
        <h1>Movie Not Found</h1>
        <p>The movie you are looking for does not exist or is unavailable.</p>
      </StyledNotFound>
    )
  }

  return (
    <StyledPage>
      <SectionState status={fetchStatus} isEmpty={!movie}>
        {movie && (
          <>
            <StyledBackdrop $url={getBackdropUrl(movie.backdrop_path)} aria-hidden />
            <ErrorBoundary>
              <MovieMetadata
                movie={movie}
                hasTrailer={hasTrailer}
                onPlayTrailer={() => setIsTrailerOpen(true)}
              />
            </ErrorBoundary>

            <CastCarousel cast={cast} status={castStatus} error={castError} />
            <ContentRow title="Similar" items={similar} status={similarStatus} error={similarError} />
            <ContentRow
              title="Recommended"
              items={recommended}
              status={recommendedStatus}
              error={recommendedError}
            />

            <TrailerModal
              isOpen={isTrailerOpen}
              youtubeKey={trailerKey}
              title={movie.title}
              onClose={() => setIsTrailerOpen(false)}
            />
          </>
        )}
      </SectionState>
    </StyledPage>
  )
}