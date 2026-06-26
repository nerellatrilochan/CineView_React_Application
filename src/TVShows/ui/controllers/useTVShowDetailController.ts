import { useCallback, useEffect, useMemo, useState } from 'react'
import type { AsyncStatus, CastMember, TVShowDetail } from '@/Common'
import { TmdbNotFoundError, tmdbService } from '@/Common'

export const useTVShowDetailController = (showId: number) => {
  const [show, setShow] = useState<TVShowDetail | null>(null)
  const [fetchStatus, setFetchStatus] = useState<AsyncStatus>('idle')
  const [isNotFound, setIsNotFound] = useState(false)

  const [cast, setCast] = useState<CastMember[]>([])
  const [castStatus, setCastStatus] = useState<AsyncStatus>('idle')
  const [castError, setCastError] = useState<string | null>(null)

  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  const loadShow = useCallback(async () => {
    setFetchStatus('loading')
    setIsNotFound(false)

    try {
      const details = await tmdbService.getTVShowDetails(showId)
      setShow(details)
      setFetchStatus('success')
    } catch (error) {
      if (error instanceof TmdbNotFoundError) setIsNotFound(true)
      setFetchStatus('error')
    }
  }, [showId])

  useEffect(() => {
    void loadShow()
  }, [loadShow])

  useEffect(() => {
    if (fetchStatus !== 'success') return

    const loadExtras = async () => {
      setCastStatus('loading')
      try {
        const credits = await tmdbService.getTVShowCredits(showId)
        setCast(credits.cast.slice(0, 20))
        setCastStatus('success')
      } catch (error) {
        setCastError(error instanceof Error ? error.message : 'Failed to load cast')
        setCastStatus('error')
      }

      try {
        const videos = await tmdbService.getTVShowVideos(showId)
        const trailer = videos.results.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer',
        )
        setTrailerKey(trailer?.key ?? null)
      } catch {
        setTrailerKey(null)
      }
    }

    void loadExtras()
  }, [fetchStatus, showId])

  const seasons = useMemo(
    () => show?.seasons.filter((s) => s.season_number > 0) ?? [],
    [show],
  )

  const hasTrailer = trailerKey !== null

  return {
    show,
    fetchStatus,
    isNotFound,
    seasons,
    cast,
    castStatus,
    castError,
    hasTrailer,
    trailerKey,
  }
}