import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ErrorBoundary } from '@/Common'
import { WatchlistCard } from '../components/WatchlistCard'
import { WatchlistEmptyState } from '../components/WatchlistEmptyState'
import { WatchlistFilters } from '../components/WatchlistFilters'
import { useWatchlistPageController } from '../controllers/useWatchlistPageController'

const StyledPage = styled.div`
  padding: 1.5rem;
  max-width: 72rem;
  margin: 0 auto;
`

const StyledHeader = styled.div`
  margin-bottom: 1.5rem;
`

const StyledTitle = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  color: var(--cv-text-primary);
`

const StyledDescription = styled.p`
  margin: 0;
  color: var(--cv-text-muted);
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 1rem;
`

export const WatchlistPage = () => {
  const { t } = useTranslation('collection')
  const {
    entries,
    statusCounts,
    filter,
    sortBy,
    setFilter,
    setSortBy,
    handleStatusChange,
    handleRemove,
    isEmpty,
    isFilterEmpty,
  } = useWatchlistPageController()

  return (
    <StyledPage>
      <StyledHeader>
        <StyledTitle>{t('watchlist.title')}</StyledTitle>
        <StyledDescription>{t('watchlist.pageDescription')}</StyledDescription>
      </StyledHeader>

      {!isEmpty && (
        <WatchlistFilters
          filter={filter}
          sortBy={sortBy}
          statusCounts={statusCounts}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
        />
      )}

      {isEmpty && <WatchlistEmptyState variant="empty" />}
      {isFilterEmpty && <WatchlistEmptyState variant="filter" />}

      {!isEmpty && !isFilterEmpty && (
        <StyledGrid>
          {entries.map((entry) => (
            <ErrorBoundary key={entry.id}>
              <WatchlistCard
                entry={entry}
                onStatusChange={(status) => handleStatusChange(entry.id, status)}
                onRemove={() => handleRemove(entry.mediaType, entry.mediaId)}
              />
            </ErrorBoundary>
          ))}
        </StyledGrid>
      )}
    </StyledPage>
  )
}