'use client'

import type { CardModel, CardsResponse } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { type CardsSearchParams, PageControls } from '@/components/pageControls'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCards } from '@/hooks/useCards'
import { normalizeCardsSearchParams } from '@/utils/normalizeSearchParams'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  initialData: CardsResponse
}

// ToDo: Refactor all search params to lower case
export const Cards = ({ initialData }: Props) => {
  const searchParams = Object.fromEntries(useSearchParams().entries())

  const params = normalizeCardsSearchParams(searchParams as CardsSearchParams)

  /*  const categoriesToArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
    : []

  const normalizedCategories = categoriesToArray.map(category =>
    category.toLowerCase(),
  )*/

  const { isPending, isError, data, error } = useGetCards(params, initialData)

  const [cardToSpeech, setCardToSpeech] = useState<CardModel>()
  const [isCardPlaying, setIsCardPlaying] = useState(false)
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('2')

  if (isPending) {
    return <Loader>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { cards, ...restData } = data

  if (!cards.length) {
    return <ErrorMessage isCentered>Cards not found 🙈</ErrorMessage>
  }

  const pages = `${params.page ?? '1'}/${restData.totalPages}`
  const playlistName = params.search
    ? `Search: ${params.search} (page ${pages})`
    : `Page ${pages}`

  return (
    <>
      <PageControls
        {...restData}
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