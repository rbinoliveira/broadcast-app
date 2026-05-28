import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import {
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import { AppButton } from '@/shared/components/app-button'

import type { MessageRow } from '../types/message.type'

type MessagesTableProps = {
  hasNextPage: boolean
  loading: boolean
  messages: MessageRow[]
  onDelete: (messageId: string) => void
  onEdit: (message: MessageRow) => void
  onNextPage: () => void
  onPreviousPage: () => void
  page: number
}

function formatDate(value: MessageRow['scheduledAt']) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(value.toDate())
}

export function MessagesTable({
  hasNextPage,
  loading,
  messages,
  onDelete,
  onEdit,
  onNextPage,
  onPreviousPage,
  page,
}: MessagesTableProps) {
  const isEmpty = !loading && messages.length === 0

  return (
    <div className="flex flex-col gap-4">
      <TableContainer component={Paper} variant="outlined" className="relative">
        {loading ? (
          <LinearProgress
            aria-label="Carregando mensagens"
            className="absolute top-0 right-0 left-0"
          />
        ) : null}

        <Table aria-label="Mensagens">
          <TableHead>
            <TableRow>
              <TableCell>Mensagem</TableCell>
              <TableCell>Contatos</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Agendamento</TableCell>
              <TableCell align="right" className="w-28">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow hover key={message.id}>
                <TableCell className="max-w-[340px]">
                  <Typography noWrap title={message.content}>
                    {message.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  {message.contacts.length
                    ? message.contacts.map((contact) => contact.name).join(', ')
                    : `${message.contactIds.length} contato(s)`}
                </TableCell>
                <TableCell>
                  <Chip
                    color={message.status === 'sent' ? 'success' : 'warning'}
                    label={message.status === 'sent' ? 'Enviada' : 'Agendada'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{formatDate(message.scheduledAt)}</TableCell>
                <TableCell align="right">
                  {message.status === 'sent' ? null : (
                    <Tooltip title="Editar">
                      <AppButton
                        iconOnly
                        aria-label="Editar mensagem"
                        onClick={() => onEdit(message)}
                        size="small"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </AppButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Excluir">
                    <AppButton
                      iconOnly
                      aria-label="Excluir mensagem"
                      color="error"
                      onClick={() => onDelete(message.id)}
                      size="small"
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </AppButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isEmpty ? (
          <div className="px-4 py-10 text-center">
            <Typography color="text.secondary">
              Nenhuma mensagem encontrada.
            </Typography>
          </div>
        ) : null}
      </TableContainer>

      <div className="flex flex-row items-center justify-end gap-2">
        <Typography color="text.secondary" variant="body2">
          Página {page + 1}
        </Typography>
        <AppButton
          disabled={loading || page === 0}
          onClick={onPreviousPage}
          startIcon={<NavigateBeforeRoundedIcon />}
          variant="outlined"
        >
          Anterior
        </AppButton>
        <AppButton
          disabled={loading || !hasNextPage}
          endIcon={<NavigateNextRoundedIcon />}
          onClick={onNextPage}
          variant="outlined"
        >
          Próxima
        </AppButton>
      </div>
    </div>
  )
}
