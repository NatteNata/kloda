import { Button } from '@/components/buttons/button'
import { usePaths } from '@/hooks/usePaths'
import { useTransitionRouter } from 'next-view-transitions'

type Props = {
  cardId: number
  isOpen?: boolean
}

export const FocusCard = ({ cardId, isOpen }: Props) => {
  const router = useTransitionRouter()
  const { cardsPath } = usePaths()

  const cardDetailsText = isOpen ? 'Close focus view' : 'Open focus view'

  const handleFocus = () => {
    !isOpen ? router.push(`/card/${cardId}`) : router.push(cardsPath)
  }

  return (
    <Button variant='primary' onClick={handleFocus}>
      {cardDetailsText}
    </Button>
  )
}
