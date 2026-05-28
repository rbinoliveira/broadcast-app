import { Stack } from '@mui/material'

import { useActiveConnection } from '@/features/connections/context/active-connection-context'
import { useConnections } from '@/features/connections/hooks/use-connections.hook'
import { ContactFormDialog } from '@/features/contacts/components/contact-form-dialog'
import { ContactsHeader } from '@/features/contacts/components/contacts-header'
import { ContactsTable } from '@/features/contacts/components/contacts-table'
import { useContactFormDialog } from '@/features/contacts/hooks/use-contact-form-dialog.hook'
import { useContacts } from '@/features/contacts/hooks/use-contacts.hook'
import { PageHeader } from '@/shared/components/page-header'

import { AppShell } from '../../home/components/app-shell'

export function ContactsPage() {
  const { activeConnectionId } = useActiveConnection()
  const { connections } = useConnections()
  const activeConnection =
    connections.find((connection) => connection.id === activeConnectionId) ??
    connections[0]
  const activeConnectionIdOrFallback = activeConnection?.id
  const {
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
  } = useContacts({ connectionId: activeConnectionIdOrFallback })
  const contactDialog = useContactFormDialog({
    createContact,
    updateContact,
  })

  return (
    <AppShell>
      <Stack spacing={3}>
        <PageHeader
          breadcrumbs={['Broadcast', 'Conexões', 'Contatos']}
          search={search}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Buscar por nome ou telefone"
        />

        <ContactsHeader onNew={contactDialog.handleCreateDialogOpen} />

        <ContactsTable
          contacts={contacts}
          hasNextPage={hasNextPage}
          loading={loading}
          onDelete={removeContact}
          onEdit={contactDialog.handleEditDialogOpen}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          page={page}
        />
      </Stack>

      <ContactFormDialog
        contact={contactDialog.contact}
        onClose={contactDialog.handleDialogClose}
        onSubmit={contactDialog.handleContactSubmit}
        open={contactDialog.open}
      />
    </AppShell>
  )
}
