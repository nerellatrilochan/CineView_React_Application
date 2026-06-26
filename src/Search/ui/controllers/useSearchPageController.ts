import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { AsyncStatus, SearchResultItem } from '@/Common'
import { tmdbService, useDebounce } from '@/Common'
import { SEARCH_DEBOUNCE_MS } from '../../core/constants/Search.constants'
import { RecentSearchService } from '../../data/services/RecentSearchService'

const recentSearchService = new RecentSearchService()

export const useSearchPageController = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(queryFromUrl)
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS)

  const [results, setResults] = useState<SearchResultItem[]>([])
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    recentSearchService.getRecentSearches(),
  )

  useEffect(() => {
    setQuery(queryFromUrl)
  }, [queryFromUrl])

  useEffect(() => {
    const trimmed = debouncedQuery.trim()
    if (!trimmed) {
      setResults([])
      setStatus('idle')
      setError(null)
      return
    }

    const search = async () => {
      setStatus('loading')
      setError(null)

      try {
        const response = await tmdbService.searchMulti(trimmed)
        setResults(response.results)
        setStatus('success')
        setRecentSearches(recentSearchService.addSearch(trimmed))
        setSearchParams({ q: trimmed }, { replace: true })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
        setStatus('error')
      }
    }

    void search()
  }, [debouncedQuery, setSearchParams])

  const groupedResults = useMemo(
    () => ({
      movies: results.filter((item) => item.media_type === 'movie'),
      tvShows: results.filter((item) => item.media_type === 'tv'),
      people: results.filter((item) => item.media_type === 'person'),
    }),
    [results],
  )

  const selectRecentSearch = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const clearRecentSearches = useCallback(() => {
    recentSearchService.clearAll()
    setRecentSearches([])
  }, [])

  return {
    query,
    setQuery,
    status,
    error,
    groupedResults,
    recentSearches,
    selectRecentSearch,
    clearRecentSearches,
  }
}