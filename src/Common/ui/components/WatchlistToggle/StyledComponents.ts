import styled from 'styled-components'

export const StyledWatchlistButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid
    ${({ $active }) => ($active ? 'var(--cv-accent)' : 'var(--cv-border)')};
  border-radius: 9999px;
  background-color: ${({ $active }) =>
    $active
      ? 'color-mix(in srgb, var(--cv-accent) 18%, var(--cv-bg-primary))'
      : 'color-mix(in srgb, var(--cv-bg-primary) 85%, transparent)'};
  color: ${({ $active }) =>
    $active ? 'var(--cv-accent)' : 'var(--cv-text-muted)'};
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;

  &:hover {
    color: var(--cv-accent);
    border-color: var(--cv-accent);
  }

  &:focus-visible {
    outline: 2px solid var(--cv-accent);
    outline-offset: 1px;
  }
`