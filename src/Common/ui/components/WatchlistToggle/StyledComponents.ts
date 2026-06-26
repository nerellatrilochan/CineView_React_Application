import styled from 'styled-components'

export const StyledWatchlistButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--cv-border);
  border-radius: 9999px;
  background-color: color-mix(in srgb, var(--cv-bg-primary) 85%, transparent);
  color: var(--cv-text-muted);
  cursor: not-allowed;
  opacity: 0.7;

  &:hover {
    color: var(--cv-text-secondary);
  }
`