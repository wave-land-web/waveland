type TextNode = { text?: string; children?: TextNode[]; [key: string]: unknown }

/**
 * Joins every span of a Portable Text block, so headings keep text inside links and marks.
 *
 * @param block - Portable Text block
 * @returns The block's plain text
 */
function blockText(block: TextNode): string {
  // Rendered nodes nest marked text (bold, links) one level down; raw blocks don't
  return (block.children ?? []).map((child) => child.text ?? blockText(child)).join('')
}

/**
 * Creates the anchor id for a heading, shared by the heading and the table of contents.
 *
 * @param text - Heading text
 * @returns The id, e.g. 'The Build' -> 'the-build'
 */
function headingId(text: string) {
  return text.trim().replace(/\s+/g, '-').toLowerCase()
}

/**
 * The platforms a case study files under for the filters: "Astro + Sanity" counts as both Astro and Sanity.
 *
 * @param platform - The case study's platform field
 * @returns Each platform in it, e.g. ['Astro', 'Sanity'], or [] when there's none
 */
function platformTags(platform?: string) {
  return platform ? platform.split(' + ') : []
}

export { blockText, headingId, platformTags }
