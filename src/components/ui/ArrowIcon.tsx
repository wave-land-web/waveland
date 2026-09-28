interface Props {
  direction?: 'left' | 'right'
  className?: string
}

// Tabler's arrow-narrow icons, inlined so they don't depend on a sprite defined elsewhere on the page
const paths = {
  left: 'M5 12h14M5 12l4 4m-4-4l4-4',
  right: 'M5 12h14m-4 4l4-4m-4-4l4 4',
}

export default function ArrowIcon({ direction = 'right', className = '' }: Props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={paths[direction]}
      />
    </svg>
  )
}
