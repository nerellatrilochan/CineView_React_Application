export const TMDB_CONFIG = {
    API_KEY: import.meta.env.VITE_TMDB_API_KEY,
    BASE_URL: import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL:
      import.meta.env.VITE_TMDB_IMAGE_BASE_URL ?? 'https://image.tmdb.org/t/p',
  } as const
  
  export const TMDB_IMAGE_SIZES = {
    POSTER: 'w342',
    BACKDROP: 'w1280',
    PROFILE: 'w185',
  } as const
  
  export const YOUTUBE_EMBED_BASE_URL = 'https://www.youtube.com/embed'