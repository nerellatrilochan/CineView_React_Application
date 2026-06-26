import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import {
  ErrorBoundary,
  getBackdropUrl,
  SectionState,
  TrailerModal,
} from '@/Common'
import { CastCarousel } from '@/Movies'
import { SeasonList } from '../components/SeasonList'
import { TVShowMetadata } from '../components/TVShowMetadata'
import { useTVShowDetailController } from '../controllers/useTVShowDetailController'
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

const StyledOutlet = styled.div`
  border-top: 1px solid #1e293b;
`

export const TVShowDetailPage = () => {
  const { showId } = useParams<{ showId: string }>()
  const parsedId = Number(showId)
  const isValidId = Number.isFinite(parsedId) && parsedId > 0

  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  const {
    show,
    fetchStatus,
    isNotFound,
    seasons,
    cast,
    castStatus,
    castError,
    hasTrailer,
    trailerKey,
  } = useTVShowDetailController(isValidId ? parsedId : 0)

  if (!isValidId || isNotFound) {
    return (
      <StyledNotFound>
        <h1>TV Show Not Found</h1>
        <p>The show you are looking for does not exist or is unavailable.</p>
      </StyledNotFound>
    )
  }

  return (
    <StyledPage>
      <SectionState status={fetchStatus} isEmpty={!show}>
        {show && (
          <>
            <StyledBackdrop $url={getBackdropUrl(show.backdrop_path)} aria-hidden />

            <ErrorBoundary>
              <TVShowMetadata
                show={show}
                hasTrailer={hasTrailer}
                onPlayTrailer={() => setIsTrailerOpen(true)}
              />
            </ErrorBoundary>

            <ErrorBoundary>
              <SeasonList showId={show.id} seasons={seasons} />
            </ErrorBoundary>

            <CastCarousel cast={cast} status={castStatus} error={castError} />

            <StyledOutlet>
              <Outlet />
            </StyledOutlet>

            <TrailerModal
              isOpen={isTrailerOpen}
              youtubeKey={trailerKey}
              title={show.name}
              onClose={() => setIsTrailerOpen(false)}
            />
          </>
        )}
      </SectionState>
    </StyledPage>
  )
}