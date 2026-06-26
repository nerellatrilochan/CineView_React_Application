import { MAX_RECENT_SEARCHES, RECENT_SEARCHES_STORAGE_KEY } from '../../../core/constants/Search.constants'
import { recentSearchesSchema } from '../../../core/types/index.zod'

export class RecentSearchService {
  getRecentSearches(): string[] {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY)
      if (!raw) return []
      return recentSearchesSchema.parse(JSON.parse(raw))
    } catch {
      return []
    }
  }

  addSearch(query: string): string[] {
    const trimmed = query.trim()
    if (!trimmed) return this.getRecentSearches()

    const updated = [
      trimmed,
      ...this.getRecentSearches().filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase(),
      ),
    ].slice(0, MAX_RECENT_SEARCHES)

    localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(updated))
    return updated
  }

  clearAll(): void {
    localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY)
  }
}