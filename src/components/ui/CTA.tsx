import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

interface BaseProps {
  text: string
  // Use className, not class: Astro drops `class` before it reaches a React component
  className?: string
  /** `large` gives a headline action more room. Same type either way, so every button reads as one family. */
  size?: 'default' | 'large'
  /** One `primary` per screen: the action the page is for. `secondary` for a repeat or an alternative. */
  variant?: 'primary' | 'secondary'
}

type LinkProps = BaseProps & { tag: 'link'; href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>
type ButtonProps = BaseProps & { tag: 'button' } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
type Props = LinkProps | ButtonProps

// Button styles live in global.css (btn, btn-primary, btn-secondary) so the whole system changes in one place
const sizeClasses = { default: 'px-6 py-3', large: 'px-8 py-4' }
const variantClasses = { primary: 'btn-primary', secondary: 'btn-secondary' }

export default function CTA(props: Props) {
  const { text, className, size = 'default', variant = 'primary', ...rest } = props
  const classes = [className, 'btn', variantClasses[variant], sizeClasses[size]].filter(Boolean).join(' ')

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
