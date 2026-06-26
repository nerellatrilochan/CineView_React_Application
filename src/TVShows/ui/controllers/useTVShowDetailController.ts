import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AsyncStatus, CastMember, TVShowDetail } from '@/Common'
import { TmdbNotFoundError, tmdbService } from '@/Common'
import { usePreferencesSnapshot } from '@/Preferences'

export const useTVShowDetailController = (showId: number) => {
  const { t } = useTranslation('tvShows')
  const { tmdbLanguage, region } = usePreferencesSnapshot()

  const [show, setShow] = useState<TVShowDetail | null>(null)
  const [fetchStatus, setFetchStatus] = useState<AsyncStatus>('idle')
  const [isNotFound, setIsNotFound] = useState(false)

  const [cast, setCast] = useState<CastMember[]>([])
  const [castStatus, setCastStatus] = useState<AsyncStatus>('idle')
  const [castError, setCastError] = useState<string | null>(null)

  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  useEffect(() => {
    if (!showId) return

    let cancelled = false

    const loadShow = async () => {
      await Promise.resolve()
      if (cancelled) return
      setFetchStatus('loading')
      setIsNotFound(false)

      try {
        const details = await tmdbService.getTVShowDetails(showId)
        if (cancelled) return
        setShow(details)
        setFetchStatus('success')
      } catch (error) {
        if (cancelled) return
        if (error instanceof TmdbNotFoundError) setIsNotFound(true)
        setFetchStatus('error')
      }
    }

    void loadShow()

    return () => {
      cancelled = true
    }
  }, [showId, tmdbLanguage, region])

  useEffect(() => {
    if (fetchStatus !== 'success' || !showId) return

    let cancelled = false

    const loadExtras = async () => {
      await Promise.resolve()
      if (cancelled) return
      setCastStatus('loading')
      try {
        const credits = await tmdbService.getTVShowCredits(showId)
        if (cancelled) return
        setCast(credits.cast.slice(0, 20))
        setCastStatus('success')
      } catch (error) {
        if (cancelled) return
        setCastError(
          error instanceof Error ? error.message : t('tvShows:errors.loadCast'),
        )
        setCastStatus('error')
      }

      try {
        const videos = await tmdbService.getTVShowVideos(showId)
        if (cancelled) return
        const trailer = videos.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer',
        )
        setTrailerKey(trailer?.key ?? null)
      } catch {
        if (cancelled) return
        setTrailerKey(null)
      }
    }

    void loadExtras()

    return () => {
      cancelled = true
    }
  }, [fetchStatus, showId, tmdbLanguage, region, t])

  const seasons = useMemo(
    () => show?.seasons.filter((season) => season.season_number > 0) ?? [],
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