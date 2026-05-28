import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import { Card, CardContent, Tooltip, Typography } from '@mui/material'
import type { KeyboardEvent, MouseEvent } from 'react'

import { AppButton } from '@/shared/components/app-button'

import type { ConnectionRow } from '../types/connection.type'

type ConnectionCardProps = {
  connection: ConnectionRow
  onDelete: (connectionId: string) => void
  onEdit: (connection: ConnectionRow) => void
  onOpen: (connectionId: string) => void
}

export function ConnectionCard({
  connection,
  onDelete,
  onEdit,
  onOpen,
}: ConnectionCardProps) {
  function handleActionClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen(connection.id)
    }
  }

  return (
    <Card
      onClick={() => onOpen(connection.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      variant="outlined"
      className="group relative flex min-h-[150px] cursor-pointer flex-col overflow-hidden before:absolute before:inset-0 before:border-t-[3px] before:border-brand before:opacity-75 before:content-[''] hover:-translate-y-px hover:border-brand/45"
    >
      <CardContent className="relative flex min-h-[150px] grow flex-col items-center justify-center gap-2.5 text-center">
        <div className="absolute top-2 right-2 flex flex-row gap-1 opacity-100 transition-opacity duration-[120ms] md:opacity-[0.72] md:group-hover:opacity-100">
          <Tooltip title="Editar">
            <AppButton
              iconOnly
              aria-label={`Editar ${connection.name}`}
              onClick={(event) => {
                handleActionClick(event)
                onEdit(connection)
              }}
              size="small"
            >
              <EditOutlinedIcon fontSize="small" />
            </AppButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <AppButton
              iconOnly
              aria-label={`Excluir ${connection.name}`}
              color="error"
              onClick={(event) => {
                handleActionClick(event)
                onDelete(connection.id)
              }}
              size="small"
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </AppButton>
          </Tooltip>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/[0.22] bg-brand/10 text-brand dark:border-brand/[0.28] dark:bg-brand/[0.14]">
          <HubOutlinedIcon fontSize="small" />
        </div>

        <Typography
          noWrap
          title={connection.name}
          className="max-w-full font-bold"
          variant="h6"
        >
          {connection.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
