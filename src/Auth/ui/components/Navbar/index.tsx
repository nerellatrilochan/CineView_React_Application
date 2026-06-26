import { useState, type SubmitEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/Common'
import { usePreferencesSnapshot } from '@/Preferences'
import { useAuthController } from '../../controllers/useAuthController'
import {
  StyledActions,
  StyledAvatar,
  StyledLanguageLink,
  StyledLogo,
  StyledLogoutButton,
  StyledNavbar,
  StyledNavItem,
  StyledNavLinks,
  StyledSearchForm,
  StyledSearchInput,
} from './StyledComponents'

const NAV_ITEMS = [
  { labelKey: 'auth:nav.home', to: ROUTES.HOME, end: true },
  { labelKey: 'auth:nav.watchlist', to: ROUTES.WATCHLIST, end: false },
  { labelKey: 'auth:nav.myLists', to: ROUTES.LISTS, end: false },
] as const

const getInitials = (username: string): string =>
  username.slice(0, 2).toUpperCase()

export const Navbar = () => {
  const { t } = useTranslation(['auth', 'common'])
  const navigate = useNavigate()
  const { session, logout } = useAuthController()
  const { language } = usePreferencesSnapshot()
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
      <StyledLogo to={ROUTES.HOME}>{t('common:appName')}</StyledLogo>

      <StyledNavLinks aria-label={t('common:mainNavigation')}>
        {NAV_ITEMS.map(({ labelKey, to, end }) => (
          <StyledNavItem key={to} to={to} end={end}>
            {t(labelKey)}
          </StyledNavItem>
        ))}
      </StyledNavLinks>

      <StyledSearchForm onSubmit={handleSearchSubmit} role="search">
        <StyledSearchInput
          type="search"
          placeholder={t('auth:nav.searchPlaceholder')}
          value={searchQuery}
          aria-label={t('common:globalSearch')}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </StyledSearchForm>

      <StyledActions>
        <StyledLanguageLink to={ROUTES.SETTINGS} aria-label={t('preferences:title')}>
          {language.toUpperCase()}
        </StyledLanguageLink>

        {session && (
          <StyledAvatar aria-label={t('common:signedInAs', { username: session.username })}>
            {getInitials(session.username)}
          </StyledAvatar>
        )}

        <StyledLogoutButton type="button" onClick={handleLogout}>
          {t('common:logout')}
        </StyledLogoutButton>
      </StyledActions>
    </StyledNavbar>
  )
}