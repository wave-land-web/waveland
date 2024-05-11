/**
 * Add an ellipsis to a given `text` parameter if the text is longer than a given `maxLength` parameter.
 * @param text - string of text to transform
 * @param maxLength - max length of text before ellipsis is added
 * @returns
 */
function createEllipsisText(text: string, maxLength: number) {
  const subText = text.substring(0, maxLength)
  const lastChar = subText[maxLength - 1]
  return lastChar !== ' ' ? `${subText}...` : `${subText.substring(0, maxLength - 1)}...`
}

export { createEllipsisText }
