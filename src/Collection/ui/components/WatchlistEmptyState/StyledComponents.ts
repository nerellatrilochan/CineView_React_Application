import styled from 'styled-components'

export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem 1.5rem;
  text-align: center;
  color: var(--cv-text-muted);
`

export const StyledEmptyTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: var(--cv-text-primary);
`

export const StyledEmptyDescription = styled.p`
  margin: 0;
  max-width: 28rem;
  line-height: 1.5;
`