interface Props {
  text: string
  url: string
  /** Header-font sizes: `lead` (h4) or `display` (h3). Default matches body copy. */
  size?: 'body' | 'lead' | 'display'
  newWindow?: boolean
  /** Brand color. Use purple, orange and green in that order when three links sit in a row. */
  color?: 'purple' | 'orange' | 'green'
  linkClass?: string
}

const colorClasses = { purple: 'text-purple', orange: 'text-orange', green: 'text-green' }
const sizeClasses = { body: '', lead: 'font-header text-h4', display: 'font-header text-h3' }

// Keep hyphenated words like "15-minute" on one line so they never split at the hyphen
function keepHyphenatedWordsTogether(text: string) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    part.includes('-') && !/\s/.test(part) ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

/** An action link: goes to another page. Brand color at rest, underlined on hover. */
export default function Link({ text, url, size = 'body', newWindow, color = 'purple', linkClass = '' }: Props) {
  return (
    <a
      href={url}
      {...(newWindow && { target: '_blank', rel: 'noopener noreferrer' })}
      className={[sizeClasses[size], linkClass, 'inline-block w-fit link-underline', colorClasses[color]].filter(Boolean).join(' ')}
    >
      {keepHyphenatedWordsTogether(text)}
    </a>
  )
}
