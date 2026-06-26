import styled from 'styled-components'

export const StyledPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: var(--cv-bg-primary);
`

export const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--cv-text-primary);
`

export const StyledSubtitle = styled.p`
  color: var(--cv-text-muted);
  font-size: 1rem;
`