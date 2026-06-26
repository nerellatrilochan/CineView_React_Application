import type { ReactNode } from 'react'
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
  emptyMessage = 'No results found.',
  children,
}: SectionStateProps) => {
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
        <StyledErrorText>{error ?? 'Failed to load this section.'}</StyledErrorText>
      </StyledSectionState>
    )
  }

  if (isEmpty) {
    return <StyledSectionState>{emptyMessage}</StyledSectionState>
  }

  return <>{children}</>
}