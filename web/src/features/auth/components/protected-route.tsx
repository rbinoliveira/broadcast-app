import { Navigate, Outlet } from 'react-router-dom'

import { FullScreenLoader } from '@/shared/components/full-screen-loader'

import { useAuth } from '../hooks/use-auth.hook'

export function ProtectedRoute() {
  const { loading, user } = useAuth()

  if (loading) {
    return <FullScreenLoader />
  }

  if (!user) {
    return <Navigate replace to="/login" />
  }

  return <Outlet />
}
