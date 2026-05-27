import { CssBaseline } from '@mui/material'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/context/auth-provider'
import { AppTheme } from '@/shared/styles/theme/app-theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AuthProvider>{children}</AuthProvider>
    </AppTheme>
  )
}
