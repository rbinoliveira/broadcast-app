import { z } from 'zod'

export const connectionSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome da conexão'),
})

export type ConnectionFormValues = z.infer<typeof connectionSchema>
