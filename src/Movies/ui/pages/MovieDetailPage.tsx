import { useParams } from 'react-router-dom'
import { PlaceholderPage } from '@/Common'

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>()

  return (
    <PlaceholderPage
      title="Movie Detail"
      description={`Movie ID: ${movieId ?? 'unknown'} — coming in Milestone 3.`}
    />
  )
}