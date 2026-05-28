import { zodResolver } from '@hookform/resolvers/zod'
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined'
import { FormControl, FormLabel, MenuItem } from '@mui/material'
import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

import type { ContactRow } from '@/features/contacts/types/contact.type'
import { AppSelect } from '@/shared/components/app-select'
import { CrudFormDialog } from '@/shared/components/crud-form-dialog'
import { InputMultiAutocomplete } from '@/shared/components/input-multi-autocomplete'
import { InputText } from '@/shared/components/input-text'

import {
  type MessageFormValues,
  messageSchema,
} from '../schemas/message.schema'
import type { MessageRow } from '../types/message.type'

type MessageFormDialogProps = {
  contacts: ContactRow[]
  message: MessageRow | null
  onClose: () => void
  onSubmit: (values: MessageFormValues) => Promise<void> | void
  open: boolean
}

function formatDateTimeLocal(value: Date) {
  const timezoneOffset = value.getTimezoneOffset() * 60000
  return new Date(value.getTime() - timezoneOffset).toISOString().slice(0, 16)
}

function getDefaultScheduledAt() {
  const date = new Date()
  date.setMinutes(date.getMinutes() + 10)
  return formatDateTimeLocal(date)
}

export function MessageFormDialog({
  contacts,
  message,
  onClose,
  onSubmit,
  open,
}: MessageFormDialogProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<MessageFormValues>({
    defaultValues: {
      contactIds: [],
      content: '',
      scheduledAt: getDefaultScheduledAt(),
      sendMode: 'now',
    },
    resolver: zodResolver(messageSchema),
  })
  const sendMode = useWatch({ control, name: 'sendMode' })

  useEffect(() => {
    if (open) {
      reset({
        contactIds: message?.contactIds ?? [],
        content: message?.content ?? '',
        scheduledAt: message?.scheduledAt
          ? formatDateTimeLocal(message.scheduledAt.toDate())
          : getDefaultScheduledAt(),
        sendMode: message?.status === 'scheduled' ? 'scheduled' : 'now',
      })
    }
  }, [message, open, reset])

  const isEditing = Boolean(message)

  return (
    <CrudFormDialog
      description={
        isEditing
          ? 'Atualize os contatos, texto e agendamento da mensagem.'
          : 'Selecione contatos e envie agora ou agende o disparo.'
      }
      icon={<MarkEmailUnreadOutlinedIcon fontSize="small" />}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit((values) => onSubmit(values))}
      open={open}
      title={isEditing ? 'Editar mensagem' : 'Nova mensagem'}
    >
      <InputMultiAutocomplete
        control={control}
        fullWidth
        getOptionLabel={(contact) => `${contact.name} · ${contact.phone}`}
        label="Contatos"
        name="contactIds"
        options={contacts}
        placeholder="Buscar por nome ou telefone"
      />

      <InputText
        control={control}
        fullWidth
        label="Mensagem"
        multiline
        minRows={3}
        name="content"
        placeholder="Digite a mensagem"
      />

      <Controller
        control={control}
        name="sendMode"
        render={({ field }) => (
          <FormControl fullWidth>
            <FormLabel>Disparo</FormLabel>
            <AppSelect {...field}>
              <MenuItem value="now">Enviar agora</MenuItem>
              <MenuItem value="scheduled">Agendar</MenuItem>
            </AppSelect>
          </FormControl>
        )}
      />

      {sendMode === 'scheduled' ? (
        <InputText
          control={control}
          fullWidth
          label="Data do disparo"
          name="scheduledAt"
          slotProps={{ htmlInput: { min: formatDateTimeLocal(new Date()) } }}
          type="datetime-local"
        />
      ) : null}
    </CrudFormDialog>
  )
}
