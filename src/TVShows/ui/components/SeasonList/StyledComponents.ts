import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledSection = styled.nav`
  padding: 0 1.5rem 1rem;
`

export const StyledHeading = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
  color: var(--cv-text-primary);
`

export const StyledSeasonTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`

export const StyledSeasonLink = styled(NavLink)`
  flex-shrink: 0;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid var(--cv-border);
  background-color: var(--cv-bg-secondary);
  color: var(--cv-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;

  &.active {
    border-color: var(--cv-accent);
    background-color: var(--cv-bg-tertiary);
    color: var(--cv-text-primary);
  }

  &:hover {
    border-color: var(--cv-accent);
  }
`