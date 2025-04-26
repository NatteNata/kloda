'use client'

import { Button } from '@/components/buttons/button'
import { Container } from '@/components/containers/container'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error('Server error digest:', error.digest)
  console.error('Server error message:', error.message)

  return (
    <Container>
      <div className='text-danger text-xl'>Error fetching Card data</div>
      <div>{error.message}</div>
      <Button variant={'primary'} onClick={reset} className={'my-5'}>
        Try again
      </Button>
    </Container>
  )
}