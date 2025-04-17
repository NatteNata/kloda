'use client'

import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { LoginForm } from '@/components/forms/loginForm'
import { GoBack } from '@/components/goBack'
import { RegisterLink } from '@/components/links/registerLink'

type Props = {
  title?: string
}

export const LoginBlock = ({ title }: Props) => {
  return (
    <Container isCentered>
      <Block
        heading={title}
        isHeadingCentered
        isConstrained
        className='max-w-md'
      >
        <LoginForm />
        <RegisterLink />
        <GoBack />
      </Block>
    </Container>
  )
}
