import { useTranslation } from 'react-i18next'
import { StyledSpinner } from './StyledComponents'

export const Spinner = () => {
  const { t } = useTranslation('common')

  return <StyledSpinner role="status" aria-label={t('loading')} />
}