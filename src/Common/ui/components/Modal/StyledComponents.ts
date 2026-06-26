import styled from 'styled-components'

export const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: color-mix(in srgb, var(--cv-bg-deep) 85%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 50;
`

export const StyledDialog = styled.div`
  position: relative;
  width: min(56rem, 100%);
  background-color: var(--cv-bg-primary);
  border-radius: 0.75rem;
  border: 1px solid var(--cv-border);
  overflow: hidden;
`

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 9999px;
  background-color: color-mix(in srgb, var(--cv-bg-primary) 90%, transparent);
  color: var(--cv-text-primary);
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;

  &:hover {
    background-color: var(--cv-bg-secondary);
  }
`