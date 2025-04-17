import type { Key } from '@/components/pageControls'
import { CategoriesSelect } from '@/components/selects/categoriesSelect'
import { Select } from '@/components/selects/select'
import { SelectItem } from '@nextui-org/select'

const QUANTITIES = ['5', '10', '20', '50', '100'] as const

const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

const SORTS_USERS = {
  createdCardsCount: 'Created cards',
  dislikedCardsCount: 'Disliked cards',
  email: 'Email',
  favoriteCardsCount: 'Favorite cards',
  id: 'ID',
  lastLoginAt: 'Last login',
  likedCardsCount: 'Liked cards',
  registeredAt: 'Registered',
  username: 'Username',
} as const

const SORTS_CARDS = {
  authorId: 'Author',
  content: 'Content',
  createdAt: 'Created',
  dislikes: 'Dislikes',
  favorites: 'Favorites',
  id: 'ID',
  likes: 'Likes',
  title: 'Title',
  updatedAt: 'Updated',
} as const

type Props = {
  itemsName: string
  currentItems: number
  sort: string
  order: string
  limit: number
  onChangeParams: (key: Key, value: string) => void
}

export const SelectorsGroup = ({
  itemsName,
  currentItems,
  sort,
  order,
  limit,
  onChangeParams,
}: Props) => {
  const lowNumberItems = currentItems < 2

  return (
    <div className='m-3 flex flex-wrap gap-2'>
      {itemsName === 'Cards' && <CategoriesSelect />}
      <Select
        label={`${itemsName} per page`}
        selectedKeys={[String(limit)]}
        onChange={({ target: { value } }) => onChangeParams('limit', value)}
        isDisabled={lowNumberItems}
      >
        {QUANTITIES.map(quantity => (
          <SelectItem key={quantity} value={quantity} textValue={quantity}>
            {quantity}
          </SelectItem>
        ))}
      </Select>
      <Select
        label='Order by'
        selectedKeys={[order]}
        onChange={({ target: { value } }) => onChangeParams('order', value)}
        items={Object.entries(ORDERS)}
        isDisabled={lowNumberItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label='Sort by'
        selectedKeys={[sort]}
        onChange={({ target: { value } }) => onChangeParams('sort', value)}
        items={Object.entries(
          itemsName === 'Users' ? SORTS_USERS : SORTS_CARDS,
        )}
        isDisabled={lowNumberItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
    </div>
  )
}
