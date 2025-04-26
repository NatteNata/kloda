import { fetchCard } from '@/api/ssr/fetch-card'
import { CardDetails } from '@/components/cards/card/cardDetails'
import { Container } from '@/components/containers/container'
import { CardPageControls } from '@/components/pageControls'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id: cardId },
}: ParamsIdProps): Metadata => ({
  title: `Card #${cardId}`,
})

type Props = {
  params: {
    id: string
  }
}
export default async function CardPage({ params: { id } }: Props) {
  const serverData = await fetchCard(id)

  return (
    <Container isCentered className='flex-col justify-start'>
      <CardPageControls />
      <CardDetails initialData={serverData} cardId={id} />
    </Container>
  )
}
