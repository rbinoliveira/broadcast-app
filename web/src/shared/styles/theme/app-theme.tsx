import {
  createTheme,
  type ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles'
import { type ReactNode, useMemo } from 'react'

import { componentCustomizations } from './customizations'
import { colorSchemes, shadows, shape, typography } from './theme-primitives'

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
      colorSchemes,
      components: {
        ...componentCustomizations,
        ...themeComponents,
      },
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
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
