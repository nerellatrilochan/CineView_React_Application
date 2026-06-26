import { useCallback, useEffect, useRef, useState } from 'react'
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

  const fetcherRef = useRef(fetcher)

  useEffect(() => {
    fetcherRef.current = fetcher
  }, [fetcher])

  const depsKey = JSON.stringify(deps)

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }))

    try {
      const data = await fetcherRef.current()
      setState({ data, status: 'success', error: null })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong'
      setState({ data: null, status: 'error', error: message })
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      await Promise.resolve()
      if (cancelled) return
      setState((prev) => ({ ...prev, status: 'loading', error: null }))

      try {
        const data = await fetcherRef.current()
        if (cancelled) return
        setState({ data, status: 'success', error: null })
      } catch (error) {
        if (cancelled) return
        const message =
          error instanceof Error ? error.message : 'Something went wrong'
        setState({ data: null, status: 'error', error: message })
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [depsKey])

  return { ...state, refetch }
}