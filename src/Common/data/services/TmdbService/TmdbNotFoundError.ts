export class TmdbNotFoundError extends Error {
    constructor(resource: string) {
      super(`TMDB resource not found: ${resource}`)
      this.name = 'TmdbNotFoundError'
    }
  }