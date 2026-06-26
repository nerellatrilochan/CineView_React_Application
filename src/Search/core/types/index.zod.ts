import { z } from 'zod'

export const recentSearchesSchema = z.array(
  z.string().trim().min(1).max(100),
)