import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Divider, Link, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import { InputText } from '@/shared/components/input-text'

import { type LoginFormValues, loginSchema } from '../schemas/login.schema'
import { GoogleIcon } from './google-icon'

type LoginFormProps = {
  error?: string
  onGoogleSignIn?: () => Promise<void> | void
  onSubmit?: (values: LoginFormValues) => Promise<void> | void
}

export function LoginForm({ error, onGoogleSignIn, onSubmit }: LoginFormProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  function handleLogin(values: LoginFormValues) {
    return onSubmit?.(values)
  }

  function handleGoogleSignIn() {
    onGoogleSignIn?.()
  }

  return (
    <>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(handleLogin)}>
        <InputText
          autoComplete="email"
          autoFocus
          control={control}
          fullWidth
          label="Email"
          name="email"
          placeholder="your@email.com"
          type="email"
        />

        <InputText
          autoComplete="current-password"
          control={control}
          fullWidth
          label="Password"
          name="password"
          placeholder="••••••"
          type="password"
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          disabled={isSubmitting}
          fullWidth
          type="submit"
          variant="contained"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>

        <Link
          component={RouterLink}
          sx={{ alignSelf: 'center' }}
          to="/forgot-password"
          variant="body2"
        >
          Esqueceu sua senha?
        </Link>
      </Stack>

      <Divider>ou</Divider>

      <Button
        fullWidth
        onClick={handleGoogleSignIn}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Entrar com Google
      </Button>
    </>
  )
}
