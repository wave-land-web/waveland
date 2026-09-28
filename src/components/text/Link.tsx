import ArrowIcon from '../ui/ArrowIcon'

interface Props {
  text: string
  url: string
  arrowLeft?: boolean
  /** Header-font sizes for CTAs: `lead` (h4) or `display` (h3). Default matches body copy. */
  size?: 'body' | 'lead' | 'display'
  newWindow?: boolean
  /** Brand color. Use purple, orange and green in that order when three links sit in a row. */
  color?: 'purple' | 'orange' | 'green'
  /** Hide the arrow, e.g. for a row of short links */
  noArrow?: boolean
  linkClass?: string
  iconClass?: string
  onClick?: () => void
}

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

export default function Link({
  text,
  url,
  arrowLeft,
  size = 'body',
  newWindow,
  color = 'purple',
  noArrow,
  linkClass = '',
  iconClass = '',
  onClick,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const colorClass = { purple: 'text-purple', orange: 'text-orange', green: 'text-green' }[color]

  return (
    <a
      href={url}
      target={newWindow ? '_blank' : '_self'}
      rel={newWindow ? 'noopener noreferrer' : ''}
      className={`${size === 'display' ? 'font-header text-h3' : size === 'lead' ? 'font-header text-h4' : ''} ${linkClass} flex gap-2 items-center ${colorClass} hover:text-grey group`}
      aria-label={text}
      onClick={handleClick}
    >
      {!noArrow && arrowLeft && (
        <ArrowIcon
          direction="left"
          className={`group-hover:-translate-x-1 transition-transform duration-(--transition) ease-in-out w-[1em] shrink-0 ${iconClass}`}
        />
      )}
      <span>{keepHyphenatedWordsTogether(text)}</span>
      {!noArrow && !arrowLeft && (
        <ArrowIcon
          className={`group-hover:translate-x-1 transition-transform duration-(--transition) ease-in-out w-[1em] shrink-0 ${iconClass}`}
        />
      )}
    </a>
  )
}
