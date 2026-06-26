import styled from 'styled-components'

export const StyledButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--cv-accent);
  color: var(--cv-text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: var(--cv-accent-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`