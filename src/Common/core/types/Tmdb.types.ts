import type { z } from 'zod'
import type {
  castMemberSchema,
  episodeSchema,
  genreSchema,
  movieDetailSchema,
  movieSummarySchema,
  paginatedMoviesSchema,
  paginatedPeopleSchema,
  paginatedTVShowsSchema,
  personSummarySchema,
  searchMultiResponseSchema,
  seasonDetailSchema,
  seasonSummarySchema,
  tvShowDetailSchema,
  tvShowSummarySchema,
  videoSchema,
  videosResponseSchema,
  creditsResponseSchema,
  genresResponseSchema,
} from './index.zod'

export type MovieSummary = z.infer<typeof movieSummarySchema>
export type MovieDetail = z.infer<typeof movieDetailSchema>
export type TVShowSummary = z.infer<typeof tvShowSummarySchema>
export type TVShowDetail = z.infer<typeof tvShowDetailSchema>
export type PersonSummary = z.infer<typeof personSummarySchema>
export type Genre = z.infer<typeof genreSchema>
export type CastMember = z.infer<typeof castMemberSchema>
export type Video = z.infer<typeof videoSchema>
export type SeasonSummary = z.infer<typeof seasonSummarySchema>
export type SeasonDetail = z.infer<typeof seasonDetailSchema>
export type Episode = z.infer<typeof episodeSchema>

export type PaginatedMovies = z.infer<typeof paginatedMoviesSchema>
export type PaginatedTVShows = z.infer<typeof paginatedTVShowsSchema>
export type PaginatedPeople = z.infer<typeof paginatedPeopleSchema>
export type SearchMultiResponse = z.infer<typeof searchMultiResponseSchema>
export type VideosResponse = z.infer<typeof videosResponseSchema>
export type CreditsResponse = z.infer<typeof creditsResponseSchema>
export type GenresResponse = z.infer<typeof genresResponseSchema>

export type SearchResultItem =
  | (MovieSummary & { media_type: 'movie' })
  | (TVShowSummary & { media_type: 'tv' })
  | (PersonSummary & { media_type: 'person' })