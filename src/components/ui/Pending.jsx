import './Pending.css'

/**
 * Visible label for any detail the owners have not confirmed yet.
 * Keeps the concept honest: nothing unconfirmed is presented as fact.
 */
export function PendingBadge({ children = 'Pending owner confirmation' }) {
  return <span className="pending-badge">{children}</span>
}

export function PendingBlock({ label = 'Awaiting owner confirmation', children }) {
  return (
    <div className="pending-block">
      <span className="pending-block__label">{label}</span>
      {children && <p className="pending-block__text">{children}</p>}
    </div>
  )
}
