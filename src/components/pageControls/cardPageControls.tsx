'use client'

import { CardControl } from '@/components/pageControls'
import { CategoriesSelect } from '@/components/selects/categoriesSelect'
import { usePaths } from '@/hooks/usePaths'

export const CardPageControls = () => {
  const { isCardPath } = usePaths()

  if (!isCardPath) {
    return null
  }

  return (
    <div className='m-5 flex justify-start gap-10'>
      <CardControl />
      <CategoriesSelect />
    </div>
  )
}
