import type { CardModel } from '@/api/cards/cards.types'
import {
  CardExtraData,
  CopyCard,
  DeleteCard,
  DislikeCard,
  EditCard,
  ExpandCard,
  FavorCard,
  FocusCard,
  LikeCard,
  PlayCard,
  ShowCard,
} from '@/components/cards/cardActionBar'

import { ShareButton } from '@/components/buttons/shareButton'
import { Wrapper } from '@/components/containers/wrapper'
import { UnauthorizedDialog } from '@/components/dialogs/unauthorizedDialog'
import { useMe } from '@/hooks/useAuth'
import { cardsSettingsStore } from '@/stores/cardsSettingsStore'
import { useTheme } from 'next-themes'
import { useState } from 'react'

type Props = {
  card: CardModel
  isOpen?: boolean
  setCardToSpeech?: (card: CardModel) => void
  isCardPlaying?: boolean
  pagePosition?: number
  showContent: boolean
  setShowContent: (isShown: boolean) => void
}

export const CardActionBar = ({
  card,
  isOpen,
  setCardToSpeech,
  isCardPlaying,
  pagePosition,
  showContent,
  setShowContent,
}: Props) => {
  const { data: meData, isSuccess: isMeSuccess } = useMe()
  const { theme } = useTheme()
  // ToDo: const { pathname } = usePaths()
  const { isCardAlwaysExpanded } = cardsSettingsStore()
  const [showExtraData, setShowExtraData] = useState(isCardAlwaysExpanded)
  const [isUnauthorizedOpen, setIsUnauthorizedOpen] = useState(false)

  const {
    id: cardId,
    title,
    content,
    isDisliked,
    dislikes,
    favorites,
    isFavorite,
    isLiked,
    likes,
    authorId,
    ...restCard
  } = card

  const userId = meData?.id
  const isCardAuthor = authorId === userId

  const openUnauthorized = () => setIsUnauthorizedOpen(true)
  const closeUnauthorized = () => setIsUnauthorizedOpen(false)

  return (
    <>
      <Wrapper as='div' hasGaps className='justify-between'>
        <Wrapper hasGaps>
          <ExpandCard
            isExpanded={showExtraData}
            setIsExpanded={setShowExtraData}
          />
          <LikeCard
            userId={userId}
            isUserLoggedIn={isMeSuccess}
            cardId={cardId}
            likes={likes}
            isLiked={isLiked}
            openUnauthorized={openUnauthorized}
            theme={theme}
          />
          <DislikeCard
            userId={userId}
            isUserLoggedIn={isMeSuccess}
            openUnauthorized={openUnauthorized}
            cardId={cardId}
            dislikes={dislikes}
            isDisliked={isDisliked}
            theme={theme}
          />
          <FavorCard
            userId={userId}
            isUserLoggedIn={isMeSuccess}
            openUnauthorized={openUnauthorized}
            cardId={cardId}
            favorites={favorites}
            isFavorite={isFavorite}
            theme={theme}
          />
          <CopyCard theme={theme} content={content} title={title} />
          <ShareButton theme={theme} source='card' />
          <PlayCard
            isCardPlaying={isCardPlaying}
            card={card}
            setCardToSpeech={setCardToSpeech}
          />
          <ShowCard showContent={showContent} setShowContent={setShowContent} />
          {isMeSuccess && isCardAuthor && (
            <>
              <EditCard cardId={cardId} />
              <DeleteCard cardId={cardId} userId={userId} theme={theme} />
            </>
          )}
        </Wrapper>
        <FocusCard cardId={cardId} isOpen={isOpen} />
      </Wrapper>
      <CardExtraData
        showExtraData={showExtraData}
        pagePosition={pagePosition}
        authorId={authorId}
        cardId={cardId}
        {...restCard}
      />
      <UnauthorizedDialog
        open={isUnauthorizedOpen}
        close={closeUnauthorized}
        // ToDo: returnPath={pathname}
      />
    </>
  )
}
