import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { ROUTES, NotFoundPage } from '@/Common'
import { LoginPage, ProtectedRoute, GuestRoute, ShellLayout } from '@/Auth'
import { HomePage, MovieDetailPage } from '@/Movies'
import { TVShowDetailPage, SeasonDetailPage } from '@/TVShows'
import { SearchPage } from '@/Search'
import { WatchlistPage, MyListsPage, ListDetailPage } from '@/Collection'
import { SettingsPage } from '@/Preferences'

export const routes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ShellLayout />,
        children: [
          { path: ROUTES.HOME, element: <HomePage /> },
          { path: ROUTES.SEARCH, element: <SearchPage /> },
          { path: ROUTES.MOVIE_DETAIL, element: <MovieDetailPage /> },
          {
            path: ROUTES.TV_SHOW_DETAIL,
            element: <TVShowDetailPage />,
            children: [{ path: ROUTES.SEASON_DETAIL, element: <SeasonDetailPage /> }],
          },
          { path: ROUTES.WATCHLIST, element: <WatchlistPage /> },
          { path: ROUTES.LISTS, element: <MyListsPage /> },
          { path: ROUTES.LIST_DETAIL, element: <ListDetailPage /> },
          { path: ROUTES.SETTINGS, element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]

export const router = createBrowserRouter(routes)