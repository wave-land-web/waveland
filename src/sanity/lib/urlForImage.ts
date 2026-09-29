import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityAsset } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

export const imageBuilder = createImageUrlBuilder(sanityClient)

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source)
}

/**
 * The srcset every Sanity image uses: standard widths up to the original, plus the original itself,
 * so small images still get a srcset. Asset refs carry the original size: image-<id>-<width>x<height>-<format>
 */
export function sanityImageSizes(source: SanityAsset) {
  const [, width = 1600, height = 900] = source?.asset?._ref?.match(/-(\d+)x(\d+)-/)?.map(Number) ?? []
  const widths = [...new Set([480, 800, 1200, 1600, 2400].filter((w) => w < width).concat(Math.min(width, 2400)))]
  const srcFor = (w: number) => urlForImage(source).width(w).quality(75).auto('format').url()
  return { width, height, srcFor, srcset: widths.map((w) => `${srcFor(w)} ${w}w`).join(', ') }
}
