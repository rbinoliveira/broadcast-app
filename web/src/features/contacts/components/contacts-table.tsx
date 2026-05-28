import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import {
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

import type { ContactRow } from '../types/contact.type'

type ContactsTableProps = {
  contacts: ContactRow[]
  hasNextPage: boolean
  loading: boolean
  onDelete: (contactId: string) => void
  onEdit: (contact: ContactRow) => void
  onNextPage: () => void
  onPreviousPage: () => void
  page: number
}

export function ContactsTable({
  contacts,
  hasNextPage,
  loading,
  onDelete,
  onEdit,
  onNextPage,
  onPreviousPage,
  page,
}: ContactsTableProps) {
  const isEmpty = !loading && contacts.length === 0

  return (
    <div className="flex flex-col gap-4">
      <TableContainer component={Paper} variant="outlined" className="relative">
        {loading ? (
          <LinearProgress
            aria-label="Carregando contatos"
            className="absolute top-0 right-0 left-0"
          />
        ) : null}

        <Table aria-label="Contatos">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align="right" className="w-28">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow hover key={contact.id}>
                <TableCell>
                  <Typography className="font-semibold">
                    {contact.name}
                  </Typography>
                </TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <AppButton
                      iconOnly
                      aria-label={`Editar ${contact.name}`}
                      onClick={() => onEdit(contact)}
                      size="small"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </AppButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <AppButton
                      iconOnly
                      aria-label={`Excluir ${contact.name}`}
                      color="error"
                      onClick={() => onDelete(contact.id)}
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
              Nenhum contato encontrado.
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
