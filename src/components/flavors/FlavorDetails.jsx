import { useEffect, useRef, useState } from 'react'
import Icon from '../ui/Icon.jsx'
import { PendingBlock } from '../ui/Pending.jsx'
import { hasImage } from '../../utils/images.js'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Flavor notes panel. Uses the native <dialog> element in modal mode,
 * which makes the rest of the page inert. On top of that we:
 *   - keep Tab / Shift+Tab cycling inside the panel,
 *   - close on Escape (native `cancel` event), the close button, or a
 *     click on the backdrop,
 *   - lock page scroll while open (see `html:has(dialog[open])`).
 */
export default function FlavorDetails({ flavor, onClose }) {
  const dialogRef = useRef(null)
  // Keep the last flavor so content does not vanish mid-close.
  const [shown, setShown] = useState(flavor)
  if (flavor && flavor !== shown) setShown(flavor)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (flavor && !dialog.open) {
      dialog.showModal()
      dialog.querySelector('.details__close')?.focus()
      dialog.querySelector('.details__body')?.scrollTo(0, 0)
    } else if (!flavor && dialog.open) {
      dialog.close()
    }
  }, [flavor])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    const handleClose = () => onClose()
    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const items = [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('keydown', handleKeyDown)
    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  // A click whose target is the <dialog> itself landed on the backdrop.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  const data = flavor ?? shown

  return (
    <dialog
      ref={dialogRef}
      className="details"
      aria-labelledby="details-title"
      onClick={handleBackdropClick}
      style={data ? { '--accent': data.accentColor } : undefined}
    >
      {data && (
        <div className="details__panel">
          <button type="button" className="details__close" onClick={() => dialogRef.current?.close()}>
            <Icon name="close" size={22} />
            <span className="visually-hidden">Close flavor notes</span>
          </button>

          <div className="details__media">
            {hasImage(data.image) ? (
              <ResponsiveImage
                imageKey={data.image}
                alt={data.imageAlt ? `${data.name}: ${data.imageAlt}` : data.name}
                sizes="(min-width: 860px) 420px, 70vw"
                loading="eager"
                className="details__scoop"
              />
            ) : (
              <p className="details__missing">Scoop photo coming soon</p>
            )}
          </div>

          <div className="details__body" tabIndex={0} role="region" aria-label="Flavor notes">
            <p className={`details__status ${data.available ? '' : 'is-out'}`}>
              {data.available ? 'Available now' : 'Currently unavailable'}
            </p>
            <h2 id="details-title" className="details__title">
              {data.name}
            </h2>

            {data.description ? (
              <p className="details__description">{data.description}</p>
            ) : (
              <PendingBlock label="Description">Owner-approved description coming soon.</PendingBlock>
            )}

            <dl className="details__facts">
              <DetailList term="Ingredients" items={data.ingredients} pendingText="Ingredient list to be confirmed by Melt Me." />
              <DetailList term="Tasting notes" items={data.tastingNotes} pendingText="Tasting notes to be written by Melt Me." />
              <DetailList
                term="Allergens"
                items={data.allergens}
                pendingText="Allergen information has not been confirmed. Please ask staff before ordering."
              />
              <div className="details__fact">
                <dt>Availability</dt>
                <dd>{data.available ? 'In the case now, while this batch lasts.' : 'Not in the case right now.'}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </dialog>
  )
}

function DetailList({ term, items, pendingText }) {
  return (
    <div className="details__fact">
      <dt>{term}</dt>
      <dd>
        {items && items.length > 0 ? (
          <ul className="details__chips">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <PendingBlock label="Awaiting owner confirmation">{pendingText}</PendingBlock>
        )}
      </dd>
    </div>
  )
}
