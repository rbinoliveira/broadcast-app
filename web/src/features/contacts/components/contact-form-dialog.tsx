import { zodResolver } from '@hookform/resolvers/zod'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CrudFormDialog } from '@/shared/components/crud-form-dialog'
import { InputMaskedText } from '@/shared/components/input-masked-text'
import { InputText } from '@/shared/components/input-text'

import {
  type ContactFormValues,
  contactSchema,
} from '../schemas/contact.schema'
import type { ContactRow } from '../types/contact.type'
import { maskPhone } from '../utils/phone-mask'

type ContactFormDialogProps = {
  contact: ContactRow | null
  onClose: () => void
  onSubmit: (values: ContactFormValues) => Promise<void> | void
  open: boolean
}

export function ContactFormDialog({
  contact,
  onClose,
  onSubmit,
  open,
}: ContactFormDialogProps) {
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { name: '', phone: '' },
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    if (open) {
      reset({
        name: contact?.name ?? '',
        phone: contact?.phone ?? '',
      })
    }
  }, [contact, open, reset])

  const isEditing = Boolean(contact)

  return (
    <CrudFormDialog
      description={
        isEditing
          ? 'Atualize os dados usados nas listas de envio.'
          : 'Cadastre um contato para esta conexão.'
      }
      icon={<PersonOutlineOutlinedIcon fontSize="small" />}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit((values) => onSubmit(values))}
      open={open}
      title={isEditing ? 'Editar contato' : 'Novo contato'}
    >
      <InputText
        autoFocus
        control={control}
        fullWidth
        label="Nome"
        name="name"
        placeholder="Ex: Maria Silva"
      />
      <InputMaskedText
        control={control}
        fullWidth
        inputMode="tel"
        label="Telefone"
        mask={maskPhone}
        name="phone"
        placeholder="Ex: (85) 99999-9999"
      />
    </CrudFormDialog>
  )
}
