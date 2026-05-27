import { Link } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { SignupForm } from '../components/signup-form'
import type { SignupFormValues } from '../schemas/signup.schema'
import { signInWithGoogle, signUpWithEmail } from '../services/auth.service'
import { getAuthErrorMessage } from '../services/auth-errors'

export function SignupPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>()

  async function handleEmailSignUp(values: SignupFormValues) {
    setError(undefined)

    try {
      await signUpWithEmail(values)
      navigate('/')
    } catch (err) {
      setError(getAuthErrorMessage(err))
    }
  }

  async function handleGoogleSignUp() {
    setError(undefined)

    try {
      await signInWithGoogle()
      navigate('/')
    } catch (err) {
      setError(getAuthErrorMessage(err))
    }
  }

  return (
    <AuthPageShell
      footer={
        <>
          Ja tem uma conta?{' '}
          <Link component={RouterLink} to="/login" variant="body2">
            Entrar
          </Link>
        </>
      }
      title="Cadastrar"
    >
      <SignupForm
        error={error}
        onGoogleSignUp={handleGoogleSignUp}
        onSubmit={handleEmailSignUp}
      />
    </AuthPageShell>
  )
}
