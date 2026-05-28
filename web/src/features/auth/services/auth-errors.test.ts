import { FirebaseError } from 'firebase/app'

import { getAuthErrorMessage } from './auth-errors'

describe('getAuthErrorMessage', () => {
  it('translates known Firebase auth codes', () => {
    const error = new FirebaseError('auth/invalid-credential', 'wrong')

    expect(getAuthErrorMessage(error)).toBe('E-mail ou senha incorretos.')
  })

  it('explains a blocked popup so the user knows how to recover', () => {
    const error = new FirebaseError('auth/popup-blocked', 'blocked')

    expect(getAuthErrorMessage(error)).toContain('popup')
  })

  it('logs and returns a generic message for unmapped codes', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new FirebaseError('auth/unauthorized-domain', 'nope')

    expect(getAuthErrorMessage(error)).toBe(
      'Ocorreu um erro inesperado. Tente novamente.',
    )
    expect(spy).toHaveBeenCalledWith('auth error', error)

    spy.mockRestore()
  })

  it('falls back for errors that are not FirebaseError instances', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(getAuthErrorMessage(new Error('boom'))).toBe(
      'Ocorreu um erro inesperado. Tente novamente.',
    )

    spy.mockRestore()
  })
})
