import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { ForgotPasswordForm } from '../components/forgot-password-form'
import type { ForgotPasswordFormValues } from '../schemas/forgot-password.schema'

export function ForgotPasswordPage() {
  function handleRecoverPassword(values: ForgotPasswordFormValues) {
    console.log(values)
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
