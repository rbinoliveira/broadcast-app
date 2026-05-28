import { useCallback, useState } from 'react'

import type { MessageFormValues } from '../schemas/message.schema'
import type { MessageRow } from '../types/message.type'

type UseMessageFormDialogParams = {
  createMessage: (values: MessageFormValues) => Promise<boolean>
  updateMessage: (
    messageId: string,
    values: MessageFormValues,
  ) => Promise<boolean>
}

export function useMessageFormDialog({
  createMessage,
  updateMessage,
}: UseMessageFormDialogParams) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<MessageRow | null>(null)

  const handleCreateDialogOpen = useCallback(() => {
    setMessage(null)
    setOpen(true)
  }, [])

  const handleEditDialogOpen = useCallback((nextMessage: MessageRow) => {
    setMessage(nextMessage)
    setOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setOpen(false)
    setMessage(null)
  }, [])

  const handleMessageSubmit = useCallback(
    async (values: MessageFormValues) => {
      const success = message
        ? await updateMessage(message.id, values)
        : await createMessage(values)

      if (success) {
        handleDialogClose()
      }
    },
    [createMessage, handleDialogClose, message, updateMessage],
  )

  return {
    handleCreateDialogOpen,
    handleDialogClose,
    handleEditDialogOpen,
    handleMessageSubmit,
    message,
    open,
  }
}
