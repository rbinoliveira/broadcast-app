import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import {
  CircularProgress,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material'

import { AppSelect } from '@/shared/components/app-select'

import { useActiveConnection } from '../hooks/use-active-connection.hook'
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
      <AppSelect<string>
        aria-label="Selecionar conexão ativa"
        disabled={disabled}
        displayEmpty
        onChange={handleConnectionChange}
        renderValue={(value) => {
          if (!value && loading) {
            return (
              <span className="inline-flex h-5 items-center">
                <CircularProgress color="inherit" size={14} />
              </span>
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
        value={selectedConnectionId}
      >
        {connections.map((connection) => (
          <MenuItem key={connection.id} value={connection.id}>
            <ListItemIcon className="min-w-8">
              <HubOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={connection.name} />
          </MenuItem>
        ))}
      </AppSelect>
    </FormControl>
  )
}
