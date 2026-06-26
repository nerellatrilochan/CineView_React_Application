import styled from 'styled-components'

export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
  text-align: left;
`

export const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cv-text-secondary);
`

export const StyledInput = styled.input`
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

  &[aria-invalid='true'] {
    border-color: var(--cv-danger);
  }
`

export const StyledError = styled.span`
  font-size: 0.75rem;
  color: var(--cv-danger-text);
`