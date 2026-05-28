import { Link } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Link as RouterLink } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { ForgotPasswordForm } from '../components/forgot-password-form'
import type { ForgotPasswordFormValues } from '../schemas/forgot-password.schema'
import { sendPasswordReset } from '../services/auth.service'
import { getAuthErrorMessage } from '../services/auth-errors'

export function ForgotPasswordPage() {
  async function handleRecoverPassword(values: ForgotPasswordFormValues) {
    try {
      await sendPasswordReset(values.email)
      enqueueSnackbar('Enviamos um link de recuperação para o seu e-mail.', {
        variant: 'success',
      })
    } catch (err) {
      enqueueSnackbar(getAuthErrorMessage(err), { variant: 'error' })
    }
  }

  return (
    <AuthPageShell
      footer={
        <>
          Lembrou sua senha?{' '}
          <Link component={RouterLink} to="/login" variant="body2">
            Voltar para login
          </Link>
        </>
      }
      title="Recuperar senha"
    >
      <ForgotPasswordForm onSubmit={handleRecoverPassword} />
    </AuthPageShell>
  )
}
