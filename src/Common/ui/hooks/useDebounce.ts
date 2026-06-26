import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delayMs = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delayMs)
    return () => window.clearTimeout(timer)
  }, [value, delayMs])

  return debouncedValue
}