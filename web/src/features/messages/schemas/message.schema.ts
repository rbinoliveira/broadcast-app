import z from 'zod'

export const messageSchema = z
  .object({
    contactIds: z.array(z.string()).min(1, 'Selecione pelo menos um contato'),
    content: z.string().trim().min(1, 'Informe a mensagem'),
    scheduledAt: z.string(),
    sendMode: z.enum(['now', 'scheduled']),
  })
  .refine((data) => data.sendMode === 'now' || Boolean(data.scheduledAt), {
    message: 'Informe a data de agendamento',
    path: ['scheduledAt'],
  })
  .refine(
    (data) => {
      if (data.sendMode === 'now' || !data.scheduledAt) {
        return true
      }
      const scheduled = new Date(data.scheduledAt)
      return (
        !Number.isNaN(scheduled.getTime()) && scheduled.getTime() > Date.now()
      )
    },
    {
      message: 'O agendamento deve ser em uma data futura',
      path: ['scheduledAt'],
    },
  )

export type MessageFormValues = z.infer<typeof messageSchema>
