import { process } from '../../data/site.js'
import { PendingBadge } from '../ui/Pending.jsx'
import { hasImage } from '../../utils/images.js'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import './ProcessSection.css'

export default function ProcessSection() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="Small batch"
            title="Slow on purpose."
            intro="Every flavor takes the long way from idea to cone."
          />
        </Reveal>

        <ol className="process__steps">
          {process.steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 110} className={`process__step process__step--${step.color}`}>
              <div className="process__visual">
                {hasImage(step.image) ? (
                  <ResponsiveImage imageKey={step.image} alt={step.imageAlt ?? ''} sizes="(min-width: 900px) 25vw, 90vw" />
                ) : (
                  <span className="process__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
              </div>
              <h3 className="process__title">
                <span className="visually-hidden">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="process__caption">{step.caption}</p>
            </Reveal>
          ))}
        </ol>

        {!process.approved && (
          <p className="process__note">
            <PendingBadge>Draft copy, pending owner approval</PendingBadge>
            <span>{process.source}</span>
          </p>
        )}
      </div>
    </section>
  )
}
