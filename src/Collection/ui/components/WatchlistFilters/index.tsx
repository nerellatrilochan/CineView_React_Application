import { useTranslation } from 'react-i18next'
import { WATCHLIST_SORT_OPTIONS } from '../../../core/constants/Watchlist.constants'
import type {
  WatchlistFilter,
  WatchlistSortOption,
  WatchlistStatusCounts,
} from '../../../core/types/Watchlist.types'
import {
  StyledSortGroup,
  StyledSortSelect,
  StyledTabButton,
  StyledTabList,
  StyledToolbar,
} from './StyledComponents'

interface WatchlistFiltersProps {
  filter: WatchlistFilter
  sortBy: WatchlistSortOption
  statusCounts: WatchlistStatusCounts
  onFilterChange: (filter: WatchlistFilter) => void
  onSortChange: (sortBy: WatchlistSortOption) => void
}

const FILTER_OPTIONS: WatchlistFilter[] = [
  'all',
  'want_to_watch',
  'watching',
  'completed',
]

export const WatchlistFilters = ({
  filter,
  sortBy,
  statusCounts,
  onFilterChange,
  onSortChange,
}: WatchlistFiltersProps) => {
  const { t } = useTranslation('collection')

  return (
    <StyledToolbar>
      <StyledTabList role="tablist" aria-label={t('watchlist.filters.label')}>
        {FILTER_OPTIONS.map((option) => (
          <StyledTabButton
            key={option}
            type="button"
            role="tab"
            aria-selected={filter === option}
            $active={filter === option}
            onClick={() => onFilterChange(option)}
          >
            {t(`watchlist.filters.${option}`, {
              count: statusCounts[option],
            })}
          </StyledTabButton>
        ))}
      </StyledTabList>

      <StyledSortGroup>
        <span>{t('watchlist.sort.label')}</span>
        <StyledSortSelect
          value={sortBy}
          aria-label={t('watchlist.sort.label')}
          onChange={(event) =>
            onSortChange(event.target.value as WatchlistSortOption)
          }
        >
          {WATCHLIST_SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {t(`watchlist.sort.${option}`)}
            </option>
          ))}
        </StyledSortSelect>
      </StyledSortGroup>
    </StyledToolbar>
  )
}