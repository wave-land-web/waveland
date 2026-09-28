import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

interface BaseProps {
  text: string
  // Use className, not class: Astro drops `class` before it reaches a React component
  className?: string
  isActive?: boolean
  /** `large` for a section's headline action */
  size?: 'default' | 'large'
}

type LinkProps = BaseProps & { tag: 'link'; href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>
type ButtonProps = BaseProps & { tag: 'button' } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
type Props = LinkProps | ButtonProps

const sizeClasses = { default: 'px-4 py-3', large: 'px-6 py-4 font-header text-h5' }

const baseClasses =
  'inline-block w-fit border border-purple border-dashed rounded-lg shadow-lg text-purple hover:text-black hover:bg-purple transition-all duration-(--transition) ease-in-out text-center'

export default function CTA(props: Props) {
  const { text, className, isActive, size = 'default', ...rest } = props
  const classes = [className, baseClasses, sizeClasses[size], isActive && '!text-black bg-purple'].filter(Boolean).join(' ')

  if (rest.tag === 'link') {
    const { tag, ...anchorProps } = rest
    return (
      <a className={classes} {...anchorProps}>
        {text}
      </a>
    )
  }

  const { tag, ...buttonProps } = rest
  return (
    <button className={classes} {...buttonProps}>
      {text}
    </button>
  )
}
