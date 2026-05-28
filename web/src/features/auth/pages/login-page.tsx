import { Link } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { LoginForm } from '../components/login-form'
import type { LoginFormValues } from '../schemas/login.schema'
import { signInWithEmail, signInWithGoogle } from '../services/auth.service'
import { getAuthErrorMessage } from '../services/auth-errors'

export function LoginPage() {
  const navigate = useNavigate()

  async function handleEmailSignIn(values: LoginFormValues) {
    try {
      await signInWithEmail(values)
      navigate('/')
    } catch (err) {
      enqueueSnackbar(getAuthErrorMessage(err), { variant: 'error' })
    }
  }

  async function handleGoogleSignIn() {
    try {
      await signInWithGoogle()
      navigate('/')
    } catch (err) {
      enqueueSnackbar(getAuthErrorMessage(err), { variant: 'error' })
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
        onGoogleSignIn={handleGoogleSignIn}
        onSubmit={handleEmailSignIn}
      />
    </AuthPageShell>
  )
}
