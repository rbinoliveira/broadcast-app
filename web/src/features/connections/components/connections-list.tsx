import { Skeleton } from '@mui/material'

import type { ConnectionRow } from '../types/connection.type'
import { AddConnectionCard } from './add-connection-card'
import { ConnectionCard } from './connection-card'

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  )
}
