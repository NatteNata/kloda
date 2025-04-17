import { refresh } from '@/api/auth/auth.api'
import type {
  CardArgs,
  CardModel,
  CardResponse,
  CardsArgs,
  CardsResponse,
  CreateCardArgs,
  DeleteCardsResponse,
  DislikeResponse,
  EditCardArgs,
  FavoriteResponse,
  ImportCardsArgs,
  ImportCardsResponse,
  LikeResponse,
  RandomCardArgs,
} from '@/api/cards/cards.types'
import { setHeadersAuth } from '@/utils/setHeadersAuth'
import ky from 'ky'
import queryString from 'query-string'

const cardsApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/cards`,
  hooks: {
    beforeRequest: [({ headers }) => setHeadersAuth(headers)],
    beforeRetry: [() => refresh()],
  },
  retry: {
    statusCodes: [401, 403],
    methods: ['get', 'post', 'put', 'patch', 'delete'],
  },
})

export const getCards = (searchParams: CardsArgs) =>
  cardsApi<CardsResponse>('', {
    searchParams: queryString.stringify(searchParams),
  }).json()

export const getCard = ({ id, ...restCategories }: CardArgs) =>
  cardsApi<CardResponse>(id, {
    searchParams: queryString.stringify(restCategories),
  }).json()

export const getRandomCard = (searchParams: RandomCardArgs) =>
  cardsApi<CardModel>('random', {
    searchParams: queryString.stringify(searchParams),
  }).json()

export const createCard = (json: CreateCardArgs) =>
  cardsApi.post<CardModel>('', { json }).json()

export const editCard = ({ id, ...json }: EditCardArgs) =>
  cardsApi.patch<CardModel>(id, { json }).json()

export const deleteCards = () => cardsApi.delete<DeleteCardsResponse>('').json()

export const deleteCard = (cardId: string) => cardsApi.delete(cardId).json()

export const likeCard = (cardId: string) =>
  cardsApi.patch<LikeResponse>(`${cardId}/like`).json()

export const dislikeCard = (cardId: string) =>
  cardsApi.patch<DislikeResponse>(`${cardId}/dislike`).json()

export const favoriteCard = (cardId: string) =>
  cardsApi.patch<FavoriteResponse>(`${cardId}/favorite`).json()

export const importCards = (json: ImportCardsArgs) =>
  cardsApi.post<ImportCardsResponse>('import', { json }).json()

export const exportCards = () => cardsApi('export').blob()
