import { useMemo, useState } from 'react'

import { useDebouncedValue } from './use-debounced-value'

type UseSearchFilterParams<TItem> = {
  items: TItem[]
  getSearchText: (item: TItem) => string
}

export function useSearchFilter<TItem>({
  items,
  getSearchText,
}: UseSearchFilterParams<TItem>) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 300)

  const filteredItems = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()

    if (!term) {
      return items
    }

    return items.filter((item) =>
      getSearchText(item).toLowerCase().includes(term),
    )
  }, [items, debouncedSearch, getSearchText])

  return { search, setSearch, filteredItems }
}
