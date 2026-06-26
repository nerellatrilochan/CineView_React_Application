import { useParams } from 'react-router-dom'
import { PlaceholderPage } from '@/Common'

export const ListDetailPage = () => {
  const { listId } = useParams<{ listId: string }>()

  return (
    <PlaceholderPage
      title="List Detail"
      description={`List ID: ${listId ?? 'unknown'} — coming in Milestone 6.`}
    />
  )
}