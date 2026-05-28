import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/context/auth-context'

import type { ConnectionFormValues } from '../schemas/connection.schema'
import {
  createConnection as createConnectionService,
  deleteConnection as deleteConnectionService,
  subscribeToConnections,
  updateConnection as updateConnectionService,
} from '../services/connections.service'
import type { ConnectionRow } from '../types/connection.type'

export function useConnections() {
  const { user } = useAuth()
  const [connections, setConnections] = useState<ConnectionRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      return
    }

    const unsubscribe = subscribeToConnections(
      user.uid,
      (nextConnections) => {
        setConnections(nextConnections)
        setLoading(false)
      },
      (error) => {
        console.error('subscribeToConnections', error)
        enqueueSnackbar('Não foi possível carregar as conexões.', {
          variant: 'error',
        })
        setLoading(false)
      },
    )

    return unsubscribe
  }, [user])

  const createConnection = useCallback(
    async (data: ConnectionFormValues) => {
      if (!user) {
        return false
      }

      try {
        await createConnectionService(user.uid, user.email, data)
        enqueueSnackbar('Conexão criada com sucesso.', { variant: 'success' })
        return true
      } catch {
        enqueueSnackbar('Não foi possível criar a conexão.', {
          variant: 'error',
        })
        return false
      }
    },
    [user],
  )

  const updateConnection = useCallback(
    async (connectionId: string, data: ConnectionFormValues) => {
      try {
        await updateConnectionService(connectionId, data)
        enqueueSnackbar('Conexão atualizada com sucesso.', {
          variant: 'success',
        })
        return true
      } catch {
        enqueueSnackbar('Não foi possível atualizar a conexão.', {
          variant: 'error',
        })
        return false
      }
    },
    [],
  )

  const removeConnection = useCallback(async (connectionId: string) => {
    try {
      await deleteConnectionService(connectionId)
      enqueueSnackbar('Conexão excluída.', { variant: 'success' })
    } catch {
      enqueueSnackbar('Não foi possível excluir a conexão.', {
        variant: 'error',
      })
    }
  }, [])

  return {
    connections,
    loading,
    createConnection,
    updateConnection,
    removeConnection,
  }
}
