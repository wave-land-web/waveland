import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityAsset } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

export const imageBuilder = createImageUrlBuilder(sanityClient)

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source)
}

/**
 * An image's original size, read from its asset ref: image-<id>-<width>x<height>-<format>
 */
export function assetDimensions(ref?: string): [width?: number, height?: number] {
  const [, width, height] = ref?.match(/-(\d+)x(\d+)-/)?.map(Number) ?? []
  return [width, height]
}

/**
 * The srcset every Sanity image uses: standard widths up to the original, plus the original itself,
 * so small images still get a srcset. Pass smaller widths for images shown small (phone screenshots).
 */
export function sanityImageSizes(source: SanityAsset, sizes = [480, 800, 1200, 1600, 2400]) {
  const [width = 1600, height = 900] = assetDimensions(source?.asset?._ref)
  const widths = [...new Set(sizes.filter((w) => w < width).concat(Math.min(width, sizes.at(-1)!)))]
  const srcFor = (w: number) => urlForImage(source).width(w).quality(75).auto('format').url()
  return { width, height, srcFor, srcset: widths.map((w) => `${srcFor(w)} ${w}w`).join(', ') }
}
