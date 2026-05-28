import { Link } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { SignupForm } from '../components/signup-form'
import type { SignupFormValues } from '../schemas/signup.schema'
import { signInWithGoogle, signUpWithEmail } from '../services/auth.service'
import { getAuthErrorMessage } from '../services/auth-errors'

export function SignupPage() {
  const navigate = useNavigate()

  async function handleEmailSignUp(values: SignupFormValues) {
    try {
      await signUpWithEmail(values)
      navigate('/')
    } catch (err) {
      enqueueSnackbar(getAuthErrorMessage(err), { variant: 'error' })
    }
  }

  async function handleGoogleSignUp() {
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
          Ja tem uma conta?{' '}
          <Link component={RouterLink} to="/login" variant="body2">
            Entrar
          </Link>
        </>
      }
      title="Cadastrar"
    >
      <SignupForm
        onGoogleSignUp={handleGoogleSignUp}
        onSubmit={handleEmailSignUp}
      />
    </AuthPageShell>
  )
}
