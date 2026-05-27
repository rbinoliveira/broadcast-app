import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { SignupForm } from '../components/signup-form'
import type { SignupFormValues } from '../schemas/signup.schema'

export function SignupPage() {
  function handleEmailSignUp(values: SignupFormValues) {
    console.log(values)
  }

  function handleGoogleSignUp() {
    console.log('google sign up')
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
