import { useState, type SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/Common'
import { useAuthController } from '../../controllers/useAuthController'
import {
  StyledActions,
  StyledAvatar,
  StyledLanguagePlaceholder,
  StyledLogo,
  StyledLogoutButton,
  StyledNavbar,
  StyledNavItem,
  StyledNavLinks,
  StyledSearchForm,
  StyledSearchInput,
} from './StyledComponents'

const NAV_ITEMS = [
  { label: 'Home', to: ROUTES.HOME, end: true },
  { label: 'Watchlist', to: ROUTES.WATCHLIST, end: false },
  { label: 'My Lists', to: ROUTES.LISTS, end: false },
] as const

const getInitials = (username: string): string =>
  username.slice(0, 2).toUpperCase()

export const Navbar = () => {
  const navigate = useNavigate()
  const { session, logout } = useAuthController()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const trimmedQuery = searchQuery.trim()
    const searchPath = trimmedQuery
      ? `${ROUTES.SEARCH}?q=${encodeURIComponent(trimmedQuery)}`
      : ROUTES.SEARCH

    navigate(searchPath)
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <StyledNavbar>
      <StyledLogo to={ROUTES.HOME}>CineView</StyledLogo>

      <StyledNavLinks aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, to, end }) => (
          <StyledNavItem key={to} to={to} end={end}>
            {label}
          </StyledNavItem>
        ))}
      </StyledNavLinks>

      <StyledSearchForm onSubmit={handleSearchSubmit} role="search">
        <StyledSearchInput
          type="search"
          placeholder="Search movies, TV shows, people…"
          value={searchQuery}
          aria-label="Global search"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </StyledSearchForm>

      <StyledActions>
        <StyledLanguagePlaceholder aria-hidden>EN</StyledLanguagePlaceholder>

        {session && (
          <StyledAvatar aria-label={`Signed in as ${session.username}`}>
            {getInitials(session.username)}
          </StyledAvatar>
        )}

        <StyledLogoutButton type="button" onClick={handleLogout}>
          Logout
        </StyledLogoutButton>
      </StyledActions>
    </StyledNavbar>
  )
}