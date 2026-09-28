import { forwardRef } from 'react'
import Icon from '../ui/Icon.jsx'
import { hasImage } from '../../utils/images.js'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'

/**
 * One scoop in the gallery.
 *
 * The whole card is a single <button>:
 *   - mouse hover or keyboard focus lifts the lid and reveals the name,
 *     then click / Enter opens the flavor notes;
 *   - on touch, the first tap reveals the name and the second tap opens
 *     the notes (the revealed card is labeled "Open flavor notes").
 *
 * The name stays visually hidden (covered and transparent) until the
 * card is revealed.
 */
const FlavorCard = forwardRef(function FlavorCard(
  { flavor, index, total, revealed, onPointerReveal, onPointerConceal, onFocusReveal, onBlurConceal, onActivate },
  ref,
) {
  const number = String(index + 1).padStart(2, '0')
  const label = revealed
    ? `${flavor.name}. ${flavor.available ? 'Available now' : 'Currently unavailable'}. Open flavor notes.`
    : `Mystery scoop ${index + 1} of ${total}${flavor.imageAlt ? `: ${flavor.imageAlt}` : ''}. Reveal flavor name.`

  return (
    <li className="flavor" data-revealed={revealed || undefined} style={{ '--accent': flavor.accentColor }}>
      <button
        ref={ref}
        type="button"
        className="flavor__button"
        aria-label={label}
        aria-haspopup="dialog"
        onPointerEnter={onPointerReveal}
        onPointerLeave={onPointerConceal}
        onFocus={onFocusReveal}
        onBlur={onBlurConceal}
        onClick={onActivate}
      >
        {/* Revealed underneath the lid */}
        <span className="flavor__reveal" aria-hidden="true">
          <span className="flavor__meta">
            <span className="flavor__number">No. {number}</span>
            <span className={`flavor__status ${flavor.available ? '' : 'is-out'}`}>
              {flavor.available ? 'Available now' : 'Currently unavailable'}
            </span>
          </span>
          <span className="flavor__name">{flavor.name}</span>
          <span className="flavor__cta">
            Open flavor notes
            <Icon name="arrowRight" size={16} />
          </span>
        </span>

        {/* The hinged lid: only the scoop photograph by default */}
        <span className="flavor__lid" aria-hidden="true">
          {hasImage(flavor.image) ? (
            <ResponsiveImage
              imageKey={flavor.image}
              alt=""
              sizes="(min-width: 1100px) 260px, (min-width: 560px) 40vw, 80vw"
              className="flavor__scoop"
              draggable="false"
            />
          ) : (
            <span className="flavor__missing">Scoop photo coming soon</span>
          )}
          <span className="flavor__tab" />
        </span>
      </button>
    </li>
  )
})

export default FlavorCard
