import { useParams } from 'react-router-dom'
import { EpisodeList } from '../components/EpisodeList'
import { useSeasonDetailController } from '../controllers/useSeasonDetailController'

export const SeasonDetailPage = () => {
  const { showId, seasonNumber } = useParams<{
    showId: string
    seasonNumber: string
  }>()

  const parsedShowId = Number(showId)
  const parsedSeasonNumber = Number(seasonNumber)
  const isValid =
    Number.isFinite(parsedShowId) &&
    parsedShowId > 0 &&
    Number.isFinite(parsedSeasonNumber) &&
    parsedSeasonNumber >= 0

  const { season, status, isNotFound, error } = useSeasonDetailController(
    isValid ? parsedShowId : 0,
    isValid ? parsedSeasonNumber : 0,
  )

  return (
    <EpisodeList
      seasonName={season?.name ?? `Season ${seasonNumber ?? ''}`}
      episodes={season?.episodes ?? []}
      status={status}
      error={error}
      isNotFound={isNotFound}
    />
  )
}