import { fetchUsers } from '@/api/ssr/users'
import { Container } from '@/components/containers/container'
import { Users } from '@/components/users/users'
import type { URLUsersSearchParams } from '@/types/searchParams'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

type Props = {
  searchParams?: URLUsersSearchParams
}

export default async function UsersPage({ searchParams }: Props) {
  const serverData = await fetchUsers(searchParams)

  return (
    <Container>
      <Users initialData={serverData} />
    </Container>
  )
}
