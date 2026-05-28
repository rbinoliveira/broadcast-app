import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth.hook'

import {
  type DashboardStats,
  subscribeToDashboardStats,
} from '../services/dashboard.service'

const emptyStats: DashboardStats = {
  connections: 0,
  contacts: 0,
  scheduledMessages: 0,
  sentMessages: 0,
  totalMessages: 0,
}

export function useDashboardStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>(emptyStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      return
    }

    const unsubscribe = subscribeToDashboardStats(
      user.uid,
      (nextStats) => {
        setStats(nextStats)
        setLoading(false)
      },
      (error) => {
        console.error('subscribeToDashboardStats', error)
        enqueueSnackbar('Não foi possível carregar os dados do dashboard.', {
          variant: 'error',
        })
        setLoading(false)
      },
    )

    return unsubscribe
  }, [user])

  return { loading, stats }
}
