import { zodResolver } from '@hookform/resolvers/zod'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CrudFormDialog } from '@/shared/components/crud-form-dialog'
import { InputText } from '@/shared/components/input-text'

import {
  type ConnectionFormValues,
  connectionSchema,
} from '../schemas/connection.schema'
import type { ConnectionRow } from '../types/connection.type'

type ConnectionFormDialogProps = {
  open: boolean
  connection: ConnectionRow | null
  onClose: () => void
  onSubmit: (values: ConnectionFormValues) => Promise<void> | void
}

export function ConnectionFormDialog({
  open,
  connection,
  onClose,
  onSubmit,
}: ConnectionFormDialogProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ConnectionFormValues>({
    defaultValues: { name: '' },
    resolver: zodResolver(connectionSchema),
  })

  useEffect(() => {
    if (open) {
      reset({ name: connection?.name ?? '' })
    }
  }, [open, connection, reset])

  const isEditing = Boolean(connection)

  return (
    <CrudFormDialog
      description={
        isEditing
          ? 'Renomeie a conexão sem alterar os dados vinculados.'
          : 'Defina um nome curto para identificar esta conexão.'
      }
      icon={<HubOutlinedIcon fontSize="small" />}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit((values) => onSubmit(values))}
      open={open}
      title={isEditing ? 'Editar conexão' : 'Nova conexão'}
    >
      <InputText
        autoFocus
        control={control}
        fullWidth
        label="Nome da conexão"
        name="name"
        placeholder="Ex: WhatsApp Vendas"
      />
    </CrudFormDialog>
  )
}
