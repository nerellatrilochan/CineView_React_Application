import { z } from 'zod'

export const watchlistStatusSchema = z.enum([
  'want_to_watch',
  'watching',
  'completed',
])

export const watchlistMediaTypeSchema = z.enum(['movie', 'tv'])

export const watchlistMediaSnapshotSchema = z.object({
  title: z.string().min(1),
  posterPath: z.string().nullable(),
  rating: z.number(),
})

export const watchlistEntrySchema = z.object({
  id: z.uuid(),
  mediaType: watchlistMediaTypeSchema,
  mediaId: z.number().int().positive(),
  status: watchlistStatusSchema,
  note: z.string().max(300).optional(),
  snapshot: watchlistMediaSnapshotSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const watchlistStorageSchema = z.object({
  version: z.literal(1),
  entries: z.array(watchlistEntrySchema),
})

export const addWatchlistInputSchema = z.object({
  mediaType: watchlistMediaTypeSchema,
  mediaId: z.number().int().positive(),
  snapshot: watchlistMediaSnapshotSchema,
  status: watchlistStatusSchema.optional(),
  note: z.string().max(300).optional(),
})

export const updateWatchlistStatusInputSchema = z.object({
  entryId: z.uuid(),
  status: watchlistStatusSchema,
})

export const updateWatchlistNoteInputSchema = z.object({
  entryId: z.uuid(),
  note: z.string().max(300),
})