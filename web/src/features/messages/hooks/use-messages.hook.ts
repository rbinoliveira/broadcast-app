import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth.hook'

import type { ContactRow } from '../../contacts/types/contact.type'
import type { MessageFormValues } from '../schemas/message.schema'
import {
  createMessage as createMessageService,
  deleteMessage as deleteMessageService,
  type MessageStatusFilter,
  subscribeToMessages,
  updateMessage as updateMessageService,
} from '../services/messages.service'
import type { MessageRow } from '../types/message.type'

type UseMessagesParams = {
  connectionId: string | undefined
  contacts: ContactRow[]
}

export function useMessages({ connectionId, contacts }: UseMessagesParams) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<MessageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<MessageStatusFilter>('all')

  useEffect(() => {
    if (!user || !connectionId) {
      return
    }

    const unsubscribe = subscribeToMessages(
      {
        connectionId,
        ownerId: user.uid,
        status: statusFilter,
      },
      (nextMessages) => {
        setMessages(nextMessages)
        setLoading(false)
      },
      (error) => {
        console.error('subscribeToMessages', error)
        enqueueSnackbar('Não foi possível carregar as mensagens.', {
          variant: 'error',
        })
        setLoading(false)
      },
    )

    return unsubscribe
  }, [connectionId, statusFilter, user])

  const handleStatusFilterChange = useCallback(
    (status: MessageStatusFilter) => {
      setLoading(true)
      setStatusFilter(status)
    },
    [],
  )

  const createMessage = useCallback(
    async (data: MessageFormValues) => {
      if (!user || !connectionId) {
        return false
      }

      try {
        await createMessageService(user.uid, connectionId, contacts, data)
        enqueueSnackbar('Mensagem criada com sucesso.', { variant: 'success' })
        return true
      } catch {
        enqueueSnackbar('Não foi possível criar a mensagem.', {
          variant: 'error',
        })
        return false
      }
    },
    [connectionId, contacts, user],
  )

  const updateMessage = useCallback(
    async (messageId: string, data: MessageFormValues) => {
      try {
        await updateMessageService(messageId, contacts, data)
        enqueueSnackbar('Mensagem atualizada com sucesso.', {
          variant: 'success',
        })
        return true
      } catch {
        enqueueSnackbar('Não foi possível atualizar a mensagem.', {
          variant: 'error',
        })
        return false
      }
    },
    [contacts],
  )

  const removeMessage = useCallback(async (messageId: string) => {
    try {
      await deleteMessageService(messageId)
      enqueueSnackbar('Mensagem excluída.', { variant: 'success' })
    } catch {
      enqueueSnackbar('Não foi possível excluir a mensagem.', {
        variant: 'error',
      })
    }
  }, [])

  return {
    createMessage,
    handleStatusFilterChange,
    loading,
    messages,
    removeMessage,
    statusFilter,
    updateMessage,
  }
}
