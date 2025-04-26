import type { UsersResponse } from '@/api/users/users.types'
import type { URLUsersSearchParams } from '@/types/searchParams'

export async function fetchUsers(searchParams?: URLUsersSearchParams) {
  const query = searchParams ? new URLSearchParams(searchParams).toString() : ''

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}v1/users?${query}`,
  )

  const data: UsersResponse = await response.json()

  return data
}
