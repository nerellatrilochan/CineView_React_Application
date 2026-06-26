import { useCallback, useEffect, useState } from 'react'
import type { AsyncStatus, SeasonDetail } from '@/Common'
import { TmdbNotFoundError, tmdbService } from '@/Common'

export const useSeasonDetailController = (
  showId: number,
  seasonNumber: number,
) => {
  const [season, setSeason] = useState<SeasonDetail | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSeason = useCallback(async () => {
    setStatus('loading')
    setIsNotFound(false)
    setError(null)

    try {
      const details = await tmdbService.getSeasonDetails(showId, seasonNumber)
      setSeason(details)
      setStatus('success')
    } catch (err) {
      if (err instanceof TmdbNotFoundError) {
        setIsNotFound(true)
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load season')
      }
      setStatus('error')
    }
  }, [showId, seasonNumber])

  useEffect(() => {
    void loadSeason()
  }, [loadSeason])

  return { season, status, isNotFound, error }
}