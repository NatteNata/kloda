'use client'

import { Button } from '@/components/buttons/button'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { LinkIcon, Share2 } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  theme?: string
  source: string
} & ComponentPropsWithoutRef<'button'>

export const ShareButton = ({ theme, source, ...restProps }: Props) => {
  const url =
    source === 'playlist'
      ? `${window.location.origin}/${window.location.search}`
      : `${window.location.origin}/card/$cardId`

  const shareTitle = `Share ${source} link`
  const copyTitle = `Copy ${source} link to clipboard`
  const notification = `${source.toUpperCase()} link copied to clipboard`

  const isShareable = !!navigator.share
  const title = isShareable ? shareTitle : copyTitle
  const icon = isShareable ? <Share2 /> : <LinkIcon />

  const share = async () => {
    const shareFallback = () => copyToClipboard(url, notification, theme)

    if (!isShareable) {
      return await shareFallback()
    }

    try {
      await navigator.share({
        url,
        title: url,
      })
    } catch (error) {
      console.error(error)

      await shareFallback()
    }
  }

  return (
    <Button variant='text' onClick={share} title={title} {...restProps}>
      {icon}
    </Button>
  )
}
