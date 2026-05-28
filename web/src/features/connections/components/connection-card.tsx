import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import type { KeyboardEvent, MouseEvent } from 'react'

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
      sx={(theme) => ({
        cursor: 'pointer',
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderTop: '3px solid',
          borderColor: 'primary.main',
          opacity: 0.75,
        },
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.45),
          transform: 'translateY(-1px)',
        },
        '&:hover .connection-actions': {
          opacity: 1,
        },
      })}
    >
      <CardContent
        sx={{
          alignItems: 'center',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 1.25,
          minHeight: 150,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Stack
          className="connection-actions"
          direction="row"
          spacing={0.5}
          sx={{
            opacity: { xs: 1, md: 0.72 },
            position: 'absolute',
            right: 8,
            top: 8,
            transition: 'opacity 120ms ease',
          }}
        >
          <Tooltip title="Editar">
            <IconButton
              aria-label={`Editar ${connection.name}`}
              onClick={(event) => {
                handleActionClick(event)
                onEdit(connection)
              }}
              size="small"
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton
              aria-label={`Excluir ${connection.name}`}
              color="error"
              onClick={(event) => {
                handleActionClick(event)
                onDelete(connection.id)
              }}
              size="small"
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box
          sx={(theme) => ({
            alignItems: 'center',
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.22),
            borderRadius: 1,
            color: 'primary.main',
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40,
            ...theme.applyStyles('dark', {
              bgcolor: alpha(theme.palette.primary.main, 0.14),
              borderColor: alpha(theme.palette.primary.main, 0.28),
            }),
          })}
        >
          <HubOutlinedIcon fontSize="small" />
        </Box>

        <Typography
          noWrap
          title={connection.name}
          sx={{ fontWeight: 700, maxWidth: '100%' }}
          variant="h6"
        >
          {connection.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
