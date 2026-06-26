import { SectionState, TextInput } from '@/Common'
import { RecentSearches } from '../components/RecentSearches'
import { SearchResultGroup } from '../components/SearchResultGroup'
import { useSearchPageController } from '../controllers/useSearchPageController'
import styled from 'styled-components'

const StyledPage = styled.div`
  padding: 1.5rem 0 2rem;
`

const StyledHeader = styled.div`
  padding: 0 1.5rem 1rem;
`

const StyledTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.75rem;
  color: #f8fafc;
`

export const SearchPage = () => {
  const {
    query,
    setQuery,
    status,
    error,
    groupedResults,
    recentSearches,
    selectRecentSearch,
    clearRecentSearches,
  } = useSearchPageController()

  const hasQuery = query.trim().length > 0
  const hasResults =
    groupedResults.movies.length > 0 ||
    groupedResults.tvShows.length > 0 ||
    groupedResults.people.length > 0

  return (
    <StyledPage>
      <StyledHeader>
        <StyledTitle>Search</StyledTitle>
        <TextInput
          label="Search"
          value={query}
          placeholder="Search movies, TV shows, people…"
          onChange={(event) => setQuery(event.target.value)}
        />
      </StyledHeader>

      {!hasQuery && (
        <RecentSearches
          searches={recentSearches}
          onSelect={selectRecentSearch}
          onClear={clearRecentSearches}
        />
      )}

      {hasQuery && (
        <SectionState
          status={status}
          error={error}
          isEmpty={status === 'success' && !hasResults}
          emptyMessage="No results found for your search."
        >
          <SearchResultGroup title="Movies" items={groupedResults.movies} />
          <SearchResultGroup title="TV Shows" items={groupedResults.tvShows} />
          <SearchResultGroup title="People" items={groupedResults.people} />
        </SectionState>
      )}
    </StyledPage>
  )
}