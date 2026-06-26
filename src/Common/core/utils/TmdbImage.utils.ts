import { TMDB_CONFIG, TMDB_IMAGE_SIZES } from '../constants/Tmdb.constants'

const buildImageUrl = (size: string, path: string | null): string | null => {
  if (!path) return null
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`
}

export const getPosterUrl = (path: string | null): string | null =>
  buildImageUrl(TMDB_IMAGE_SIZES.POSTER, path)

export const getBackdropUrl = (path: string | null): string | null =>
  buildImageUrl(TMDB_IMAGE_SIZES.BACKDROP, path)

export const getProfileUrl = (path: string | null): string | null =>
  buildImageUrl(TMDB_IMAGE_SIZES.PROFILE, path)