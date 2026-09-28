import './SectionHeading.css'

export default function SectionHeading({ id, eyebrow, title, intro, align = 'start', tone = 'dark', children }) {
  return (
    <header className={`section-heading section-heading--${align} section-heading--${tone}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {intro && <p className="section-heading__intro">{intro}</p>}
      {children}
    </header>
  )
}
