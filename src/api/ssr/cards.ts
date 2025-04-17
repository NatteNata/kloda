import type { CardsResponse } from '@/api/cards/cards.types'
import type { URLCardsSearchParams } from '@/types/searchParams'
import { serializeSearchParams } from '@/types/serializeSearchParams'

export async function fetchCards(searchParams?: URLCardsSearchParams) {
  const query = serializeSearchParams(searchParams)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}v1/cards?${query}`,
    {},
  )
  const data: CardsResponse = await response.json()

  return data
}
