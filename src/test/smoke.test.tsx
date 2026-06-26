import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it, beforeEach } from 'vitest'
import { AuthProvider, SESSION_STORAGE_KEY } from '@/Auth'
import { CollectionProvider } from '@/Collection'
import { PreferencesProvider } from '@/Preferences'
import '@/Preferences/data/i18n'
import { routes } from '@/router'

const renderApp = (initialEntry: string) => {
  const memoryRouter = createMemoryRouter(routes, { initialEntries: [initialEntry] })

  return render(
    <PreferencesProvider>
      <CollectionProvider>
        <AuthProvider>
          <RouterProvider router={memoryRouter} />
        </AuthProvider>
      </CollectionProvider>
    </PreferencesProvider>,
  )
}

describe('CineView smoke test', () => {
  beforeEach(() => {
    cleanup()
    sessionStorage.clear()
    localStorage.clear()
  })

  it('redirects unauthenticated users from home to login', async () => {
    renderApp('/')
    expect(await screen.findByRole('heading', { name: /sign in to cineview/i })).toBeInTheDocument()
  })

  it('renders the login page', () => {
    renderApp('/login')
    expect(screen.getByRole('heading', { name: /sign in to cineview/i })).toBeInTheDocument()
  })

  it('renders the home page when a session exists', async () => {
    sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        username: 'cineview',
        token: 'test-token',
        createdAt: new Date().toISOString(),
      }),
    )

    renderApp('/')
    expect(await screen.findByRole('heading', { name: /home/i })).toBeInTheDocument()
  })
})