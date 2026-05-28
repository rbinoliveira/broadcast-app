import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppButton } from '@/shared/components/app-button'
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
    <form
      className="flex flex-col gap-4"
      noValidate
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

      <AppButton
        isLoading={isSubmitting}
        fullWidth
        type="submit"
        variant="contained"
      >
        Enviar link de recuperacao
      </AppButton>
    </form>
  )
}
