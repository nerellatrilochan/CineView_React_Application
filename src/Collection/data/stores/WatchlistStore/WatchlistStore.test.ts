import { beforeEach, describe, expect, it } from 'vitest'
import { WATCHLIST_STORAGE_KEY } from '../../../core/constants/Watchlist.constants'
import { WatchlistStore } from './index'

const sampleMovie = {
  mediaType: 'movie' as const,
  mediaId: 550,
  snapshot: {
    title: 'Fight Club',
    posterPath: '/poster.jpg',
    rating: 8.4,
  },
}

describe('WatchlistStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds an entry with default want_to_watch status', () => {
    const store = new WatchlistStore()
    store.add(sampleMovie)

    expect(store.totalCount).toBe(1)
    expect(store.entries[0]?.status).toBe('want_to_watch')
    expect(store.isInWatchlist('movie', 550)).toBe(true)
  })

  it('toggles add and remove for the same media item', () => {
    const store = new WatchlistStore()

    store.toggle(sampleMovie)
    expect(store.totalCount).toBe(1)

    store.toggle(sampleMovie)
    expect(store.totalCount).toBe(0)
  })

  it('updates status for an existing entry', () => {
    const store = new WatchlistStore()
    store.add(sampleMovie)

    const entryId = store.entries[0]!.id
    store.updateStatus(entryId, 'completed')

    expect(store.entries[0]?.status).toBe('completed')
    expect(store.statusCounts.completed).toBe(1)
  })

  it('rejects notes longer than 300 characters', () => {
    const store = new WatchlistStore()
    store.add(sampleMovie)

    const entryId = store.entries[0]!.id
    store.updateNote(entryId, 'a'.repeat(301))

    expect(store.entries[0]?.note).toBeUndefined()
  })

  it('persists valid data to localStorage', () => {
    const store = new WatchlistStore()
    store.add(sampleMovie)

    const stored = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)!)
    expect(stored.version).toBe(1)
    expect(stored.entries).toHaveLength(1)
    expect(stored.entries[0].snapshot.title).toBe('Fight Club')
  })

  it('hydrates valid watchlist data from localStorage', () => {
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        entries: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            mediaType: 'tv',
            mediaId: 1399,
            status: 'watching',
            snapshot: {
              title: 'Game of Thrones',
              posterPath: null,
              rating: 8.5,
            },
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      }),
    )

    const store = new WatchlistStore()
    expect(store.totalCount).toBe(1)
    expect(store.isInWatchlist('tv', 1399)).toBe(true)
    expect(store.statusCounts.watching).toBe(1)
  })
})