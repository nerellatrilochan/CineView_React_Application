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
  
  export interface TmdbService {
    getTrendingMovies(): Promise<PaginatedMovies>
    getPopularMovies(): Promise<PaginatedMovies>
    getTopRatedMovies(): Promise<PaginatedMovies>
    getUpcomingMovies(): Promise<PaginatedMovies>
    getMovieGenres(): Promise<GenresResponse>
    searchMulti(query: string): Promise<SearchMultiResponse>
    getMovieDetails(movieId: number): Promise<MovieDetail>
    getMovieVideos(movieId: number): Promise<VideosResponse>
    getMovieCredits(movieId: number): Promise<CreditsResponse>
    getSimilarMovies(movieId: number): Promise<PaginatedMovies>
    getRecommendedMovies(movieId: number): Promise<PaginatedMovies>
    getTVShowDetails(showId: number): Promise<TVShowDetail>
    getTVShowVideos(showId: number): Promise<VideosResponse>
    getTVShowCredits(showId: number): Promise<CreditsResponse>
    getSeasonDetails(showId: number, seasonNumber: number): Promise<SeasonDetail>
  }