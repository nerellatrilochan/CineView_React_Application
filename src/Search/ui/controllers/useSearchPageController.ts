import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import type { AsyncStatus, SearchResultItem } from '@/Common'
import { tmdbService, useDebounce } from '@/Common'
import { usePreferencesSnapshot } from '@/Preferences'
import { SEARCH_DEBOUNCE_MS } from '../../core/constants/Search.constants'
import { RecentSearchService } from '../../data/services/RecentSearchService'

const recentSearchService = new RecentSearchService()

export const useSearchPageController = () => {
  const { t } = useTranslation('search')
  const { tmdbLanguage, region } = usePreferencesSnapshot()

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
    void Promise.resolve().then(() => {
      setQuery(queryFromUrl)
    })
  }, [queryFromUrl])

  useEffect(() => {
    let cancelled = false
    const trimmed = debouncedQuery.trim()

    if (!trimmed) {
      void Promise.resolve().then(() => {
        if (cancelled) return
        setResults([])
        setStatus('idle')
        setError(null)
      })
      return () => {
        cancelled = true
      }
    }

    const search = async () => {
      await Promise.resolve()
      if (cancelled) return
      setStatus('loading')
      setError(null)

      try {
        const response = await tmdbService.searchMulti(trimmed)
        if (cancelled) return
        setResults(response.results)
        setStatus('success')
        setRecentSearches(recentSearchService.addSearch(trimmed))
        setSearchParams({ q: trimmed }, { replace: true })
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : t('search:errors.searchFailed'))
        setStatus('error')
      }
    }

    void search()

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, setSearchParams, tmdbLanguage, region, t])

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