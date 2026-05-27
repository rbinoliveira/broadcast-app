import { CssBaseline } from '@mui/material'
import type { ReactNode } from 'react'

import { AppTheme } from '@/shared/styles/theme/app-theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {children}
    </AppTheme>
  )
}
