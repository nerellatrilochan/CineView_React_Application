import { useTranslation } from 'react-i18next'
import { PlaceholderPage } from '@/Common'

export const WatchlistPage = () => {
  const { t } = useTranslation('collection')

  return (
    <PlaceholderPage
      title={t('watchlist.title')}
      description={t('watchlist.description')}
    />
  )
}