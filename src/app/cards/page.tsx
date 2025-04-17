import { fetchCards } from '@/api/ssr/cards'
import { Cards } from '@/components/cards/cards'
import { Container } from '@/components/containers/container'
import type { URLCardsSearchParams } from '@/types/searchParams'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards',
}

type Props = {
  searchParams?: URLCardsSearchParams
}

export default async function CardsPage({ searchParams }: Props) {
  const serverData = await fetchCards(searchParams)

  return (
    <Container>
      <Cards initialData={serverData} />
    </Container>
  )
}
