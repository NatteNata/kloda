'use client'

import type { CardModel } from '@/api/cards/cards.types'
import { Button } from '@/components/buttons/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Form } from '@/components/forms/form'
import { FormInput } from '@/components/forms/formInput'
import { FormTextArea } from '@/components/forms/formTextArea'
import { useEditCard } from '@/hooks/useCards'
import { handleCategories } from '@/utils/handleCategories'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransitionRouter } from 'next-view-transitions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const TITLE_MIN = 5
const TITLE_MAX = 100
const CONTENT_MIN = 10
const CONTENT_MAX = 2_000
const CATEGORIES_MAX = 100

const cardSchema = z.object({
  title: z.string().min(TITLE_MIN).max(TITLE_MAX),
  content: z.string().min(CONTENT_MIN).max(CONTENT_MAX),
  categories: z.string().max(CATEGORIES_MAX),
})

type CardSchema = z.infer<typeof cardSchema>

type Props = {
  card: CardModel
}

// ToDo: Duplicated logic, constants, schema and inputs (create card form)
export const EditCardForm = ({
  card: { id: cardId, title, content, categories },
}: Props) => {
  const router = useTransitionRouter()
  const { data, mutate, isPending, error, isSuccess } = useEditCard()

  const saveText = isPending ? 'Saving' : 'Save'

  const defaultValues: CardSchema = {
    title,
    content,
    categories: categories.join(', '),
  }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CardSchema>({ defaultValues, resolver: zodResolver(cardSchema) })

  const onSubmit = handleSubmit(({ categories, ...restData }) =>
    mutate({
      id: String(cardId),
      ...restData,
      categories: handleCategories(categories),
    }),
  )

  const onCancel = () => router.back()

  if (isSuccess) router.push(`/card/${data.id}`)

  return (
    <Form onSubmit={onSubmit} error={error?.message}>
      <FormInput
        control={control}
        name='title'
        label='Title'
        placeholder='Card title'
        error={errors.title?.message}
        characterCount={watch('title')?.length}
        minLength={TITLE_MIN}
        maxLength={TITLE_MAX}
        required
        spellCheck
        disabled={isPending}
      />
      <FormTextArea
        control={control}
        name='content'
        label='Content'
        placeholder='Card content'
        error={errors.content?.message}
        characterCount={watch('content')?.length}
        minLength={CONTENT_MIN}
        maxLength={CONTENT_MAX}
        required
        spellCheck
        disabled={isPending}
      />
      <FormInput
        control={control}
        name='categories'
        label='Categories'
        placeholder='Comma-separated categories'
        error={errors.categories?.message}
        characterCount={watch('categories')?.length}
        maxLength={CATEGORIES_MAX}
        disabled={isPending}
      />
      <ButtonsContainer>
        <Button isStretched isLoading={isPending} disabled={isPending}>
          {saveText}
        </Button>
        <Button
          type='button'
          isStretched
          isDanger
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
      </ButtonsContainer>
    </Form>
  )
}
