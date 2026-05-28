import { CssBaseline } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/hooks/auth-provider'
import { ActiveConnectionProvider } from '@/features/connections/hooks/active-connection-provider'
import { AppTheme } from '@/shared/styles/theme/app-theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <AppTheme>
        <CssBaseline />
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
    </StyledEngineProvider>
  )
}
