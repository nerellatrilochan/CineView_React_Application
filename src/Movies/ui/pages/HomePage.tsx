import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorBoundary, SectionState, TrailerModal } from '@/Common'
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
  const { t } = useTranslation('movies')
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
      <StyledVisuallyHiddenTitle>{t('home.title')}</StyledVisuallyHiddenTitle>

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

      <ContentRow title={t('rows.trending')} {...rows.trending} />
      <ContentRow title={t('rows.popular')} {...rows.popular} />
      <ContentRow title={t('rows.topRated')} {...rows.topRated} />
      <ContentRow title={t('rows.upcoming')} {...rows.upcoming} />

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