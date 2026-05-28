import z from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome do contato'),
  phone: z.string().trim().min(1, 'Informe o telefone do contato'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
