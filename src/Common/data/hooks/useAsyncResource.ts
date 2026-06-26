import { useCallback, useEffect, useState } from 'react'
import type { AsyncStatus } from '../../core/types/Status.types'

interface AsyncResourceState<T> {
  data: T | null
  status: AsyncStatus
  error: string | null
}

export const useAsyncResource = <T>(
  fetcher: () => Promise<T>,
  deps: readonly unknown[],
): AsyncResourceState<T> & { refetch: () => void } => {
  const [state, setState] = useState<AsyncResourceState<T>>({
    data: null,
    status: 'idle',
    error: null,
  })

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }))

    try {
      const data = await fetcher()
      setState({ data, status: 'success', error: null })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong'
      setState({ data: null, status: 'error', error: message })
    }
  }, deps)

  useEffect(() => {
    void load()
  }, [load])

  return { ...state, refetch: load }
}