import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import {
  Box,
  CircularProgress,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material'

import { useActiveConnection } from '../context/active-connection-context'
import { useConnections } from '../hooks/use-connections.hook'

type ActiveConnectionSelectProps = {
  onChange?: () => void
}

export function ActiveConnectionSelect({
  onChange,
}: ActiveConnectionSelectProps) {
  const { activeConnectionId, setActiveConnectionId } = useActiveConnection()
  const { connections, loading } = useConnections()
  const selectedConnection = connections.find(
    (connection) => connection.id === activeConnectionId,
  )
  const selectedConnectionId =
    selectedConnection?.id ?? connections[0]?.id ?? ''
  const disabled = loading || connections.length === 0

  function handleConnectionChange(event: SelectChangeEvent) {
    setActiveConnectionId(event.target.value)
    onChange?.()
  }

  return (
    <FormControl fullWidth size="small">
      <Select
        aria-label="Selecionar conexão ativa"
        disabled={disabled}
        displayEmpty
        onChange={handleConnectionChange}
        renderValue={(value) => {
          if (!value && loading) {
            return (
              <Box
                component="span"
                sx={{
                  alignItems: 'center',
                  display: 'inline-flex',
                  height: 20,
                }}
              >
                <CircularProgress color="inherit" size={14} />
              </Box>
            )
          }

          if (!value) {
            return 'Nenhuma conexão'
          }

          return (
            connections.find((connection) => connection.id === value)?.name ??
            'Conexão'
          )
        }}
        sx={{
          cursor: disabled ? 'default' : 'pointer',
          height: 40,
          p: 0,
          '& .MuiSelect-select': {
            alignItems: 'center',
            cursor: disabled ? 'default' : 'pointer',
            display: 'flex',
            minHeight: '40px',
            px: 1.5,
            py: 0,
          },
          '& .MuiSelect-icon': {
            cursor: disabled ? 'default' : 'pointer',
            pointerEvents: 'none',
          },
          '& input': {
            cursor: disabled ? 'default' : 'pointer',
          },
        }}
        value={selectedConnectionId}
      >
        {connections.map((connection) => (
          <MenuItem key={connection.id} value={connection.id}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <HubOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={connection.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
