import { makeAutoObservable, reaction } from 'mobx'
import {
  DEFAULT_WATCHLIST_STATUS,
  WATCHLIST_STORAGE_KEY,
  WATCHLIST_STORAGE_VERSION,
} from '../../../core/constants/Watchlist.constants'
import {
  addWatchlistInputSchema,
  updateWatchlistNoteInputSchema,
  updateWatchlistStatusInputSchema,
  watchlistStorageSchema,
} from '../../../core/types/index.zod'
import type {
  AddWatchlistInput,
  WatchlistEntry,
  WatchlistMediaType,
  WatchlistStatus,
  WatchlistStatusCounts,
  WatchlistStorage,
} from '../../../core/types/Watchlist.types'
import { buildWatchlistMediaKey } from '../../../core/utils/WatchlistMediaKey.utils'

const createEntryId = (): string => crypto.randomUUID()

const readStoredWatchlist = (): WatchlistEntry[] => {
  const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    const result = watchlistStorageSchema.safeParse(parsed)
    return result.success ? result.data.entries : []
  } catch {
    return []
  }
}

const buildStoragePayload = (entries: WatchlistEntry[]): WatchlistStorage => ({
  version: WATCHLIST_STORAGE_VERSION,
  entries,
})

const persistWatchlist = (entries: WatchlistEntry[]): void => {
  const payload = buildStoragePayload(entries)
  const result = watchlistStorageSchema.safeParse(payload)
  if (!result.success) return

  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(result.data))
}

export class WatchlistStore {
  entries: WatchlistEntry[] = []

  constructor() {
    makeAutoObservable(this)
    this.initialize()
    this.setupPersistence()
  }

  get totalCount(): number {
    return this.entries.length
  }

  get statusCounts(): WatchlistStatusCounts {
    return {
      all: this.entries.length,
      want_to_watch: this.entries.filter(
        (entry) => entry.status === 'want_to_watch',
      ).length,
      watching: this.entries.filter((entry) => entry.status === 'watching')
        .length,
      completed: this.entries.filter((entry) => entry.status === 'completed')
        .length,
    }
  }

  initialize(): void {
    this.entries = readStoredWatchlist()
  }

  isInWatchlist(mediaType: WatchlistMediaType, mediaId: number): boolean {
    const mediaKey = buildWatchlistMediaKey(mediaType, mediaId)
    return this.entries.some(
      (entry) =>
        buildWatchlistMediaKey(entry.mediaType, entry.mediaId) === mediaKey,
    )
  }

  getEntry(
    mediaType: WatchlistMediaType,
    mediaId: number,
  ): WatchlistEntry | undefined {
    const mediaKey = buildWatchlistMediaKey(mediaType, mediaId)
    return this.entries.find(
      (entry) =>
        buildWatchlistMediaKey(entry.mediaType, entry.mediaId) === mediaKey,
    )
  }

  add(input: AddWatchlistInput): void {
    const parsed = addWatchlistInputSchema.safeParse(input)
    if (!parsed.success) return

    if (this.isInWatchlist(parsed.data.mediaType, parsed.data.mediaId)) return

    const timestamp = new Date().toISOString()

    const entry: WatchlistEntry = {
      id: createEntryId(),
      mediaType: parsed.data.mediaType,
      mediaId: parsed.data.mediaId,
      status: parsed.data.status ?? DEFAULT_WATCHLIST_STATUS,
      note: parsed.data.note,
      snapshot: parsed.data.snapshot,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    const nextEntries = [entry, ...this.entries]
    if (
      !watchlistStorageSchema.safeParse(buildStoragePayload(nextEntries)).success
    ) {
      return
    }

    this.entries = nextEntries
  }

  remove(mediaType: WatchlistMediaType, mediaId: number): void {
    const mediaKey = buildWatchlistMediaKey(mediaType, mediaId)
    this.entries = this.entries.filter(
      (entry) =>
        buildWatchlistMediaKey(entry.mediaType, entry.mediaId) !== mediaKey,
    )
  }

  toggle(input: AddWatchlistInput): void {
    if (this.isInWatchlist(input.mediaType, input.mediaId)) {
      this.remove(input.mediaType, input.mediaId)
      return
    }

    this.add({ ...input, status: DEFAULT_WATCHLIST_STATUS })
  }

  updateStatus(entryId: string, status: WatchlistStatus): void {
    const parsed = updateWatchlistStatusInputSchema.safeParse({
      entryId,
      status,
    })
    if (!parsed.success) return

    this.entries = this.entries.map((entry) =>
      entry.id === parsed.data.entryId
        ? {
            ...entry,
            status: parsed.data.status,
            updatedAt: new Date().toISOString(),
          }
        : entry,
    )
  }

  updateNote(entryId: string, note: string): void {
    const parsed = updateWatchlistNoteInputSchema.safeParse({ entryId, note })
    if (!parsed.success) return

    this.entries = this.entries.map((entry) =>
      entry.id === parsed.data.entryId
        ? {
            ...entry,
            note: parsed.data.note,
            updatedAt: new Date().toISOString(),
          }
        : entry,
    )
  }

  private setupPersistence(): void {
    reaction(
      () => this.entries.slice(),
      (entries) => {
        persistWatchlist(entries)
      },
    )
  }
}