import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

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
    <Stack spacing={2}>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ position: 'relative' }}
      >
        {loading ? (
          <LinearProgress
            aria-label="Carregando contatos"
            sx={{ left: 0, position: 'absolute', right: 0, top: 0 }}
          />
        ) : null}

        <Table aria-label="Contatos">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align="right" sx={{ width: 112 }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow hover key={contact.id}>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>
                    {contact.name}
                  </Typography>
                </TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton
                      aria-label={`Editar ${contact.name}`}
                      onClick={() => onEdit(contact)}
                      size="small"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      aria-label={`Excluir ${contact.name}`}
                      color="error"
                      onClick={() => onDelete(contact.id)}
                      size="small"
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isEmpty ? (
          <Box sx={{ px: 2, py: 5, textAlign: 'center' }}>
            <Typography color="text.secondary">
              Nenhum contato encontrado.
            </Typography>
          </Box>
        ) : null}
      </TableContainer>

      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
      >
        <Typography color="text.secondary" variant="body2">
          Página {page + 1}
        </Typography>
        <Button
          disabled={loading || page === 0}
          onClick={onPreviousPage}
          startIcon={<NavigateBeforeRoundedIcon />}
          variant="outlined"
        >
          Anterior
        </Button>
        <Button
          disabled={loading || !hasNextPage}
          endIcon={<NavigateNextRoundedIcon />}
          onClick={onNextPage}
          variant="outlined"
        >
          Próxima
        </Button>
      </Stack>
    </Stack>
  )
}
