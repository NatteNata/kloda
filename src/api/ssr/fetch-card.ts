import type { CardResponse } from '@/api/cards/cards.types'

export async function fetchCard(cardId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}v1/cards/${cardId}`,
  )

  const data: CardResponse = await response.json()

  return data
}
