interface Props {
  tag: 'link' | 'button'
  href?: string
  text: string
  className?: string
  isActive?: boolean
  onClick?: (e: React.MouseEvent) => void
  [key: string]: any
}

const baseClasses =
  'px-4 py-3 border border-purple border-dashed rounded-lg shadow-lg text-purple hover:text-black hover:bg-purple transition-all duration-(--transition) ease-in-out text-center'

export default function CTA({ tag, href, text, className, isActive, onClick, ...rest }: Props) {
  const activeClasses = isActive ? '!text-black bg-purple' : ''

  if (tag === 'link') {
    return (
      <a href={href} className={`${className || ''} ${baseClasses} ${activeClasses}`} {...rest}>
        {text}
      </a>
    )
  }

  return (
    <button
      className={`${className || ''} ${baseClasses} ${activeClasses}`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  )
}
