import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AsyncStatus, Genre, MovieSummary } from '@/Common'
import { tmdbService } from '@/Common'
import { usePreferencesSnapshot } from '@/Preferences'

type RowKey = 'trending' | 'popular' | 'topRated' | 'upcoming'

interface RowState {
  items: MovieSummary[]
  status: AsyncStatus
  error: string | null
}

const createInitialRowState = (): RowState => ({
  items: [],
  status: 'idle',
  error: null,
})

const filterByGenre = (
  movies: MovieSummary[],
  genreId: number | null,
): MovieSummary[] => {
  if (genreId === null) return movies
  return movies.filter((movie) => movie.genre_ids?.includes(genreId))
}

export const useHomePageController = () => {
  const { t } = useTranslation('movies')
  const { tmdbLanguage, region } = usePreferencesSnapshot()

  const [genres, setGenres] = useState<Genre[]>([])
  const [genresStatus, setGenresStatus] = useState<AsyncStatus>('idle')
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null)
  const [heroMovie, setHeroMovie] = useState<MovieSummary | null>(null)
  const [heroStatus, setHeroStatus] = useState<AsyncStatus>('idle')
  const [heroError, setHeroError] = useState<string | null>(null)
  const [rows, setRows] = useState<Record<RowKey, RowState>>({
    trending: createInitialRowState(),
    popular: createInitialRowState(),
    topRated: createInitialRowState(),
    upcoming: createInitialRowState(),
  })

  useEffect(() => {
    let cancelled = false

    const loadRow = async (
      key: RowKey,
      fetcher: () => Promise<{ results: MovieSummary[] }>,
    ) => {
      await Promise.resolve()
      if (cancelled) return
      setRows((prev) => ({
        ...prev,
        [key]: { ...prev[key], status: 'loading', error: null },
      }))

      try {
        const response = await fetcher()
        if (cancelled) return
        setRows((prev) => ({
          ...prev,
          [key]: { items: response.results, status: 'success', error: null },
        }))
      } catch (error) {
        if (cancelled) return
        const message =
          error instanceof Error ? error.message : t('movies:errors.loadRow')
        setRows((prev) => ({
          ...prev,
          [key]: { items: [], status: 'error', error: message },
        }))
      }
    }

    const loadHero = async () => {
      await Promise.resolve()
      if (cancelled) return
      setHeroStatus('loading')
      try {
        const response = await tmdbService.getTrendingMovies()
        if (cancelled) return
        const featured =
          response.results.find((movie) => movie.backdrop_path) ??
          response.results[0] ??
          null
        setHeroMovie(featured)
        setHeroStatus('success')
      } catch (error) {
        if (cancelled) return
        setHeroError(
          error instanceof Error ? error.message : t('movies:errors.loadHero'),
        )
        setHeroStatus('error')
      }
    }

    const loadGenres = async () => {
      await Promise.resolve()
      if (cancelled) return
      setGenresStatus('loading')
      try {
        const response = await tmdbService.getMovieGenres()
        if (cancelled) return
        setGenres(response.genres)
        setGenresStatus('success')
      } catch {
        if (cancelled) return
        setGenresStatus('error')
      }
    }

    void loadHero()
    void loadGenres()
    void loadRow('trending', () => tmdbService.getTrendingMovies())
    void loadRow('popular', () => tmdbService.getPopularMovies())
    void loadRow('topRated', () => tmdbService.getTopRatedMovies())
    void loadRow('upcoming', () => tmdbService.getUpcomingMovies())

    return () => {
      cancelled = true
    }
  }, [tmdbLanguage, region, t])

  const filteredRows = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(rows).map(([key, row]) => [
          key,
          { ...row, items: filterByGenre(row.items, activeGenreId) },
        ]),
      ) as Record<RowKey, RowState>,
    [rows, activeGenreId],
  )

  return {
    genres,
    genresStatus,
    activeGenreId,
    setActiveGenreId,
    heroMovie,
    heroStatus,
    heroError,
    rows: filteredRows,
  }
}