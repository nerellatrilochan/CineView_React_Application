import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNavbar = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #020617;
  border-bottom: 1px solid #1e293b;
  flex-wrap: wrap;
`

export const StyledLogo = styled(NavLink)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: #38bdf8;
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
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    color: #e2e8f0;
    background-color: #1e293b;
  }

  &.active {
    color: #38bdf8;
    background-color: #0f172a;
  }
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
  border: 1px solid #334155;
  border-radius: 0.5rem;
  background-color: #0f172a;
  color: #f8fafc;
  font-size: 0.875rem;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: 2px solid #38bdf8;
    outline-offset: 1px;
  }
`

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
`

export const StyledLanguagePlaceholder = styled.div`
  padding: 0.375rem 0.75rem;
  border: 1px solid #334155;
  border-radius: 0.375rem;
  color: #94a3b8;
  font-size: 0.75rem;
  background-color: #0f172a;
`

export const StyledAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #0369a1;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`

export const StyledLogoutButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: 1px solid #334155;
  border-radius: 0.375rem;
  background-color: transparent;
  color: #e2e8f0;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #1e293b;
  }
`