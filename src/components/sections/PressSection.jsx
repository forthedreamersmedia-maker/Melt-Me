import { press } from '../../data/site.js'
import Icon from '../ui/Icon.jsx'
import { PendingBadge } from '../ui/Pending.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import './PressSection.css'

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export default function PressSection() {
  if (press.length === 0) return null

  return (
    <section id="press" className="press" aria-labelledby="press-title">
      <div className="container">
        <Reveal>
          <SectionHeading id="press-title" eyebrow="In the news" title="Melt Me in the Press" tone="light" />
        </Reveal>

        <ul className="press__list">
          {press.map((item, index) => (
            <Reveal as="li" key={item.url} delay={index * 70} className="press__item">
              <a className="press__card" href={item.url} target="_blank" rel="noopener noreferrer">
                <span className="press__publication">{item.publication}</span>
                <span className="press__title">{item.title}</span>
                <span className="press__date">
                  {item.date ? (
                    <time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time>
                  ) : (
                    <PendingBadge>Date to confirm</PendingBadge>
                  )}
                </span>
                <span className="press__arrow" aria-hidden="true">
                  <Icon name="arrowUpRight" size={22} />
                </span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
