import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

interface BaseProps {
  text: string
  // Use className, not class: Astro drops `class` before it reaches a React component
  className?: string
  isActive?: boolean
  /** `large` gives a headline action more room. Same type either way, so every button reads as one family. */
  size?: 'default' | 'large'
  /** `solid` is for the one main action on a page: filled at rest, the usual dashed outline on hover. */
  variant?: 'outline' | 'solid'
}

type LinkProps = BaseProps & { tag: 'link'; href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>
type ButtonProps = BaseProps & { tag: 'button' } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
type Props = LinkProps | ButtonProps

const sizeClasses = { default: 'px-5 py-3', large: 'px-7 py-4' }

const baseClasses =
  'inline-block w-fit leading-tight border border-purple rounded-lg shadow-lg transition-all duration-(--transition) ease-in-out text-center'

const variantClasses = {
  outline: 'border-dashed text-purple hover:text-black hover:bg-purple focus-visible:text-black focus-visible:bg-purple',
  solid:
    'bg-purple text-black hover:bg-transparent hover:text-purple hover:border-dashed focus-visible:bg-transparent focus-visible:text-purple focus-visible:border-dashed',
}

export default function CTA(props: Props) {
  const { text, className, isActive, size = 'default', variant = 'outline', ...rest } = props
  const classes = [className, baseClasses, variantClasses[variant], sizeClasses[size], isActive && '!text-black bg-purple']
    .filter(Boolean)
    .join(' ')

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
