import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { routes } from '@/router'

describe('CineView smoke test', () => {
  it('renders the home page placeholder', () => {
    const memoryRouter = createMemoryRouter(routes, { initialEntries: ['/'] })
    render(<RouterProvider router={memoryRouter} />)
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument()
  })

  it('renders the login page placeholder', () => {
    const memoryRouter = createMemoryRouter(routes, { initialEntries: ['/login'] })
    render(<RouterProvider router={memoryRouter} />)
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })
})