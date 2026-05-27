import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mui/material'
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
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  function handleRecoverPassword(values: ForgotPasswordFormValues) {
    onSubmit?.(values)
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

      <Button fullWidth type="submit" variant="contained">
        Enviar link de recuperacao
      </Button>
    </Stack>
  )
}
