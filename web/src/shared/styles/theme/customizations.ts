import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { alpha, type Components, type Theme } from '@mui/material/styles'

import { brand, gray } from './theme-primitives'

export const componentCustomizations: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        boxShadow: 'none',
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 12px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              backgroundColor: gray[900],
              backgroundImage: `linear-gradient(to bottom, ${gray[700]}, ${gray[800]})`,
              border: `1px solid ${gray[700]}`,
              boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              color: 'white',
              '&:hover': {
                backgroundColor: gray[700],
                backgroundImage: 'none',
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: gray[800],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: gray[50],
                backgroundImage: `linear-gradient(to bottom, ${gray[100]}, ${gray[50]})`,
                border: `1px solid ${gray[50]}`,
                boxShadow: 'inset 0 -1px 0 hsl(220, 30%, 80%)',
                color: 'black',
                '&:hover': {
                  backgroundColor: gray[300],
                  backgroundImage: 'none',
                  boxShadow: 'none',
                },
                '&:active': {
                  backgroundColor: gray[400],
                },
              }),
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              backgroundColor: alpha(gray[50], 0.3),
              border: '1px solid',
              borderColor: gray[200],
              color: (theme.vars || theme).palette.text.primary,
              '&:hover': {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: gray[800],
                borderColor: gray[700],
                '&:hover': {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
        ],
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        boxShadow: 'none',
        gap: 16,
        padding: 16,
        transition: 'all 100ms ease',
        variants: [
          {
            props: {
              variant: 'outlined',
            },
            style: {
              background: 'hsl(0, 0%, 100%)',
              border: `1px solid ${(theme.vars || theme).palette.divider}`,
              boxShadow: 'none',
              ...theme.applyStyles('dark', {
                background: alpha(gray[900], 0.4),
              }),
            },
          },
        ],
      }),
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginBottom: 8,
        typography: theme.typography.caption,
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
          color: gray[500],
          opacity: 0.7,
        },
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500,
        textDecorationColor: alpha(gray[800], 0.4),
        '&:hover': {
          textDecorationColor: gray[800],
        },
        ...theme.applyStyles('dark', {
          textDecorationColor: alpha(gray[50], 0.4),
          '&:hover': {
            textDecorationColor: gray[50],
          },
        }),
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderRadius: (theme.vars || theme).shape.borderRadius,
        color: (theme.vars || theme).palette.text.primary,
        padding: '8px 12px',
        transition: 'border 120ms ease-in',
        '&:hover': {
          borderColor: gray[400],
        },
        [`&.${outlinedInputClasses.focused}`]: {
          borderColor: brand[400],
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
        },
        ...theme.applyStyles('dark', {
          '&:hover': {
            borderColor: gray[500],
          },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
        ],
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
}
