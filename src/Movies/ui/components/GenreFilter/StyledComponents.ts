import styled from 'styled-components'

export const StyledFilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0 1.5rem 1rem;
`

export const StyledChip = styled.button<{ $isActive: boolean }>`
  flex-shrink: 0;
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  border: 1px solid ${({ $isActive }) => ($isActive ? 'var(--cv-accent)' : 'var(--cv-border)')};
  background-color: ${({ $isActive }) => ($isActive ? 'var(--cv-bg-tertiary)' : 'var(--cv-bg-secondary)')};
  color: ${({ $isActive }) => ($isActive ? 'var(--cv-text-primary)' : 'var(--cv-text-secondary)')};
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    border-color: var(--cv-accent);
  }
`