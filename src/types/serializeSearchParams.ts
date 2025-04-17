import type { URLCardsSearchParams } from '@/types/searchParams'

export const serializeSearchParams = (searchParams?: URLCardsSearchParams) => {
  const query = new URLSearchParams()

  if (!searchParams) return query

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      value.forEach(v => v && query.append(key, String(v)))
    } else if (value !== undefined && value !== null) {
      query.append(key, String(value))
    }
  })

  return query
}
