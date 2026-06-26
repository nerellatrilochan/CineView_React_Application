import { z } from 'zod'

export const preferencesSchema = z.object({
  language: z.enum(['en', 'es']),
  theme: z.enum(['light', 'dark']),
  region: z.enum(['US', 'GB', 'IN', 'ES', 'FR', 'DE']),
})

export type StoredPreferences = z.infer<typeof preferencesSchema>