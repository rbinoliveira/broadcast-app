import { useActiveConnection } from '@/features/connections/hooks/use-active-connection.hook'
import { useConnections } from '@/features/connections/hooks/use-connections.hook'
import { ContactFormDialog } from '@/features/contacts/components/contact-form-dialog'
import { ContactsHeader } from '@/features/contacts/components/contacts-header'
import { ContactsTable } from '@/features/contacts/components/contacts-table'
import { useContactFormDialog } from '@/features/contacts/hooks/use-contact-form-dialog.hook'
import { useContacts } from '@/features/contacts/hooks/use-contacts.hook'
import { AppShell } from '@/shared/components/app-shell'
import { PageHeader } from '@/shared/components/page-header'

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
      <div className="flex flex-col gap-6">
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
      </div>

      <ContactFormDialog
        contact={contactDialog.contact}
        onClose={contactDialog.handleDialogClose}
        onSubmit={contactDialog.handleContactSubmit}
        open={contactDialog.open}
      />
    </AppShell>
  )
}
