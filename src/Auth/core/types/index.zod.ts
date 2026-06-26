import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'usernameRequired'),
  password: z
    .string()
    .min(1, 'passwordRequired')
    .min(6, 'passwordMinLength'),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>