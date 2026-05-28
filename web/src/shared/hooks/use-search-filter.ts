import { useMemo, useState } from 'react'

import { normalizeTextSearch } from '@/shared/utils/normalize-search'

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
    const term = normalizeTextSearch(debouncedSearch)

    if (!term) {
      return items
    }

    return items.filter((item) =>
      normalizeTextSearch(getSearchText(item)).includes(term),
    )
  }, [items, debouncedSearch, getSearchText])

  return { search, setSearch, filteredItems }
}
