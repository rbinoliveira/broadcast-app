import { useActiveConnection } from '@/features/connections/hooks/use-active-connection.hook'
import { useConnections } from '@/features/connections/hooks/use-connections.hook'
import { useConnectionContacts } from '@/features/contacts/hooks/use-connection-contacts.hook'
import { AppShell } from '@/shared/components/app-shell'
import { PageHeader } from '@/shared/components/page-header'

import { MessageFormDialog } from '../components/message-form-dialog'
import { MessagesHeader } from '../components/messages-header'
import { MessagesTable } from '../components/messages-table'
import { useMessageFormDialog } from '../hooks/use-message-form-dialog.hook'
import { useMessages } from '../hooks/use-messages.hook'

export function MessagesPage() {
  const { activeConnectionId } = useActiveConnection()
  const { connections } = useConnections()
  const activeConnection =
    connections.find((connection) => connection.id === activeConnectionId) ??
    connections[0]
  const activeConnectionIdOrFallback = activeConnection?.id
  const { contacts } = useConnectionContacts({
    connectionId: activeConnectionIdOrFallback,
  })
  const {
    createMessage,
    handleStatusFilterChange,
    loading,
    messages,
    removeMessage,
    statusFilter,
    updateMessage,
  } = useMessages({
    connectionId: activeConnectionIdOrFallback,
    contacts,
  })
  const messageDialog = useMessageFormDialog({
    createMessage,
    updateMessage,
  })

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <PageHeader breadcrumbs={['Broadcast', 'Mensagens']} />

        <MessagesHeader
          status={statusFilter}
          onStatusChange={handleStatusFilterChange}
          onNew={messageDialog.handleCreateDialogOpen}
        />

        <MessagesTable
          loading={loading}
          messages={messages}
          onDelete={removeMessage}
          onEdit={messageDialog.handleEditDialogOpen}
        />
      </div>

      <MessageFormDialog
        contacts={contacts}
        message={messageDialog.message}
        onClose={messageDialog.handleDialogClose}
        onSubmit={messageDialog.handleMessageSubmit}
        open={messageDialog.open}
      />
    </AppShell>
  )
}
