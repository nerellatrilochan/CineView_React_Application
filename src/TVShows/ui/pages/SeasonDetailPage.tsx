import { useParams } from 'react-router-dom'
import { PlaceholderPage } from '@/Common'

export const SeasonDetailPage = () => {
  const { showId, seasonNumber } = useParams<{ showId: string; seasonNumber: string }>()

  return (
    <PlaceholderPage
      title="Season Detail"
      description={`Show ${showId ?? '?'} — Season ${seasonNumber ?? '?'} — coming in Milestone 3.`}
    />
  )
}