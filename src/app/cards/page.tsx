import type { CardsResponse } from '@/api/cards/cards.types'
import { Cards } from '@/components/cards/cards'
import { Container } from '@/components/containers/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards',
}

type Props = {
  searchParams?: URLSearchParams
}

export default async function CardsPage({ searchParams }: Props) {
  const query = searchParams ? new URLSearchParams(searchParams).toString() : ''
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}v1/cards?${query}`,
    {},
  )
  const cards: CardsResponse = await data.json()

  return (
    <Container>
      <Cards initialData={cards} />
    </Container>
  )
}