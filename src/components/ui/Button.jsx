import Icon from './Icon.jsx'
import './Button.css'

/**
 * Link styled as a button. Every button on this site navigates
 * somewhere real, so it is always an <a> with a real href.
 * External links open in a new tab and say so to assistive tech.
 */
export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  external = false,
  className = '',
  ...rest
}) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a
      href={href}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      {...externalProps}
      {...rest}
    >
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={size === 'sm' ? 16 : 18}
          className={`btn__icon ${icon === 'arrowDown' ? 'btn__icon--down' : ''}`.trim()}
        />
      )}
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  )
}
