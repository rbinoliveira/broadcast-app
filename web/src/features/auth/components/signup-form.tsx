import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Divider, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { InputText } from '@/shared/components/input-text'

import { type SignupFormValues, signupSchema } from '../schemas/signup.schema'
import { GoogleIcon } from './google-icon'

type SignupFormProps = {
  error?: string
  onGoogleSignUp?: () => Promise<void> | void
  onSubmit?: (values: SignupFormValues) => Promise<void> | void
}

export function SignupForm({
  error,
  onGoogleSignUp,
  onSubmit,
}: SignupFormProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signupSchema),
  })

  function handleSignup(values: SignupFormValues) {
    return onSubmit?.(values)
  }

  function handleGoogleSignUp() {
    onGoogleSignUp?.()
  }

  return (
    <>
      <Stack component="form" spacing={2} onSubmit={handleSubmit(handleSignup)}>
        <InputText
          autoComplete="name"
          autoFocus
          control={control}
          fullWidth
          label="Nome completo"
          name="name"
          placeholder="Seu nome"
          type="text"
        />

        <InputText
          autoComplete="email"
          control={control}
          fullWidth
          label="Email"
          name="email"
          placeholder="your@email.com"
          type="email"
        />

        <InputText
          autoComplete="new-password"
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
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </Stack>

      <Divider>ou</Divider>

      <Button
        fullWidth
        onClick={handleGoogleSignUp}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Cadastrar com Google
      </Button>
    </>
  )
}
