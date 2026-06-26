import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from '@/Common'
import { AuthProvider } from '@/Auth'
import { PreferencesProvider } from '@/Preferences'
import '@/Preferences/data/i18n'
import { router } from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PreferencesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PreferencesProvider>
    </ErrorBoundary>
  </StrictMode>,
)