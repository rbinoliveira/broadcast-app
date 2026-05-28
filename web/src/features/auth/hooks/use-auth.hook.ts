import type { User } from 'firebase/auth'
import { createContext, useContext } from 'react'

export type AuthContextValue = {
  loading: boolean
  user: User | null
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
