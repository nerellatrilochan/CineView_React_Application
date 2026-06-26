import { useState } from 'react'
import {
  ErrorBoundary,
  SectionState,
  TrailerModal,
} from '@/Common'
import { ContentRow } from '../components/ContentRow'
import { GenreFilter } from '../components/GenreFilter'
import { HeroBanner } from '../components/HeroBanner'
import { useHomePageController } from '../controllers/useHomePageController'
import styled from 'styled-components'

const StyledPage = styled.div`
  padding-bottom: 2rem;
`

const StyledVisuallyHiddenTitle = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const HomePage = () => {
  const {
    genres,
    genresStatus,
    activeGenreId,
    setActiveGenreId,
    heroMovie,
    heroStatus,
    heroError,
    rows,
  } = useHomePageController()

  const [isTrailerOpen, setIsTrailerOpen] = useState(false)

  return (
    <StyledPage>
      <StyledVisuallyHiddenTitle>Home</StyledVisuallyHiddenTitle>

      <ErrorBoundary>
        <SectionState status={heroStatus} error={heroError} isEmpty={!heroMovie}>
          {heroMovie && (
            <HeroBanner
              movie={heroMovie}
              hasTrailer
              onPlayTrailer={() => setIsTrailerOpen(true)}
            />
          )}
        </SectionState>
      </ErrorBoundary>

      {genresStatus === 'success' && (
        <GenreFilter
          genres={genres}
          activeGenreId={activeGenreId}
          onSelect={setActiveGenreId}
        />
      )}

      <ContentRow title="Trending" {...rows.trending} />
      <ContentRow title="Popular" {...rows.popular} />
      <ContentRow title="Top Rated" {...rows.topRated} />
      <ContentRow title="Upcoming" {...rows.upcoming} />

      {heroMovie && (
        <TrailerModal
          isOpen={isTrailerOpen}
          youtubeKey={null}
          title={heroMovie.title}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
    </StyledPage>
  )
}