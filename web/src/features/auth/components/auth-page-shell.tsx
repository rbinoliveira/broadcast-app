import {
  Card as MuiCard,
  Stack,
  type StackProps,
  styled,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const AuthContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  justifyContent: 'space-between',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}))

type AuthPageShellProps = {
  children: ReactNode
  footer: ReactNode
  subtitle?: string
  title: string
} & Pick<StackProps, 'sx'>

export function AuthPageShell({
  children,
  footer,
  subtitle,
  title,
  sx,
}: AuthPageShellProps) {
  return (
    <AuthContainer sx={sx}>
      <Card variant="outlined">
        <Stack spacing={1}>
          <Typography
            component="h1"
            sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', width: '100%' }}
            variant="h4"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" variant="body2">
              {subtitle}
            </Typography>
          )}
        </Stack>

        {children}

        <Typography sx={{ textAlign: 'center' }}>{footer}</Typography>
      </Card>
    </AuthContainer>
  )
}
