/**
 * Add an ellipsis to a given `text` parameter if the text is longer than a given `maxLength` parameter.
 *
 * @param text - string of text to transform
 * @param maxLength - max length of text before ellipsis is added
 * @returns
 */
function createEllipsisText(text: string, maxLength: number) {
  const subText = text.substring(0, maxLength)
  const lastChar = subText[maxLength - 1]
  return lastChar !== ' ' ? `${subText}...` : `${subText.substring(0, maxLength - 1)}...`
}

/**
 * Joins every span of a Portable Text block, so headings keep text inside links and marks.
 *
 * @param block - Portable Text block
 * @returns The block's plain text
 */
function blockText(block: { children?: { text?: string }[]; [key: string]: unknown }) {
  return (block.children ?? []).map((child) => child.text ?? '').join('')
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

export { blockText, createEllipsisText, headingId }
