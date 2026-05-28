import { onAuthStateChanged, type User } from 'firebase/auth'
import { type ReactNode, useEffect, useState } from 'react'

import { auth } from '@/shared/lib/firebase'

import { AuthContext } from './use-auth.hook'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
