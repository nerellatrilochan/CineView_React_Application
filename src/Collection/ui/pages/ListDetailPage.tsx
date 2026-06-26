import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { PlaceholderPage } from '@/Common'

export const ListDetailPage = () => {
  const { t } = useTranslation('collection')
  const { listId } = useParams<{ listId: string }>()

  return (
    <PlaceholderPage
      title={t('listDetail.title')}
      description={t('listDetail.descriptionWithId', {
        listId: listId ?? 'unknown',
      })}
    />
  )
}