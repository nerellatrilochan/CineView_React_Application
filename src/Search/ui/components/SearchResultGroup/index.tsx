import {
  buildMovieDetailPath,
  buildTVShowDetailPath,
  ErrorBoundary,
  HorizontalScrollRow,
} from '@/Common'
import type { SearchResultItem } from '@/Common'
import { MovieCard } from '@/Movies'
import { PersonCard } from '../PersonCard'
import { StyledGroup, StyledHeading } from './StyledComponents'

interface SearchResultGroupProps {
  title: string
  items: SearchResultItem[]
}

const SearchResultGroupContent = ({ title, items }: SearchResultGroupProps) => {
  if (items.length === 0) return null

  return (
    <StyledGroup aria-label={title}>
      <StyledHeading>{title}</StyledHeading>
      <HorizontalScrollRow>
        {items.map((item) => {
          if (item.media_type === 'movie') {
            return (
              <MovieCard
                key={`movie-${item.id}`}
                title={item.title}
                posterPath={item.poster_path}
                rating={item.vote_average}
                to={buildMovieDetailPath(item.id)}
                mediaId={item.id}
                mediaType="movie"
              />
            )
          }

          if (item.media_type === 'tv') {
            return (
              <MovieCard
                key={`tv-${item.id}`}
                title={item.name}
                posterPath={item.poster_path}
                rating={item.vote_average}
                to={buildTVShowDetailPath(item.id)}
                mediaId={item.id}
                mediaType="tv"
              />
            )
          }

          return <PersonCard key={`person-${item.id}`} person={item} />
        })}
      </HorizontalScrollRow>
    </StyledGroup>
  )
}

export const SearchResultGroup = (props: SearchResultGroupProps) => (
  <ErrorBoundary>
    <SearchResultGroupContent {...props} />
  </ErrorBoundary>
)