import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth.hook'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'

import type { ContactRow } from '../../contacts/types/contact.type'
import type { MessageFormValues } from '../schemas/message.schema'
import {
  createMessage as createMessageService,
  deleteMessage as deleteMessageService,
  type MessagePageCursor,
  type MessageStatusFilter,
  normalizeMessageSearch,
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
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [pageCursors, setPageCursors] = useState<MessagePageCursor[]>([null])
  const [lastCursor, setLastCursor] = useState<MessagePageCursor>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const debouncedSearch = useDebouncedValue(search, 300)

  const normalizedSearch = useMemo(
    () => normalizeMessageSearch(debouncedSearch),
    [debouncedSearch],
  )

  useEffect(() => {
    if (!user || !connectionId) {
      return
    }

    const unsubscribe = subscribeToMessages(
      {
        connectionId,
        cursor: pageCursors[page] ?? null,
        ownerId: user.uid,
        search: normalizedSearch,
        status: statusFilter,
      },
      ({
        messages: nextMessages,
        hasNextPage: nextHasNextPage,
        lastCursor,
      }) => {
        setMessages(nextMessages)
        setHasNextPage(nextHasNextPage)
        setLastCursor(lastCursor)
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
  }, [connectionId, normalizedSearch, page, pageCursors, statusFilter, user])

  const resetPagination = useCallback(() => {
    setPage(0)
    setPageCursors([null])
    setLastCursor(null)
    setHasNextPage(false)
  }, [])

  const handleStatusFilterChange = useCallback(
    (status: MessageStatusFilter) => {
      setLoading(true)
      setStatusFilter(status)
      resetPagination()
    },
    [resetPagination],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setLoading(true)
      setSearch(value)
      resetPagination()
    },
    [resetPagination],
  )

  const handlePreviousPage = useCallback(() => {
    setLoading(true)
    setPage((currentPage) => Math.max(currentPage - 1, 0))
  }, [])

  const handleNextPage = useCallback(() => {
    if (!hasNextPage || !lastCursor) {
      return
    }

    setLoading(true)
    setPageCursors((currentCursors) => {
      const nextCursors = [...currentCursors]
      nextCursors[page + 1] = lastCursor
      return nextCursors
    })
    setPage((currentPage) => currentPage + 1)
  }, [hasNextPage, lastCursor, page])

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
    handleNextPage,
    handlePreviousPage,
    handleSearchChange,
    handleStatusFilterChange,
    hasNextPage,
    loading,
    messages,
    page,
    removeMessage,
    search,
    statusFilter,
    updateMessage,
  }
}
