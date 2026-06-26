import { useTranslation } from 'react-i18next'
import { PlaceholderPage } from '@/Common'

export const MyListsPage = () => {
  const { t } = useTranslation('collection')

  return (
    <PlaceholderPage
      title={t('myLists.title')}
      description={t('myLists.description')}
    />
  )
}