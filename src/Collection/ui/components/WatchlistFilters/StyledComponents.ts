import styled from 'styled-components'

export const StyledToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

export const StyledTabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const StyledTabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--cv-accent)' : 'var(--cv-border)'};
  background-color: ${({ $active }) =>
    $active ? 'var(--cv-bg-primary)' : 'transparent'};
  color: ${({ $active }) =>
    $active ? 'var(--cv-accent)' : 'var(--cv-text-muted)'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: var(--cv-text-secondary);
    border-color: var(--cv-accent);
  }
`

export const StyledSortGroup = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cv-text-muted);
  font-size: 0.875rem;
`

export const StyledSortSelect = styled.select`
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