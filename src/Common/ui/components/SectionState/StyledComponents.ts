import styled from 'styled-components'

export const StyledSectionState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 8rem;
  padding: 1.5rem;
  color: var(--cv-text-muted);
  text-align: center;
`

export const StyledErrorText = styled.p`
  color: var(--cv-danger);
  margin: 0;
`