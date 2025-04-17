'use client'

import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { cn } from '@/utils/mergeClasses'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const GoBack = () => {
  const router = useRouter()

  return (
    <Wrapper className='gap-1 self-center'>
      <ArrowLeft size={16} />
      <Button
        variant='text'
        onClick={() => router.back()}
        className={cn(
          'text-primary dark:text-primary-dark ',
          'hover:enabled:text-accent dark:enabled:hover:text-accent-dark',
          'underline decoration-accent underline-offset-4 dark:decoration-accent-dark',
        )}
      >
        Go back
      </Button>
    </Wrapper>
  )
}
