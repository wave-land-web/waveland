interface Props {
  text: string
  url: string
  arrowLeft?: boolean
  /** Header-font sizes for CTAs: `lead` (h4) or `display` (h3). Default matches body copy. */
  size?: 'body' | 'lead' | 'display'
  newWindow?: boolean
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

  return (
    <a
      href={url}
      target={newWindow ? '_blank' : '_self'}
      rel={newWindow ? 'noopener noreferrer' : ''}
      className={`${size === 'display' ? 'font-header text-h3' : size === 'lead' ? 'font-header text-h4' : ''} ${linkClass} flex gap-2 items-center text-purple hover:text-grey group`}
      aria-label={text}
      onClick={handleClick}
    >
      {arrowLeft ? (
        <>
          <svg
            width="1em"
            height="1em"
            data-icon="tabler:arrow-narrow-left"
            className={`group-hover:-translate-x-1 transition-transform duration-(--transition) ease-in-out w-[1em] shrink-0 ${iconClass}`}
          >
            <symbol id="ai:tabler:arrow-narrow-left" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4 4m-4-4l4-4"
              ></path>
            </symbol>
            <use href="#ai:tabler:arrow-narrow-left"></use>
          </svg>
          <span>{keepHyphenatedWordsTogether(text)}</span>
        </>
      ) : (
        <>
          <span>{keepHyphenatedWordsTogether(text)}</span>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            data-icon="tabler:arrow-narrow-right"
            className={`group-hover:translate-x-1 transition-transform duration-(--transition) ease-in-out w-[1em] shrink-0 ${iconClass}`}
          >
            <use href="#ai:tabler:arrow-narrow-right"></use>
          </svg>
        </>
      )}
    </a>
  )
}
