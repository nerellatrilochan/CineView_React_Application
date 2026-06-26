import type { z } from 'zod'
import { TMDB_CONFIG } from '../../../core/constants/Tmdb.constants'
import {
  creditsResponseSchema,
  genresResponseSchema,
  movieDetailSchema,
  paginatedMoviesSchema,
  searchMultiResponseSchema,
  seasonDetailSchema,
  tvShowDetailSchema,
  videosResponseSchema,
} from '../../../core/types/index.zod'
import type {
  CreditsResponse,
  GenresResponse,
  MovieDetail,
  PaginatedMovies,
  SearchMultiResponse,
  SeasonDetail,
  TVShowDetail,
  VideosResponse,
} from '../../../core/types/Tmdb.types'
import type { TmdbService } from './index'
import { TmdbNotFoundError } from './TmdbNotFoundError'

type TmdbLocaleProvider = () => { language: string; region: string }

export class TmdbAPI implements TmdbService {
  private localeProvider: TmdbLocaleProvider = () => ({
    language: 'en-US',
    region: 'US',
  })

  constructor(
    private readonly baseUrl: string = TMDB_CONFIG.BASE_URL,
    private readonly apiKey: string = TMDB_CONFIG.API_KEY,
  ) {}

  setLocaleProvider(provider: TmdbLocaleProvider): void {
    this.localeProvider = provider
  }

  private async request<T>(
    path: string,
    schema: z.ZodType<T>,
    params: Record<string, string> = {},
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error('VITE_TMDB_API_KEY is not configured')
    }

    const { language, region } = this.localeProvider()
    const url = new URL(`${this.baseUrl}${path}`)
    url.searchParams.set('api_key', this.apiKey)
    url.searchParams.set('language', language)
    url.searchParams.set('region', region)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    const response = await fetch(url.toString())

    if (response.status === 404) {
      throw new TmdbNotFoundError(path)
    }

    if (!response.ok) {
      throw new Error(`TMDB request failed (${response.status}): ${path}`)
    }

    const json: unknown = await response.json()
    return schema.parse(json)
  }

  getTrendingMovies(): Promise<PaginatedMovies> {
    return this.request('/trending/movie/day', paginatedMoviesSchema)
  }

  getPopularMovies(): Promise<PaginatedMovies> {
    return this.request('/movie/popular', paginatedMoviesSchema)
  }

  getTopRatedMovies(): Promise<PaginatedMovies> {
    return this.request('/movie/top_rated', paginatedMoviesSchema)
  }

  getUpcomingMovies(): Promise<PaginatedMovies> {
    return this.request('/movie/upcoming', paginatedMoviesSchema)
  }

  getMovieGenres(): Promise<GenresResponse> {
    return this.request('/genre/movie/list', genresResponseSchema)
  }

  searchMulti(query: string): Promise<SearchMultiResponse> {
    return this.request('/search/multi', searchMultiResponseSchema, {
      query,
      include_adult: 'false',
    })
  }

  getMovieDetails(movieId: number): Promise<MovieDetail> {
    return this.request(`/movie/${movieId}`, movieDetailSchema)
  }

  getMovieVideos(movieId: number): Promise<VideosResponse> {
    return this.request(`/movie/${movieId}/videos`, videosResponseSchema)
  }

  getMovieCredits(movieId: number): Promise<CreditsResponse> {
    return this.request(`/movie/${movieId}/credits`, creditsResponseSchema)
  }

  getSimilarMovies(movieId: number): Promise<PaginatedMovies> {
    return this.request(`/movie/${movieId}/similar`, paginatedMoviesSchema)
  }

  getRecommendedMovies(movieId: number): Promise<PaginatedMovies> {
    return this.request(`/movie/${movieId}/recommendations`, paginatedMoviesSchema)
  }

  getTVShowDetails(showId: number): Promise<TVShowDetail> {
    return this.request(`/tv/${showId}`, tvShowDetailSchema)
  }

  getTVShowVideos(showId: number): Promise<VideosResponse> {
    return this.request(`/tv/${showId}/videos`, videosResponseSchema)
  }

  getTVShowCredits(showId: number): Promise<CreditsResponse> {
    return this.request(`/tv/${showId}/credits`, creditsResponseSchema)
  }

  getSeasonDetails(showId: number, seasonNumber: number): Promise<SeasonDetail> {
    return this.request(
      `/tv/${showId}/season/${seasonNumber}`,
      seasonDetailSchema,
    )
  }
}