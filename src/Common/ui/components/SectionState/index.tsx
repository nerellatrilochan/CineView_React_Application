import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { AsyncStatus } from '../../../core/types/Status.types'
import { Spinner } from '../Spinner'
import { StyledErrorText, StyledSectionState } from './StyledComponents'

interface SectionStateProps {
  status: AsyncStatus
  error?: string | null
  isEmpty?: boolean
  emptyMessage?: string
  children: ReactNode
}

export const SectionState = ({
  status,
  error,
  isEmpty = false,
  emptyMessage,
  children,
}: SectionStateProps) => {
  const { t } = useTranslation('common')
  const resolvedEmptyMessage = emptyMessage ?? t('noResults')

  if (status === 'loading' || status === 'idle') {
    return (
      <StyledSectionState>
        <Spinner />
      </StyledSectionState>
    )
  }

  if (status === 'error') {
    return (
      <StyledSectionState>
        <StyledErrorText>{error ?? t('sectionLoadError')}</StyledErrorText>
      </StyledSectionState>
    )
  }

  if (isEmpty) {
    return <StyledSectionState>{resolvedEmptyMessage}</StyledSectionState>
  }

  return <>{children}</>
}