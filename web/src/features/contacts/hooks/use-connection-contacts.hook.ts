import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { useAuth } from '@/features/auth/hooks/use-auth.hook'

import { subscribeToConnectionContacts } from '../services/contacts.service'
import type { ContactRow } from '../types/contact.type'

type UseConnectionContactsParams = {
  connectionId: string | undefined
}

export function useConnectionContacts({
  connectionId,
}: UseConnectionContactsParams) {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<ContactRow[]>([])

  useEffect(() => {
    if (!user || !connectionId) {
      return
    }

    const unsubscribe = subscribeToConnectionContacts(
      user.uid,
      connectionId,
      setContacts,
      (error) => {
        console.error('subscribeToConnectionContacts', error)
        enqueueSnackbar('Não foi possível carregar os contatos da conexão.', {
          variant: 'error',
        })
      },
    )

    return unsubscribe
  }, [connectionId, user])

  return { contacts }
}
