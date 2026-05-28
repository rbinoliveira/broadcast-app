import { Card, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type AuthPageShellProps = {
  children: ReactNode
  footer: ReactNode
  subtitle?: string
  title: string
}

export function AuthPageShell({
  children,
  footer,
  subtitle,
  title,
}: AuthPageShellProps) {
  return (
    <div className="auth-backdrop relative flex min-h-screen flex-col justify-between p-4 sm:p-8">
      <Card
        variant="outlined"
        className="auth-card m-auto flex w-full max-w-md flex-col gap-4 self-center p-8"
      >
        <div className="flex flex-col gap-2">
          <Typography component="h1" className="w-full text-3xl" variant="h4">
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" variant="body2">
              {subtitle}
            </Typography>
          )}
        </div>

        {children}

        <Typography className="text-center">{footer}</Typography>
      </Card>
    </div>
  )
}
