interface Props {
  text: string
  url: string
  arrowLeft?: boolean
  newWindow?: boolean
  linkClass?: string
  iconClass?: string
  onClick?: () => void
}

export default function Link({
  text,
  url,
  arrowLeft,
  newWindow,
  linkClass,
  iconClass,
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
      className={`${linkClass} flex gap-2 items-center text-purple hover:text-grey group`}
      aria-label={text}
      onClick={handleClick}
    >
      {arrowLeft ? (
        <>
          <svg
            width="1em"
            height="1em"
            data-icon="tabler:arrow-narrow-left"
            className={`group-hover:-translate-x-1 transition-transform duration-(--transition) ease-in-out ${iconClass}`}
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
          {text}
        </>
      ) : (
        <>
          {text}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            data-icon="tabler:arrow-narrow-right"
            className={`group-hover:translate-x-1 transition-transform duration-(--transition) ease-in-out ${iconClass}`}
          >
            <use href="#ai:tabler:arrow-narrow-right"></use>
          </svg>
        </>
      )}
    </a>
  )
}
