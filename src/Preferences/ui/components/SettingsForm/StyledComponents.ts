import styled from 'styled-components'

export const StyledPage = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`

export const StyledTitle = styled.h1`
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  color: var(--cv-text-primary);
`

export const StyledSubtitle = styled.p`
  margin: 0 0 2rem;
  color: var(--cv-text-muted);
`

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--cv-border);
`

export const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cv-text-primary);
`

export const StyledDescription = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  color: var(--cv-text-muted);
`

export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.5rem;
  background-color: var(--cv-input-bg);
  color: var(--cv-text-primary);
  font-size: 0.875rem;

  &:focus {
    outline: 2px solid var(--cv-accent);
    outline-offset: 1px;
  }
`

export const StyledThemeToggle = styled.button`
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.5rem;
  background-color: var(--cv-bg-secondary);
  color: var(--cv-text-primary);
  cursor: pointer;

  &:hover {
    background-color: var(--cv-bg-tertiary);
  }
`

export const StyledLogoutButton = styled.button`
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border: 1px solid var(--cv-danger);
  border-radius: 0.5rem;
  background-color: transparent;
  color: var(--cv-danger);
  cursor: pointer;

  &:hover {
    background-color: var(--cv-danger-bg);
  }
`