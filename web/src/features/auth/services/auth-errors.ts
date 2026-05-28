import { FirebaseError } from 'firebase/app'

const messages: Record<string, string> = {
  'auth/account-exists-with-different-credential':
    'Existe uma conta com este e-mail usando outro metodo de entrada.',
  'auth/email-already-in-use': 'Este e-mail ja esta em uso.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'E-mail invalido.',
  'auth/operation-not-allowed': 'Login por e-mail/senha nao esta habilitado.',
  'auth/popup-blocked':
    'O popup de login foi bloqueado pelo navegador. Permita popups e tente novamente.',
  'auth/popup-closed-by-user': 'O popup foi fechado antes da conclusao.',
  'auth/cancelled-popup-request': 'A solicitacao de popup foi cancelada.',
  'auth/too-many-requests':
    'Muitas tentativas. Tente novamente em alguns minutos.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError && messages[error.code]) {
    return messages[error.code]
  }

  console.error('auth error', error)

  return 'Ocorreu um erro inesperado. Tente novamente.'
}
