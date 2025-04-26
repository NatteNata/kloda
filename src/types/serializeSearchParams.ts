import type { URLCardsSearchParams } from '@/types/searchParams'

export const serializeSearchParams = (searchParams?: URLCardsSearchParams) => {
  const query = new URLSearchParams()

  if (!searchParams) return query

  for (const [key, value] of Object.entries(searchParams)) {
    if (value == null) continue

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null) {
          query.append(key, String(item))
        }
      }
    } else {
      query.append(key, String(value))
    }
  }

  return query
}
