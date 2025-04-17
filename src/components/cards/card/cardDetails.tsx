'use client'

import type { CardModel, CardResponse } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card/card'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCard } from '@/hooks/useCards'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  cardId: string
  initialData: CardResponse
}

export const CardDetails = ({ cardId, initialData }: Props) => {
  const categories = useSearchParams().getAll('categories')
  const { isPending, isError, error, data } = useGetCard(
    {
      id: cardId,
      categories,
    },
    initialData,
  )
  const [cardToSpeech, setCardToSpeech] = useState<CardModel>()

  if (isPending) {
    return <Loader>Fetching card #{cardId}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { card } = data

  // ToDo: Refactor wrapper, optional card & cards to speech
  return (
    <div className='flex flex-col items-center'>
      <Card
        card={card}
        isOpen
        setCardToSpeech={setCardToSpeech}
        className='max-w-2xl'
      />
      <aside className='sticky bottom-6 mt-6'>
        <TextToSpeech
          cards={[card]}
          setCardToSpeech={setCardToSpeech}
          cardToSpeech={cardToSpeech}
        />
      </aside>
    </div>
  )
}
