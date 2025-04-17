'use client'

import type { UsersArgs, UsersResponse } from '@/api/users/users.types'
import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { PageControls } from '@/components/pageControls'
import { User } from '@/components/users/user'
import { useGetUsers } from '@/hooks/useUsers'
import type { URLUsersSearchParams } from '@/types/searchParams'
import { normalizeUsersSearchParams } from '@/utils/normalizeSearchParams'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  initialData: UsersResponse
}

// ToDo: Refactor columns style, error message size, break-inside-avoid if not open

export const Users = ({ initialData }: Props) => {
  const searchParams = Object.fromEntries(useSearchParams().entries())

  const usersSearchParams: UsersArgs = normalizeUsersSearchParams(
    searchParams as URLUsersSearchParams,
  )
  const { data, isPending, isError, error } = useGetUsers(
    usersSearchParams,
    initialData,
  )
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('2') // ToDo: Users pagination

  if (isPending) {
    return <Loader>Fetching users</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { users, ...totals } = data

  if (!users.length) {
    return <ErrorMessage>Users not found 🙈</ErrorMessage>
  }

  return (
    <>
      <PageControls
        {...totals}
        currentItems={users.length}
        columnsCount={columnsCount}
        setColumnsCount={setColumnsCount}
      />
      <Columns count={columnsCount}>
        {users.map(user => (
          <User key={user.id} user={user} inColumns />
        ))}
      </Columns>
    </>
  )
}
