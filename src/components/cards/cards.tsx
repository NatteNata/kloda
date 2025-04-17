'use client'

import type {
  CardModel,
  CardsArgs,
  CardsResponse,
} from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { PageControls } from '@/components/pageControls'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCards } from '@/hooks/useCards'
import type { URLCardsSearchParams } from '@/types/searchParams'
import { normalizeCardsSearchParams } from '@/utils/normalizeSearchParams'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  initialData: CardsResponse
}

export const Cards = ({ initialData }: Props) => {
  const searchParams = Object.fromEntries(useSearchParams().entries())

  const cardsSearchParams: CardsArgs = normalizeCardsSearchParams(
    searchParams as URLCardsSearchParams,
  )

  const { data, isPending, isError, error } = useGetCards(
    cardsSearchParams,
    initialData,
  )

  const [cardToSpeech, setCardToSpeech] = useState<CardModel>()
  const [isCardPlaying, setIsCardPlaying] = useState(false)
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('2')

  if (isPending) {
    return <Loader>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { cards, ...totals } = data

  if (!cards.length) {
    return <ErrorMessage isCentered>Cards not found 🙈</ErrorMessage>
  }

  const pages = `${cardsSearchParams.page ?? '1'}/${totals.totalPages}`
  const playlistName = cardsSearchParams.search
    ? `Search: ${cardsSearchParams.search} (page ${pages})`
    : `Page ${pages}`

  return (
    <>
      <PageControls
        {...totals}
        currentItems={cards.length}
        columnsCount={columnsCount}
        setColumnsCount={setColumnsCount}
      />
      <Columns count={columnsCount}>
        {cards.map((card, index) => {
          return (
            <Card
              key={card.id}
              card={card}
              cardToSpeechId={cardToSpeech?.id}
              setCardToSpeech={setCardToSpeech}
              isCardPlaying={isCardPlaying}
              pagePosition={index + 1}
            />
          )
        })}
      </Columns>
      <TextToSpeech
        playlistName={playlistName}
        cards={cards}
        cardToSpeech={cardToSpeech}
        setCardToSpeech={setCardToSpeech}
        setIsCardPlaying={setIsCardPlaying}
      />
    </>
  )
}
