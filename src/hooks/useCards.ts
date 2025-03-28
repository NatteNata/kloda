import {
  createCard,
  deleteCard,
  deleteCards,
  dislikeCard,
  editCard,
  exportCards,
  favoriteCard,
  getCard,
  getCards,
  getRandomCard,
  importCards,
  likeCard,
} from '@/api/cards/cards.api'
import type {
  CardArgs,
  CardModel,
  CardsArgs,
  CardsResponse,
  DislikeResponse,
  FavoriteResponse,
  LikeResponse,
  RandomCardArgs,
} from '@/api/cards/cards.types'
import { getQueryClient } from '@/app/getQueryClient'
import { type QueryClient, useMutation, useQuery } from '@tanstack/react-query'

export const useGetCards = (args: CardsArgs, inititalData: CardsResponse) =>
  useQuery({
    queryKey: ['cards', ...Object.values(args)],
    queryFn: () => getCards(args),
  })

export const useGetCard = (args: CardArgs) =>
  useQuery({
    queryKey: ['card', ...Object.values(args)],
    queryFn: () => getCard(args),
  })

export const useGetRandomCard = (args: RandomCardArgs) =>
  useQuery({
    queryKey: ['randomCard', ...Object.values(args)],
    queryFn: () => getRandomCard(args),
    enabled: false,
  })

export const useCreateCard = (authorId: string) =>
  useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUser(queryClient, String(authorId))
      invalidateUsers(queryClient)
    },
  })

export const useEditCard = () =>
  useMutation({
    mutationFn: editCard,
    onSuccess: ({ id }) => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCard(queryClient, String(id))
      void invalidateCategories(queryClient)
    },
  })

export const useDeleteCards = (userId: number) =>
  useMutation({
    mutationFn: deleteCards,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient)
      invalidateUser(queryClient, String(userId))
    },
  })

export const useDeleteCard = (userId?: string) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: deleteCard,
    onMutate: async cardId => {
      await queryClient.cancelQueries({
        queryKey: ['card', cardId],
      })

      const prevCard = queryClient.getQueryData<CardModel>(['card', cardId])

      queryClient.setQueryData<CardModel, string[], CardModel>(
        ['card', cardId],
        _old => {
          return {} as CardModel
        },
      )

      return { prevCard }
    },
    onError: (deleteError, cardId, context) => {
      queryClient?.setQueryData(['card', cardId], context?.prevCard)

      throw deleteError
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['card', cardId], data)
    },
    onSettled: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

export const useLikeCard = (userId?: number) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: likeCard,
    onMutate: async cardId => {
      await queryClient.cancelQueries({
        queryKey: ['like', cardId],
      })

      const prevCard = queryClient.getQueryData<LikeResponse>(['like', cardId])

      queryClient.setQueryData<LikeResponse, string[], LikeResponse>(
        ['like', cardId],
        old => {
          return {
            isLiked: !old?.isLiked,
          }
        },
      )

      return { prevCard }
    },
    onError: (error, cardId, context) => {
      queryClient.setQueryData(['like', cardId], context?.prevCard)
      throw error
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['like', cardId], data)
    },
    onSettled: (_data, _error, cardId: string) => {
      void invalidateCard(queryClient, cardId)
      void invalidateCards(queryClient)
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

export const useDislikeCard = (userId?: number) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: dislikeCard,
    onMutate: async cardId => {
      await queryClient.cancelQueries({
        queryKey: ['dislike', cardId],
      })

      const prevCard = queryClient.getQueryData<DislikeResponse>([
        'dislike',
        cardId,
      ])

      queryClient.setQueryData<DislikeResponse, string[], DislikeResponse>(
        ['dislike', cardId],
        old => {
          return {
            isDisliked: !old?.isDisliked,
          }
        },
      )

      return { prevCard }
    },
    onError: (error, cardId, context) => {
      queryClient.setQueryData(['dislike', cardId], context?.prevCard)
      throw error
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['dislike', cardId], data)
    },
    onSettled: (_data, _error, cardId: string) => {
      void invalidateCard(queryClient, cardId)
      void invalidateCards(queryClient)
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

export const useFavoriteCard = (userId?: number) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: favoriteCard,
    onMutate: async cardId => {
      await queryClient.cancelQueries({
        queryKey: ['favorite', String(cardId)],
      })

      const prevCard = queryClient.getQueryData<FavoriteResponse>([
        'favorite',
        String(cardId),
      ])

      queryClient.setQueryData<FavoriteResponse, string[], FavoriteResponse>(
        ['favorite', String(cardId)],
        old => {
          return {
            isFavorite: !old?.isFavorite,
          }
        },
      )

      return { prevCard }
    },
    onError: (error, cardId, context) => {
      queryClient.setQueryData(['favorite', String(cardId)], context?.prevCard)
      throw error
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['favorite', String(cardId)], data)
    },
    onSettled: (_data, _error, cardId: string) => {
      void invalidateCard(queryClient, String(cardId))
      void invalidateCards(queryClient)
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

// ToDo: Refactor invalidating, duplicated with create card, also invalidate only one user
export const useImportCards = (userId: number) =>
  useMutation({
    mutationFn: importCards,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUser(queryClient, String(userId))
      invalidateUsers(queryClient)
    },
  })

export const useExportCards = () =>
  useQuery({
    queryKey: ['exportCards'],
    queryFn: exportCards,
    enabled: false,
  })

// noinspection Annotator
export const invalidateCards = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: ['cards'] })

// noinspection Annotator
const invalidateCard = (queryClient: QueryClient, cardId: string) =>
  queryClient.invalidateQueries({ queryKey: ['card', cardId] })

// noinspection Annotator
const invalidateCategories = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: ['categories'] })

const invalidateUser = (queryClient: QueryClient, userId: string) => {
  // noinspection Annotator
  void queryClient.invalidateQueries({ queryKey: ['user', userId] })
}

const invalidateUsers = (queryClient: QueryClient) => {
  // noinspection Annotator
  void queryClient.invalidateQueries({ queryKey: ['users'] })
}