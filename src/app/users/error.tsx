'use client'

import { Button } from '@/components/buttons/button'
import { Container } from '@/components/containers/container'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error('Error digest:', error.digest)
  console.error('Error message:', error.message)
  return (
    <Container>
      <div className='text-danger text-xl'>Error fetching Users data</div>
      <div>{error.message}</div>
      <Button variant={'primary'} onClick={reset}>
        Try again
      </Button>
    </Container>
  )
}
