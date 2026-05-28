import { useCallback, useState } from 'react'

import type { ContactFormValues } from '../schemas/contact.schema'
import type { ContactRow } from '../types/contact.type'

type UseContactFormDialogParams = {
  createContact: (values: ContactFormValues) => Promise<boolean>
  updateContact: (
    contactId: string,
    values: ContactFormValues,
  ) => Promise<boolean>
}

export function useContactFormDialog({
  createContact,
  updateContact,
}: UseContactFormDialogParams) {
  const [open, setOpen] = useState(false)
  const [contact, setContact] = useState<ContactRow | null>(null)

  const handleCreateDialogOpen = useCallback(() => {
    setContact(null)
    setOpen(true)
  }, [])

  const handleEditDialogOpen = useCallback((nextContact: ContactRow) => {
    setContact(nextContact)
    setOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setOpen(false)
    setContact(null)
  }, [])

  const handleContactSubmit = useCallback(
    async (values: ContactFormValues) => {
      const success = contact
        ? await updateContact(contact.id, values)
        : await createContact(values)

      if (success) {
        handleDialogClose()
      }
    },
    [contact, createContact, handleDialogClose, updateContact],
  )

  return {
    contact,
    handleContactSubmit,
    handleCreateDialogOpen,
    handleDialogClose,
    handleEditDialogOpen,
    open,
  }
}
