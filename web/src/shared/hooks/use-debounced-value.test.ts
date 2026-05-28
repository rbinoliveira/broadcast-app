import { act, renderHook } from '@testing-library/react'

import { useDebouncedValue } from './use-debounced-value'

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value right away', () => {
    const { result } = renderHook(() => useDebouncedValue('maria', 300))

    expect(result.current).toBe('maria')
  })

  it('only updates after the delay has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'm' } },
    )

    rerender({ value: 'maria' })
    expect(result.current).toBe('m')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('maria')
  })

  it('debounces rapid changes and keeps only the last value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'an' })
    act(() => vi.advanceTimersByTime(200))

    rerender({ value: 'ana' })
    act(() => vi.advanceTimersByTime(200))

    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(100))

    expect(result.current).toBe('ana')
  })
})
