import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth.hook'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'

import type { ContactFormValues } from '../schemas/contact.schema'
import {
  type ContactPageCursor,
  createContact as createContactService,
  deleteContact as deleteContactService,
  normalizeContactSearch,
  subscribeToContacts,
  updateContact as updateContactService,
} from '../services/contacts.service'
import type { ContactRow } from '../types/contact.type'

type UseContactsParams = {
  connectionId: string | undefined
}

function getContactsLoadErrorMessage(error: { code?: string }) {
  if (error.code === 'permission-denied') {
    return 'Sem permissão para carregar contatos. Publique as regras do Firestore.'
  }

  if (error.code === 'failed-precondition') {
    return 'Índice do Firestore ainda indisponível para a busca de contatos.'
  }

  return 'Não foi possível carregar os contatos.'
}

export function useContacts({ connectionId }: UseContactsParams) {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [pageCursors, setPageCursors] = useState<ContactPageCursor[]>([null])
  const [lastCursor, setLastCursor] = useState<ContactPageCursor>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const debouncedSearch = useDebouncedValue(search, 300)

  const normalizedSearch = useMemo(
    () => normalizeContactSearch(debouncedSearch),
    [debouncedSearch],
  )

  useEffect(() => {
    if (!user || !connectionId) {
      return
    }

    const unsubscribe = subscribeToContacts(
      {
        connectionId,
        cursor: pageCursors[page] ?? null,
        ownerId: user.uid,
        search: normalizedSearch,
      },
      ({
        contacts: nextContacts,
        hasNextPage: nextHasNextPage,
        lastCursor,
      }) => {
        setContacts(nextContacts)
        setHasNextPage(nextHasNextPage)
        setLastCursor(lastCursor)
        setLoading(false)
      },
      (error) => {
        console.error('subscribeToContacts', error)
        enqueueSnackbar(getContactsLoadErrorMessage(error), {
          variant: 'error',
        })
        setLoading(false)
      },
    )

    return unsubscribe
  }, [connectionId, normalizedSearch, page, pageCursors, user])

  const handleSearchChange = useCallback((value: string) => {
    setLoading(true)
    setSearch(value)
    setPage(0)
    setPageCursors([null])
    setLastCursor(null)
    setHasNextPage(false)
  }, [])

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

  const createContact = useCallback(
    async (data: ContactFormValues) => {
      if (!user || !connectionId) {
        return false
      }

      try {
        await createContactService(user.uid, connectionId, data)
        enqueueSnackbar('Contato criado com sucesso.', { variant: 'success' })
        return true
      } catch {
        enqueueSnackbar('Não foi possível criar o contato.', {
          variant: 'error',
        })
        return false
      }
    },
    [connectionId, user],
  )

  const updateContact = useCallback(
    async (contactId: string, data: ContactFormValues) => {
      try {
        await updateContactService(contactId, data)
        enqueueSnackbar('Contato atualizado com sucesso.', {
          variant: 'success',
        })
        return true
      } catch {
        enqueueSnackbar('Não foi possível atualizar o contato.', {
          variant: 'error',
        })
        return false
      }
    },
    [],
  )

  const removeContact = useCallback(async (contactId: string) => {
    try {
      await deleteContactService(contactId)
      enqueueSnackbar('Contato excluído.', { variant: 'success' })
    } catch {
      enqueueSnackbar('Não foi possível excluir o contato.', {
        variant: 'error',
      })
    }
  }, [])

  return {
    contacts,
    createContact,
    handleNextPage,
    handlePreviousPage,
    handleSearchChange,
    hasNextPage,
    loading,
    page,
    removeContact,
    search,
    updateContact,
  }
}
