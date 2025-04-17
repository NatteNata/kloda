import { getUser, getUsers } from '@/api/users/users.api'
import type { UsersArgs, UsersResponse } from '@/api/users/users.types'
import { useQuery } from '@tanstack/react-query'

export const useGetUsers = (args: UsersArgs, initialData: UsersResponse) =>
  useQuery({
    queryKey: ['users', ...Object.values(args)],
    queryFn: () => getUsers(args),
    placeholderData: initialData,
    staleTime: 60 * 1000,
  })

export const useGetUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })
