'use client'

import { Button } from '@/components/buttons/button'
import type { ColumnsCount } from '@/components/containers/columns'
import {
  ColumnsRadio,
  ItemsPerPage,
  type Key,
  Pagination,
  SelectorsGroup,
} from '@/components/pageControls'
import { usePaths } from '@/hooks/usePaths'
import type {
  URLCardsSearchParams,
  URLUsersSearchParams,
} from '@/types/searchParams'
import {
  normalizeCardsSearchParams,
  normalizeUsersSearchParams,
} from '@/utils/normalizeSearchParams'
import { setFirstPage } from '@/utils/setFirstPage'
import { useTransitionRouter } from 'next-view-transitions'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Props = {
  totalPages: number
  totalUsers?: number
  totalCards?: number
  currentItems: number
  columnsCount: ColumnsCount
  setColumnsCount(columns: ColumnsCount): void
}

export const PageControls = ({
  totalPages,
  totalUsers,
  totalCards,
  currentItems,
  columnsCount,
  setColumnsCount,
}: Props) => {
  const searchParams = Object.fromEntries(useSearchParams().entries())
  const { replace } = useTransitionRouter()
  const { pathname, isUsersPath, isCardsPath } = usePaths()
  const currentSearchParams = isCardsPath
    ? normalizeCardsSearchParams(searchParams as URLCardsSearchParams)
    : normalizeUsersSearchParams(searchParams as URLUsersSearchParams)
  const { page, search, ...restParams } = currentSearchParams
  const hasSearchParams = searchParams.toString() !== ''
  const itemsName = isUsersPath ? 'Users' : isCardsPath ? 'Cards' : 'Items'
  const onReset = () => replace(pathname)

  const onChangeParams = useCallback(
    (key: Key, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (key === 'limit') setFirstPage(params)

      params.set(key, value)
      replace(`?${params}`)
    },
    [searchParams, replace],
  )

  return (
    <div className='flex flex-col items-center justify-around gap-x-3'>
      <div className='flex items-center justify-start gap-x-3'>
        <Pagination
          page={Number(page)}
          totalPages={totalPages}
          onChangeParams={onChangeParams}
        />
        <ItemsPerPage
          itemsName={itemsName}
          totalItems={isUsersPath ? totalUsers : totalCards}
          currentItems={currentItems}
        />
      </div>
      <div className='flex flex-wrap items-center justify-start gap-x-3 py-3'>
        <SelectorsGroup
          itemsName={isUsersPath ? 'Users' : 'Cards'}
          {...restParams}
          onChangeParams={onChangeParams}
          currentItems={currentItems}
        />
        <ColumnsRadio
          columnsCount={columnsCount}
          setColumnsCount={setColumnsCount}
        />
        {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
      </div>
    </div>
  )
}
