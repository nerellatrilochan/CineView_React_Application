import { z } from 'zod'

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
})

export const movieSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string(),
  vote_average: z.number(),
  release_date: z.string(),
  genre_ids: z.array(z.number()).optional(),
})

export const paginatedMoviesSchema = z.object({
  page: z.number(),
  results: z.array(movieSummarySchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const movieDetailSchema = movieSummarySchema.extend({
  runtime: z.number().nullable(),
  genres: z.array(genreSchema),
  status: z.string(),
  tagline: z.string().nullable().optional(),
})

export const tvShowSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  overview: z.string(),
  vote_average: z.number(),
  first_air_date: z.string(),
  genre_ids: z.array(z.number()).optional(),
})

export const paginatedTVShowsSchema = z.object({
  page: z.number(),
  results: z.array(tvShowSummarySchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const seasonSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  season_number: z.number(),
  episode_count: z.number(),
  poster_path: z.string().nullable(),
  overview: z.string(),
  air_date: z.string().nullable(),
})

export const tvShowDetailSchema = tvShowSummarySchema.extend({
  genres: z.array(genreSchema),
  number_of_seasons: z.number(),
  number_of_episodes: z.number(),
  status: z.string(),
  seasons: z.array(seasonSummarySchema),
})

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  still_path: z.string().nullable(),
  air_date: z.string(),
  episode_number: z.number(),
  season_number: z.number(),
  vote_average: z.number(),
  runtime: z.number().nullable(),
})

export const seasonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  season_number: z.number(),
  episodes: z.array(episodeSchema),
})

export const personSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  known_for_department: z.string().optional(),
  media_type: z.literal('person').optional(),
})

export const paginatedPeopleSchema = z.object({
  page: z.number(),
  results: z.array(personSummarySchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const searchResultSchema = z.discriminatedUnion('media_type', [
  movieSummarySchema.extend({ media_type: z.literal('movie') }),
  tvShowSummarySchema.extend({ media_type: z.literal('tv') }),
  personSummarySchema.extend({ media_type: z.literal('person') }),
])

export const searchMultiResponseSchema = z.object({
  page: z.number(),
  results: z.array(searchResultSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const videoSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
  official: z.boolean().optional(),
})

export const videosResponseSchema = z.object({
  id: z.number(),
  results: z.array(videoSchema),
})

export const castMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number().optional(),
})

export const creditsResponseSchema = z.object({
  id: z.number(),
  cast: z.array(castMemberSchema),
})