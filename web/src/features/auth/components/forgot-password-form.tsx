import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { InputText } from '@/shared/components/input-text'

import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../schemas/forgot-password.schema'

type ForgotPasswordFormProps = {
  error?: string
  success?: boolean
  onSubmit?: (values: ForgotPasswordFormValues) => Promise<void> | void
}

export function ForgotPasswordForm({
  error,
  success,
  onSubmit,
}: ForgotPasswordFormProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  function handleRecoverPassword(values: ForgotPasswordFormValues) {
    return onSubmit?.(values)
  }

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit(handleRecoverPassword)}
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

      {success && (
        <Alert severity="success">
          Enviamos um link de recuperacao para o seu e-mail.
        </Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      <Button
        disabled={isSubmitting}
        fullWidth
        type="submit"
        variant="contained"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar link de recuperacao'}
      </Button>
    </Stack>
  )
}
