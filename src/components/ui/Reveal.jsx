import { useEffect, useRef, useState } from 'react'

/**
 * Fades content up as it scrolls into view. Without JavaScript, or with
 * reduced motion, content is simply shown (see `.reveal` in global.css).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  // Browsers without IntersectionObserver just show everything.
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))

  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
