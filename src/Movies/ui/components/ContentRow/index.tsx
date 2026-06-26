import {
  buildMovieDetailPath,
  ErrorBoundary,
  HorizontalScrollRow,
  SectionState,
} from '@/Common'
import type { AsyncStatus, MovieSummary } from '@/Common'
import { MovieCard } from '../MovieCard'
import { StyledHeading, StyledSection } from './StyledComponents'

interface ContentRowProps {
  title: string
  items: MovieSummary[]
  status: AsyncStatus
  error?: string | null
}

const ContentRowContent = ({
  title,
  items,
  status,
  error,
}: ContentRowProps) => (
  <StyledSection aria-label={title}>
    <StyledHeading>{title}</StyledHeading>
    <SectionState
      status={status}
      error={error}
      isEmpty={items.length === 0}
      emptyMessage={`No ${title.toLowerCase()} to display.`}
    >
      <HorizontalScrollRow>
        {items.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            rating={movie.vote_average}
            to={buildMovieDetailPath(movie.id)}
          />
        ))}
      </HorizontalScrollRow>
    </SectionState>
  </StyledSection>
)

export const ContentRow = (props: ContentRowProps) => (
  <ErrorBoundary>
    <ContentRowContent {...props} />
  </ErrorBoundary>
)