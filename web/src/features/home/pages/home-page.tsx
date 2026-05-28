import { Stack } from '@mui/material'

import { ConnectionFormDialog } from '@/features/connections/components/connection-form-dialog'
import { ConnectionsHeader } from '@/features/connections/components/connections-header'
import { ConnectionsList } from '@/features/connections/components/connections-list'
import { useConnectionFormDialog } from '@/features/connections/hooks/use-connection-form-dialog.hook'
import { useConnections } from '@/features/connections/hooks/use-connections.hook'
import { PageHeader } from '@/shared/components/page-header'
import { useSearchFilter } from '@/shared/hooks/use-search-filter'

import { AppShell } from '../components/app-shell'

export function HomePage() {
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
