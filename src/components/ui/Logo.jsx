import ResponsiveImage from './ResponsiveImage.jsx'

/**
 * The supplied Melt Me Creamery logo, used exactly as provided
 * (only the dark screenshot corners were removed around the disc).
 */
export default function Logo({ size = 56, className = '', priority = false, alt = 'Melt Me Creamery' }) {
  return (
    <ResponsiveImage
      imageKey="brand/logo-badge"
      alt={alt}
      sizes={`${size}px`}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`logo ${className}`.trim()}
      style={{ width: size, height: size }}
    />
  )
}
