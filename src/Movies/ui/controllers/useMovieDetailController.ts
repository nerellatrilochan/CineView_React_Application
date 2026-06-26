import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AsyncStatus, CastMember, MovieDetail, MovieSummary } from '@/Common'
import { TmdbNotFoundError, tmdbService } from '@/Common'
import { usePreferencesSnapshot } from '@/Preferences'

export const useMovieDetailController = (movieId: number) => {
  const { t } = useTranslation('movies')
  const { tmdbLanguage, region } = usePreferencesSnapshot()

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

  useEffect(() => {
    if (!movieId) return

    let cancelled = false

    const loadMovie = async () => {
      await Promise.resolve()
      if (cancelled) return
      setFetchStatus('loading')
      setIsNotFound(false)

      try {
        const details = await tmdbService.getMovieDetails(movieId)
        if (cancelled) return
        setMovie(details)
        setFetchStatus('success')
      } catch (error) {
        if (cancelled) return
        if (error instanceof TmdbNotFoundError) {
          setIsNotFound(true)
        }
        setFetchStatus('error')
      }
    }

    void loadMovie()

    return () => {
      cancelled = true
    }
  }, [movieId, tmdbLanguage, region])

  useEffect(() => {
    if (fetchStatus !== 'success' || !movieId) return

    let cancelled = false

    const loadVideos = async () => {
      await Promise.resolve()
      if (cancelled) return
      setVideosStatus('loading')
      try {
        const response = await tmdbService.getMovieVideos(movieId)
        if (cancelled) return
        const trailer = response.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer',
        )
        setTrailerKey(trailer?.key ?? null)
        setVideosStatus('success')
      } catch {
        if (cancelled) return
        setVideosStatus('error')
      }
    }

    const loadCast = async () => {
      await Promise.resolve()
      if (cancelled) return
      setCastStatus('loading')
      try {
        const response = await tmdbService.getMovieCredits(movieId)
        if (cancelled) return
        setCast(response.cast.slice(0, 20))
        setCastStatus('success')
      } catch (error) {
        if (cancelled) return
        setCastError(
          error instanceof Error ? error.message : t('movies:errors.loadCast'),
        )
        setCastStatus('error')
      }
    }

    const loadSimilar = async () => {
      await Promise.resolve()
      if (cancelled) return
      setSimilarStatus('loading')
      try {
        const response = await tmdbService.getSimilarMovies(movieId)
        if (cancelled) return
        setSimilar(response.results)
        setSimilarStatus('success')
      } catch (error) {
        if (cancelled) return
        setSimilarError(
          error instanceof Error ? error.message : t('movies:errors.loadSimilar'),
        )
        setSimilarStatus('error')
      }
    }

    const loadRecommended = async () => {
      await Promise.resolve()
      if (cancelled) return
      setRecommendedStatus('loading')
      try {
        const response = await tmdbService.getRecommendedMovies(movieId)
        if (cancelled) return
        setRecommended(response.results)
        setRecommendedStatus('success')
      } catch (error) {
        if (cancelled) return
        setRecommendedError(
          error instanceof Error
            ? error.message
            : t('movies:errors.loadRecommended'),
        )
        setRecommendedStatus('error')
      }
    }

    void loadVideos()
    void loadCast()
    void loadSimilar()
    void loadRecommended()

    return () => {
      cancelled = true
    }
  }, [fetchStatus, movieId, tmdbLanguage, region, t])

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