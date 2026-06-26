export const buildMovieDetailPath = (movieId: number): string => `/movies/${movieId}`

export const buildTVShowDetailPath = (showId: number): string => `/tv/${showId}`

export const buildSeasonDetailPath = (
  showId: number,
  seasonNumber: number,
): string => `/tv/${showId}/season/${seasonNumber}`