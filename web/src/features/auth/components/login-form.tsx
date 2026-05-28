import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Link } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

import { AppButton } from '@/shared/components/app-button'
import { InputText } from '@/shared/components/input-text'

import { type LoginFormValues, loginSchema } from '../schemas/login.schema'
import { GoogleIcon } from './google-icon'

type LoginFormProps = {
  onGoogleSignIn?: () => Promise<void> | void
  onSubmit?: (values: LoginFormValues) => Promise<void> | void
}

export function LoginForm({ onGoogleSignIn, onSubmit }: LoginFormProps) {
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
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(handleLogin)}
      >
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

        <AppButton
          isLoading={isSubmitting}
          fullWidth
          type="submit"
          variant="contained"
        >
          Entrar
        </AppButton>

        <Link
          component={RouterLink}
          className="self-center"
          to="/forgot-password"
          variant="body2"
        >
          Esqueceu sua senha?
        </Link>
      </form>

      <Divider>ou</Divider>

      <AppButton
        fullWidth
        onClick={handleGoogleSignIn}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Entrar com Google
      </AppButton>
    </>
  )
}
