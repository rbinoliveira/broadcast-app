import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CircularProgress, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

import { InputText } from '@/shared/components/input-text'

import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../schemas/forgot-password.schema'

type ForgotPasswordFormProps = {
  onSubmit?: (values: ForgotPasswordFormValues) => Promise<void> | void
}

export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
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
      noValidate
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

      <Button
        disabled={isSubmitting}
        fullWidth
        type="submit"
        variant="contained"
      >
        {isSubmitting ? (
          <>
            <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} />
            Enviando...
          </>
        ) : (
          'Enviar link de recuperacao'
        )}
      </Button>
    </Stack>
  )
}
