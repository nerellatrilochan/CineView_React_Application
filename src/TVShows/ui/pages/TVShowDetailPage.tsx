import { Outlet, useParams } from 'react-router-dom'
import { PlaceholderPage } from '@/Common'

export const TVShowDetailPage = () => {
  const { showId } = useParams<{ showId: string }>()

  return (
    <>
      <PlaceholderPage
        title="TV Show Detail"
        description={`Show ID: ${showId ?? 'unknown'} — coming in Milestone 3.`}
      />
      <Outlet />
    </>
  )
}