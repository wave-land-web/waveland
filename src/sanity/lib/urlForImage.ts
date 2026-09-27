import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityAsset } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

export const imageBuilder = createImageUrlBuilder(sanityClient)

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source)
}
