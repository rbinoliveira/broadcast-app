import z from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1, 'Informe seu nome'),
  email: z.email('Informe um e-mail valido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

export type SignupFormValues = z.infer<typeof signupSchema>
