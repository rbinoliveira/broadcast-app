import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

import { AuthPageShell } from '../components/auth-page-shell'
import { LoginForm } from '../components/login-form'
import type { LoginFormValues } from '../schemas/login.schema'

export function LoginPage() {
  function handleEmailSignIn(values: LoginFormValues) {
    console.log(values)
  }

  function handleGoogleSignIn() {
    console.log('google sign in')
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
