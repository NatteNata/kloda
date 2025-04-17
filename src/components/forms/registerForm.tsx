'use client'

import { Button } from '@/components/buttons/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { useRegister } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const USERNAME_MIN = 3
const USERNAME_MAX = 32
const PASSWORD_MIN = 6
const PASSWORD_MAX = 64

// ToDo: Passwords regex
const registerSchema = z
  .object({
    username: z.string().min(USERNAME_MIN).max(USERNAME_MAX),
    email: z.string().email(),
    password: z.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
    confirmPassword: z.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    }
  })

type RegisterSchema = z.infer<typeof registerSchema>

const defaultValues: RegisterSchema = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

type Props = {
  onSuccess?: () => void
}

export const RegisterForm = ({ onSuccess }: Props) => {
  const router = useTransitionRouter()
  const { data, mutate, isPending, error, isSuccess } = useRegister()

  const registerText = isPending ? 'Registering' : 'Register'

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<RegisterSchema>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(data => mutate(data))

  const onReset = () => reset(defaultValues)

  if (isSuccess) {
    if (onSuccess) onSuccess()
    router.push(`/user/${data.userId}`)
  }

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name='username'
        label='Username'
        placeholder='Username'
        required
        error={errors.username?.message}
        characterCount={watch('username')?.length}
        minLength={USERNAME_MIN}
        maxLength={USERNAME_MAX}
        disabled={isPending}
      />
      <FormInput
        control={control}
        name='email'
        label='Email'
        type='email'
        placeholder='example@mail.com'
        required
        error={errors.email?.message}
        disabled={isPending}
      />
      <FormInput
        control={control}
        name='password'
        label='Password'
        type='password'
        autoComplete='on'
        placeholder='Password'
        required
        error={errors.password?.message}
        characterCount={watch('password')?.length}
        minLength={PASSWORD_MIN}
        maxLength={PASSWORD_MAX}
        disabled={isPending}
      />
      <FormInput
        control={control}
        type='password'
        autoComplete='on'
        name='confirmPassword'
        label='Confirm password'
        placeholder='Confirm password'
        required
        error={errors.confirmPassword?.message}
        characterCount={watch('confirmPassword')?.length}
        minLength={PASSWORD_MIN}
        maxLength={PASSWORD_MAX}
        disabled={isPending}
      />
      <ButtonsContainer>
        <Button isStretched isLoading={isPending} disabled={isPending}>
          {registerText}
        </Button>
        <Button
          type='reset'
          isStretched
          onClick={onReset}
          disabled={isPending || !isDirty}
          isDanger
        >
          Reset
        </Button>
      </ButtonsContainer>
    </Form>
  )
}
