import AddRoundedIcon from '@mui/icons-material/AddRounded'
import {
  FormControl,
  MenuItem,
  type SelectChangeEvent,
  Typography,
} from '@mui/material'

import { AppButton } from '@/shared/components/app-button'
import { AppSelect } from '@/shared/components/app-select'

import type { MessageStatusFilter } from '../services/messages.service'

type MessagesHeaderProps = {
  onNew: () => void
  onStatusChange: (status: MessageStatusFilter) => void
  status: MessageStatusFilter
}

export function MessagesHeader({
  onNew,
  onStatusChange,
  status,
}: MessagesHeaderProps) {
  function handleStatusChange(event: SelectChangeEvent) {
    onStatusChange(event.target.value as MessageStatusFilter)
  }

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <Typography component="h2" variant="h4">
        Mensagens
      </Typography>

      <div className="flex w-full gap-2 sm:w-auto">
        <FormControl fullWidth className="min-w-36 sm:w-40">
          <AppSelect<string>
            aria-label="Filtrar mensagens por status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="sent">Enviadas</MenuItem>
            <MenuItem value="scheduled">Agendadas</MenuItem>
          </AppSelect>
        </FormControl>

        <AppButton
          className="shrink-0 whitespace-nowrap"
          startIcon={<AddRoundedIcon />}
          variant="contained"
          onClick={onNew}
        >
          Nova mensagem
        </AppButton>
      </div>
    </div>
  )
}
