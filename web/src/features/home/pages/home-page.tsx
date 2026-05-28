import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ConnectionFormDialog } from '@/features/connections/components/connection-form-dialog'
import { ConnectionsHeader } from '@/features/connections/components/connections-header'
import { ConnectionsList } from '@/features/connections/components/connections-list'
import { useActiveConnection } from '@/features/connections/context/active-connection-context'
import { useConnectionFormDialog } from '@/features/connections/hooks/use-connection-form-dialog.hook'
import { useConnections } from '@/features/connections/hooks/use-connections.hook'
import { PageHeader } from '@/shared/components/page-header'
import { useSearchFilter } from '@/shared/hooks/use-search-filter'

import { AppShell } from '../components/app-shell'

export function HomePage() {
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
      <Stack spacing={3}>
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
      </Stack>

      <ConnectionFormDialog
        open={connectionDialog.open}
        connection={connectionDialog.connection}
        onClose={connectionDialog.handleDialogClose}
        onSubmit={connectionDialog.handleConnectionSubmit}
      />
    </AppShell>
  )
}
