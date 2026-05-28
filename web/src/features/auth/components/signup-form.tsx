import { zodResolver } from '@hookform/resolvers/zod'
import { Divider } from '@mui/material'
import { useForm } from 'react-hook-form'

import { AppButton } from '@/shared/components/app-button'
import { InputText } from '@/shared/components/input-text'

import { type SignupFormValues, signupSchema } from '../schemas/signup.schema'
import { GoogleIcon } from './google-icon'

type SignupFormProps = {
  onGoogleSignUp?: () => Promise<void> | void
  onSubmit?: (values: SignupFormValues) => Promise<void> | void
}

export function SignupForm({ onGoogleSignUp, onSubmit }: SignupFormProps) {
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
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={handleSubmit(handleSignup)}
      >
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

        <AppButton
          isLoading={isSubmitting}
          fullWidth
          type="submit"
          variant="contained"
        >
          Cadastrar
        </AppButton>
      </form>

      <Divider>ou</Divider>

      <AppButton
        fullWidth
        onClick={handleGoogleSignUp}
        startIcon={<GoogleIcon />}
        variant="outlined"
      >
        Cadastrar com Google
      </AppButton>
    </>
  )
}
