import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNavbar = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--cv-navbar-bg);
  border-bottom: 1px solid var(--cv-border-subtle);
  flex-wrap: wrap;
`

export const StyledLogo = styled(NavLink)`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--cv-text-primary);
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: var(--cv-accent);
  }
`

export const StyledNavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const StyledNavItem = styled(NavLink)`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: var(--cv-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    color: var(--cv-text-secondary);
    background-color: var(--cv-bg-secondary);
  }

  &.active {
    color: var(--cv-accent);
    background-color: var(--cv-bg-primary);
  }
`

export const StyledNavItemContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`

export const StyledNavBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  border-radius: 9999px;
  background-color: var(--cv-accent);
  color: var(--cv-bg-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
`

export const StyledSearchForm = styled.form`
  display: flex;
  flex: 1;
  min-width: 12rem;
  max-width: 28rem;
`

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.5rem;
  background-color: var(--cv-input-bg);
  color: var(--cv-text-primary);
  font-size: 0.875rem;

  &::placeholder {
    color: var(--cv-text-placeholder);
  }

  &:focus {
    outline: 2px solid var(--cv-accent);
    outline-offset: 1px;
  }
`

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`

export const StyledLanguageLink = styled(NavLink)`
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.375rem;
  color: var(--cv-text-muted);
  font-size: 0.75rem;
  background-color: var(--cv-input-bg);
  text-decoration: none;

  &:hover {
    color: var(--cv-accent);
    border-color: var(--cv-accent);
  }

  &.active {
    color: var(--cv-accent);
    border-color: var(--cv-accent);
  }
`

export const StyledAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: var(--cv-avatar-bg);
  color: var(--cv-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`

export const StyledLogoutButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--cv-border);
  border-radius: 0.375rem;
  background-color: transparent;
  color: var(--cv-text-secondary);
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: var(--cv-bg-secondary);
  }
`