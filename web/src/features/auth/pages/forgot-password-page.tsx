import { Link } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { ForgotPasswordForm } from '../components/forgot-password-form'
import type { ForgotPasswordFormValues } from '../schemas/forgot-password.schema'
import { sendPasswordReset } from '../services/auth.service'
import { getAuthErrorMessage } from '../services/auth-errors'

export function ForgotPasswordPage() {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState(false)

  async function handleRecoverPassword(values: ForgotPasswordFormValues) {
    setError(undefined)
    setSuccess(false)

    try {
      await sendPasswordReset(values.email)
      setSuccess(true)
    } catch (err) {
      setError(getAuthErrorMessage(err))
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
      <ForgotPasswordForm
        error={error}
        success={success}
        onSubmit={handleRecoverPassword}
      />
    </AuthPageShell>
  )
}
