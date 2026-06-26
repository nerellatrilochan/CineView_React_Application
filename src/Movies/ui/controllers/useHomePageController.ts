import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AsyncStatus, Genre, MovieSummary } from '@/Common'
import { tmdbService } from '@/Common'

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

  const loadRow = useCallback(async (key: RowKey, fetcher: () => Promise<{ results: MovieSummary[] }>) => {
    setRows((prev) => ({
      ...prev,
      [key]: { ...prev[key], status: 'loading', error: null },
    }))

    try {
      const response = await fetcher()
      setRows((prev) => ({
        ...prev,
        [key]: { items: response.results, status: 'success', error: null },
      }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load'
      setRows((prev) => ({
        ...prev,
        [key]: { items: [], status: 'error', error: message },
      }))
    }
  }, [])

  useEffect(() => {
    const loadHero = async () => {
      setHeroStatus('loading')
      try {
        const response = await tmdbService.getTrendingMovies()
        const featured =
          response.results.find((movie) => movie.backdrop_path) ??
          response.results[0] ??
          null
        setHeroMovie(featured)
        setHeroStatus('success')
      } catch (error) {
        setHeroError(error instanceof Error ? error.message : 'Failed to load hero')
        setHeroStatus('error')
      }
    }

    const loadGenres = async () => {
      setGenresStatus('loading')
      try {
        const response = await tmdbService.getMovieGenres()
        setGenres(response.genres)
        setGenresStatus('success')
      } catch {
        setGenresStatus('error')
      }
    }

    void loadHero()
    void loadGenres()
    void loadRow('trending', () => tmdbService.getTrendingMovies())
    void loadRow('popular', () => tmdbService.getPopularMovies())
    void loadRow('topRated', () => tmdbService.getTopRatedMovies())
    void loadRow('upcoming', () => tmdbService.getUpcomingMovies())
  }, [loadRow])

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