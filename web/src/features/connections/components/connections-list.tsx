import { Box, Skeleton } from '@mui/material'

import type { ConnectionRow } from '../types/connection.type'
import { AddConnectionCard } from './add-connection-card'
import { ConnectionCard } from './connection-card'

const GRID_SX = {
  display: 'grid',
  gap: 2,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  },
} as const

const SKELETON_KEYS = ['s1', 's2', 's3']

type ConnectionsListProps = {
  connections: ConnectionRow[]
  loading: boolean
  onDelete: (connectionId: string) => void
  onEdit: (connection: ConnectionRow) => void
  onNew: () => void
  onOpen: (connectionId: string) => void
}

export function ConnectionsList({
  connections,
  loading,
  onDelete,
  onEdit,
  onNew,
  onOpen,
}: ConnectionsListProps) {
  return (
    <Box sx={GRID_SX}>
      <AddConnectionCard onClick={onNew} />

      {loading
        ? SKELETON_KEYS.map((key) => (
            <Skeleton key={key} height={150} variant="rounded" />
          ))
        : connections.map((connection) => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
              onDelete={onDelete}
              onEdit={onEdit}
              onOpen={onOpen}
            />
          ))}
    </Box>
  )
}
