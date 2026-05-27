import { Link } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { LoginForm } from '../components/login-form'
import type { LoginFormValues } from '../schemas/login.schema'
import { signInWithEmail, signInWithGoogle } from '../services/auth.service'
import { getAuthErrorMessage } from '../services/auth-errors'

export function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>()

  async function handleEmailSignIn(values: LoginFormValues) {
    setError(undefined)

    try {
      await signInWithEmail(values)
      navigate('/')
    } catch (err) {
      setError(getAuthErrorMessage(err))
    }
  }

  async function handleGoogleSignIn() {
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
          Nao tem uma conta?{' '}
          <Link component={RouterLink} to="/signup" variant="body2">
            Cadastre-se
          </Link>
        </>
      }
      title="Entrar"
    >
      <LoginForm
        error={error}
        onGoogleSignIn={handleGoogleSignIn}
        onSubmit={handleEmailSignIn}
      />
    </AuthPageShell>
  )
}
