interface Props {
  /** right: another page on this site. external: opens another site. */
  direction?: 'right' | 'external'
  className?: string
}

// Tabler's arrow-narrow-right and arrow-up-right, inlined. Sized to the text (1em), and nudged on hover by .link-arrow (global.css).
const paths = {
  right: 'M5 12h14m-4 4l4-4m-4-4l4 4',
  external: 'M17 7l-10 10M8 7h9v9',
}

export default function ArrowIcon({ direction = 'right', className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" data-arrow={direction} className={`arrow size-[1em] shrink-0 ${className}`}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={paths[direction]} />
    </svg>
  )
}
