import { useNavigate } from 'react-router-dom'

import { AppShell } from '@/shared/components/app-shell'
import { PageHeader } from '@/shared/components/page-header'
import { useSearchFilter } from '@/shared/hooks/use-search-filter'

import { ConnectionFormDialog } from '../components/connection-form-dialog'
import { ConnectionsHeader } from '../components/connections-header'
import { ConnectionsList } from '../components/connections-list'
import { useActiveConnection } from '../hooks/use-active-connection.hook'
import { useConnectionFormDialog } from '../hooks/use-connection-form-dialog.hook'
import { useConnections } from '../hooks/use-connections.hook'

export function ConnectionsPage() {
  const navigate = useNavigate()
  const { setActiveConnectionId } = useActiveConnection()
  const {
    connections,
    loading,
    createConnection,
    updateConnection,
    removeConnection,
  } = useConnections()
  const { search, setSearch, filteredItems } = useSearchFilter({
    items: connections,
    getSearchText: (connection) => connection.name,
  })
  const connectionDialog = useConnectionFormDialog({
    createConnection,
    updateConnection,
  })

  function handleContactsOpen(connectionId: string) {
    setActiveConnectionId(connectionId)
    navigate('/contacts')
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <PageHeader
          breadcrumbs={['Broadcast', 'Conexões']}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar por nome"
        />

        <ConnectionsHeader />

        <ConnectionsList
          connections={filteredItems}
          loading={loading}
          onNew={connectionDialog.handleCreateDialogOpen}
          onEdit={connectionDialog.handleEditDialogOpen}
          onOpen={handleContactsOpen}
          onDelete={removeConnection}
        />
      </div>

      <ConnectionFormDialog
        open={connectionDialog.open}
        connection={connectionDialog.connection}
        onClose={connectionDialog.handleDialogClose}
        onSubmit={connectionDialog.handleConnectionSubmit}
      />
    </AppShell>
  )
}
