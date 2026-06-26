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
  
  const mockMovie = {
    id: 1,
    title: 'Fixture Movie',
    poster_path: null,
    backdrop_path: null,
    overview: 'A fixture movie for tests.',
    vote_average: 8.2,
    release_date: '2024-01-01',
    genre_ids: [28],
  }
  
  const mockPaginatedMovies: PaginatedMovies = {
    page: 1,
    results: [mockMovie],
    total_pages: 1,
    total_results: 1,
  }
  
  export class TmdbFixture implements TmdbService {
    async getTrendingMovies(): Promise<PaginatedMovies> {
      return mockPaginatedMovies
    }
  
    async getPopularMovies(): Promise<PaginatedMovies> {
      return mockPaginatedMovies
    }
  
    async getTopRatedMovies(): Promise<PaginatedMovies> {
      return mockPaginatedMovies
    }
  
    async getUpcomingMovies(): Promise<PaginatedMovies> {
      return mockPaginatedMovies
    }
  
    async getMovieGenres(): Promise<GenresResponse> {
      return { genres: [{ id: 28, name: 'Action' }] }
    }
  
    async searchMulti(query: string): Promise<SearchMultiResponse> {
      return {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [{ ...mockMovie, media_type: 'movie' as const, title: query }],
      }
    }
  
    async getMovieDetails(movieId: number): Promise<MovieDetail> {
      return {
        ...mockMovie,
        id: movieId,
        runtime: 120,
        genres: [{ id: 28, name: 'Action' }],
        status: 'Released',
        tagline: 'Fixture tagline',
      }
    }
  
    async getMovieVideos(): Promise<VideosResponse> {
      return {
        id: 1,
        results: [
          {
            id: '1',
            key: 'dQw4w9WgXcQ',
            name: 'Trailer',
            site: 'YouTube',
            type: 'Trailer',
          },
        ],
      }
    }
  
    async getMovieCredits(): Promise<CreditsResponse> {
      return {
        id: 1,
        cast: [
          {
            id: 1,
            name: 'Fixture Actor',
            character: 'Hero',
            profile_path: null,
          },
        ],
      }
    }
  
    async getSimilarMovies(): Promise<PaginatedMovies> {
      return mockPaginatedMovies
    }
  
    async getRecommendedMovies(): Promise<PaginatedMovies> {
      return mockPaginatedMovies
    }
  
    async getTVShowDetails(showId: number): Promise<TVShowDetail> {
      return {
        id: showId,
        name: 'Fixture Show',
        poster_path: null,
        backdrop_path: null,
        overview: 'Fixture TV show.',
        vote_average: 7.5,
        first_air_date: '2020-01-01',
        genres: [{ id: 18, name: 'Drama' }],
        number_of_seasons: 1,
        number_of_episodes: 8,
        status: 'Ended',
        seasons: [
          {
            id: 1,
            name: 'Season 1',
            season_number: 1,
            episode_count: 8,
            poster_path: null,
            overview: '',
            air_date: '2020-01-01',
          },
        ],
      }
    }
  
    async getTVShowVideos(): Promise<VideosResponse> {
      return { id: 1, results: [] }
    }
  
    async getTVShowCredits(): Promise<CreditsResponse> {
      return { id: 1, cast: [] }
    }
  
    async getSeasonDetails(showId: number, seasonNumber: number): Promise<SeasonDetail> {
      return {
        id: 1,
        name: `Season ${seasonNumber}`,
        overview: 'Fixture season',
        poster_path: null,
        season_number: seasonNumber,
        episodes: [
          {
            id: 101,
            name: 'Pilot',
            overview: 'First episode',
            still_path: null,
            air_date: '2020-01-01',
            episode_number: 1,
            season_number: seasonNumber,
            vote_average: 8,
            runtime: 45,
          },
        ],
      }
    }
  }