import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--cv-border-subtle);
  border-radius: 0.75rem;
  background-color: var(--cv-bg-secondary);
`

export const StyledCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const StyledTitle = styled.h3`
  margin: 0.5rem 0 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--cv-text-primary);
  line-height: 1.35;
`

export const StyledMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

export const StyledStatusSelect = styled.select`
  flex: 1;
  padding: 0.5rem 0.75rem;
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

export const StyledRemoveButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.5rem;
  background-color: transparent;
  color: var(--cv-text-secondary);
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: var(--cv-bg-primary);
    color: var(--cv-text-primary);
  }
`