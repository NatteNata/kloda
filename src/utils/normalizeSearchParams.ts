import type { CardsArgs } from '@/api/cards/cards.types'
import type { UsersArgs } from '@/api/users/users.types'
import type {
  URLCardsSearchParams,
  URLUsersSearchParams,
} from '@/types/searchParams'

export const CARDS_DEFAULT_PARAMS: CardsArgs = {
  search: '',
  page: 1,
  limit: 10,
  order: 'desc',
  sort: 'createdAt',
  categories: [],
  userId: undefined,
  action: '',
} as const

export function normalizeCardsSearchParams(
  params?: URLCardsSearchParams,
): CardsArgs {
  const { action, categories, limit, order, page, search, sort, userId } =
    params || {}

  const categoriesToArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
    : []

  const categoriesToLowerCase = categoriesToArray.map(category =>
    category.toLowerCase(),
  )

  return {
    search: search ? search.toLowerCase() : CARDS_DEFAULT_PARAMS.search,
    page: page ? Number(page) : CARDS_DEFAULT_PARAMS.page,
    limit: limit ? Number(limit) : CARDS_DEFAULT_PARAMS.limit,
    order: order ?? CARDS_DEFAULT_PARAMS.order,
    sort: sort ?? CARDS_DEFAULT_PARAMS.sort,
    categories: categoriesToLowerCase ?? CARDS_DEFAULT_PARAMS.categories,
    userId: userId ? Number(userId) : CARDS_DEFAULT_PARAMS.userId,
    // action: action ? action.toLowerCase() : CARDS_DEFAULT_PARAMS.action,
  }
}

export const USERS_DEFAULT_PARAMS: UsersArgs = {
  limit: 10,
  order: 'desc',
  page: 1,
  search: '',
  sort: 'registeredAt',
} as const

export function normalizeUsersSearchParams(
  params?: URLUsersSearchParams,
): UsersArgs {
  const { limit, order, page, search, sort } = params || {}

  return {
    search: search ? search.toLowerCase() : USERS_DEFAULT_PARAMS.search,
    page: page ? Number(page) : USERS_DEFAULT_PARAMS.page,
    limit: limit ? Number(limit) : USERS_DEFAULT_PARAMS.limit,
    order: order ?? USERS_DEFAULT_PARAMS.order,
    sort: sort ?? USERS_DEFAULT_PARAMS.sort,
  }
}