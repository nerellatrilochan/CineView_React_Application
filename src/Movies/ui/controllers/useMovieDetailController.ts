import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AsyncStatus, CastMember, MovieDetail, MovieSummary } from '@/Common'
import { TmdbNotFoundError, tmdbService } from '@/Common'

export const useMovieDetailController = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [fetchStatus, setFetchStatus] = useState<AsyncStatus>('idle')
  const [isNotFound, setIsNotFound] = useState(false)

  const [videosStatus, setVideosStatus] = useState<AsyncStatus>('idle')
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  const [cast, setCast] = useState<CastMember[]>([])
  const [castStatus, setCastStatus] = useState<AsyncStatus>('idle')
  const [castError, setCastError] = useState<string | null>(null)

  const [similar, setSimilar] = useState<MovieSummary[]>([])
  const [similarStatus, setSimilarStatus] = useState<AsyncStatus>('idle')
  const [similarError, setSimilarError] = useState<string | null>(null)

  const [recommended, setRecommended] = useState<MovieSummary[]>([])
  const [recommendedStatus, setRecommendedStatus] = useState<AsyncStatus>('idle')
  const [recommendedError, setRecommendedError] = useState<string | null>(null)

  const loadMovie = useCallback(async () => {
    setFetchStatus('loading')
    setIsNotFound(false)

    try {
      const details = await tmdbService.getMovieDetails(movieId)
      setMovie(details)
      setFetchStatus('success')
    } catch (error) {
      if (error instanceof TmdbNotFoundError) {
        setIsNotFound(true)
      }
      setFetchStatus('error')
    }
  }, [movieId])

  useEffect(() => {
    void loadMovie()
  }, [loadMovie])

  useEffect(() => {
    if (fetchStatus !== 'success') return

    const loadVideos = async () => {
      setVideosStatus('loading')
      try {
        const response = await tmdbService.getMovieVideos(movieId)
        const trailer = response.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer',
        )
        setTrailerKey(trailer?.key ?? null)
        setVideosStatus('success')
      } catch {
        setVideosStatus('error')
      }
    }

    const loadCast = async () => {
      setCastStatus('loading')
      try {
        const response = await tmdbService.getMovieCredits(movieId)
        setCast(response.cast.slice(0, 20))
        setCastStatus('success')
      } catch (error) {
        setCastError(error instanceof Error ? error.message : 'Failed to load cast')
        setCastStatus('error')
      }
    }

    const loadSimilar = async () => {
      setSimilarStatus('loading')
      try {
        const response = await tmdbService.getSimilarMovies(movieId)
        setSimilar(response.results)
        setSimilarStatus('success')
      } catch (error) {
        setSimilarError(error instanceof Error ? error.message : 'Failed to load similar movies')
        setSimilarStatus('error')
      }
    }

    const loadRecommended = async () => {
      setRecommendedStatus('loading')
      try {
        const response = await tmdbService.getRecommendedMovies(movieId)
        setRecommended(response.results)
        setRecommendedStatus('success')
      } catch (error) {
        setRecommendedError(
          error instanceof Error ? error.message : 'Failed to load recommendations',
        )
        setRecommendedStatus('error')
      }
    }

    void loadVideos()
    void loadCast()
    void loadSimilar()
    void loadRecommended()
  }, [fetchStatus, movieId])

  const hasTrailer = useMemo(() => trailerKey !== null, [trailerKey])

  return {
    movie,
    fetchStatus,
    isNotFound,
    hasTrailer,
    trailerKey,
    videosStatus,
    cast,
    castStatus,
    castError,
    similar,
    similarStatus,
    similarError,
    recommended,
    recommendedStatus,
    recommendedError,
  }
}