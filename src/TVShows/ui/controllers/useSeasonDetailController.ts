import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AsyncStatus, SeasonDetail } from '@/Common'
import { TmdbNotFoundError, tmdbService } from '@/Common'
import { usePreferencesSnapshot } from '@/Preferences'

export const useSeasonDetailController = (
  showId: number,
  seasonNumber: number,
) => {
  const { t } = useTranslation('tvShows')
  const { tmdbLanguage, region } = usePreferencesSnapshot()

  const [season, setSeason] = useState<SeasonDetail | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!showId) return

    let cancelled = false

    const loadSeason = async () => {
      await Promise.resolve()
      if (cancelled) return
      setStatus('loading')
      setIsNotFound(false)
      setError(null)

      try {
        const details = await tmdbService.getSeasonDetails(showId, seasonNumber)
        if (cancelled) return
        setSeason(details)
        setStatus('success')
      } catch (err) {
        if (cancelled) return
        if (err instanceof TmdbNotFoundError) {
          setIsNotFound(true)
        } else {
          setError(
            err instanceof Error ? err.message : t('tvShows:errors.loadSeason'),
          )
        }
        setStatus('error')
      }
    }

    void loadSeason()

    return () => {
      cancelled = true
    }
  }, [showId, seasonNumber, tmdbLanguage, region, t])

  return { season, status, isNotFound, error }
}