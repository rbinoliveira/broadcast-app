import {
  createTheme,
  type ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles'
import { type ReactNode, useMemo } from 'react'

import { componentCustomizations } from './customizations'
import { palette, shadows, shape, typography } from './theme-primitives'

type AppThemeProps = {
  children: ReactNode
  disableCustomTheme?: boolean
  themeComponents?: ThemeOptions['components']
}

export function AppTheme({
  children,
  disableCustomTheme,
  themeComponents,
}: AppThemeProps) {
  const theme = useMemo(() => {
    if (disableCustomTheme) {
      return {}
    }

    return createTheme({
      components: {
        ...componentCustomizations,
        ...themeComponents,
      },
      cssVariables: {
        cssVarPrefix: 'template',
      },
      palette,
      shadows,
      shape,
      typography,
    })
  }, [disableCustomTheme, themeComponents])

  if (disableCustomTheme) {
    return <>{children}</>
  }

  return (
    <ThemeProvider disableTransitionOnChange theme={theme}>
      {children}
    </ThemeProvider>
  )
}
