import { useCallback, useState } from 'react'

import type { ConnectionFormValues } from '../schemas/connection.schema'
import type { ConnectionRow } from '../types/connection.type'

type UseConnectionFormDialogParams = {
  createConnection: (values: ConnectionFormValues) => Promise<boolean>
  updateConnection: (
    connectionId: string,
    values: ConnectionFormValues,
  ) => Promise<boolean>
}

export function useConnectionFormDialog({
  createConnection,
  updateConnection,
}: UseConnectionFormDialogParams) {
  const [open, setOpen] = useState(false)
  const [connection, setConnection] = useState<ConnectionRow | null>(null)

  const handleCreateDialogOpen = useCallback(() => {
    setConnection(null)
    setOpen(true)
  }, [])

  const handleEditDialogOpen = useCallback((nextConnection: ConnectionRow) => {
    setConnection(nextConnection)
    setOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setOpen(false)
    setConnection(null)
  }, [])

  const handleConnectionSubmit = useCallback(
    async (values: ConnectionFormValues) => {
      const success = connection
        ? await updateConnection(connection.id, values)
        : await createConnection(values)

      if (success) {
        handleDialogClose()
      }
    },
    [handleDialogClose, connection, createConnection, updateConnection],
  )

  return {
    connection,
    handleConnectionSubmit,
    handleCreateDialogOpen,
    handleDialogClose,
    handleEditDialogOpen,
    open,
  }
}
