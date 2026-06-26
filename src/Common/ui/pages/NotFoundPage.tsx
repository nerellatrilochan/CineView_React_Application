import { useTranslation } from 'react-i18next'
import { PlaceholderPage } from '../components/PlaceholderPage'

export const NotFoundPage = () => {
  const { t } = useTranslation('common')

  return (
    <PlaceholderPage
      title={t('notFoundTitle')}
      description={t('notFoundDescription')}
    />
  )
}