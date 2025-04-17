'use client'

import { useWidth } from '@/hooks/useWidth'
import { Pagination as NextUiPagination } from '@nextui-org/pagination'
import { useCallback, useEffect } from 'react'

export type Key = 'page' | 'limit' | 'order' | 'sort'

type Props = {
  page: number
  totalPages: number
  onChangeParams(key: Key, value: string): void
}

export const Pagination = ({ page, totalPages, onChangeParams }: Props) => {
  const { isDesktopWidth } = useWidth()

  const onChangePage = useCallback(
    (pageNumber: number, event?: KeyboardEvent) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        event?.preventDefault()
        onChangeParams('page', String(pageNumber))
      }
    },
    [totalPages, onChangeParams],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Home':
            onChangePage(1, event)
            break
          case 'ArrowLeft':
            onChangePage(page - 1, event)
            break
          case 'ArrowRight':
            onChangePage(page + 1, event)
            break
          case 'End':
            onChangePage(totalPages, event)
            break
          default: {
            const keyNumber = Number(event.key)

            if (!Number.isNaN(keyNumber)) onChangePage(keyNumber, event)
          }
        }
      }
    }

    addEventListener('keydown', onKeyDown)
    return () => removeEventListener('keydown', onKeyDown)
  }, [page, totalPages, onChangePage])

  return (
    <div className='mx-auto flex w-fit flex-wrap gap-4'>
      <NextUiPagination
        page={page}
        total={totalPages}
        onChange={onChangePage}
        isDisabled={totalPages < 2}
        classNames={{
          wrapper: 'flex-wrap',
          cursor: 'bg-accent dark:bg-accent-dark text-white',
        }}
        showControls={isDesktopWidth}
        loop
        isCompact
        showShadow
      />
    </div>
  )
}
