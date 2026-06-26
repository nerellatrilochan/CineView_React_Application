import type { z } from 'zod'
import type { recentSearchesSchema } from './index.zod'

export type RecentSearches = z.infer<typeof recentSearchesSchema>