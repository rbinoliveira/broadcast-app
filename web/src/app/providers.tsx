import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/context/auth-provider'
import { ActiveConnectionProvider } from '@/features/connections/context/active-connection-provider'
import { AppTheme } from '@/shared/styles/theme/app-theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SnackbarProvider
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={4000}
        maxSnack={3}
      >
        <AuthProvider>
          <ActiveConnectionProvider>{children}</ActiveConnectionProvider>
        </AuthProvider>
      </SnackbarProvider>
    </AppTheme>
  )
}
