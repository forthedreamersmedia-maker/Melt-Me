import { business } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import { PendingBadge, PendingBlock } from '../ui/Pending.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import './VisitSection.css'

export default function VisitSection() {
  const { hours, phone, email, instagram } = business

  return (
    <section id="visit" className="visit" aria-labelledby="visit-title">
      <div className="container visit__grid">
        <Reveal className="visit__card">
          <SectionHeading id="visit-title" eyebrow="Visit" title={business.name} />

          <address className="visit__address">
            <Icon name="pin" size={22} />
            <span>
              {business.street}
              <br />
              {business.city}
              <small>{business.crossStreets}</small>
            </span>
          </address>

          <div className="visit__actions">
            <Button href={business.directionsUrl} external icon="arrowUpRight">
              Get Directions
            </Button>
          </div>

          <p className="visit__maps">
            Open the location in{' '}
            <a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
            </a>{' '}
            or{' '}
            <a href={business.appleMapsUrl} target="_blank" rel="noopener noreferrer">
              Apple Maps<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </Reveal>

        <Reveal className="visit__details" delay={120}>
          <div className="visit__block">
            <h3 className="visit__label">
              <Icon name="clock" size={20} /> Hours
            </h3>
            {!hours.confirmed && <PendingBadge />}
            {hours.schedule?.length ? (
              <>
                <dl className="visit__hours">
                  {hours.schedule.map((row) => (
                    <div key={row.days}>
                      <dt>{row.days}</dt>
                      <dd>{row.time}</dd>
                    </div>
                  ))}
                </dl>
                {!hours.confirmed && (
                  <p className="visit__small">
                    As reported by {hours.reportedBy}. Check{' '}
                    <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                      Instagram<span className="visually-hidden"> (opens in a new tab)</span>
                    </a>{' '}
                    for current hours.
                  </p>
                )}
              </>
            ) : (
              <PendingBlock>Opening hours will be added once confirmed by the owners.</PendingBlock>
            )}
          </div>

          <div className="visit__block">
            <h3 className="visit__label">
              <Icon name="phone" size={20} /> Phone
            </h3>
            {phone ? (
              <>
                <a className="visit__value" href={phone.href}>
                  {phone.display}
                </a>
                {!phone.confirmed && <PendingBadge>{`Listed by ${phone.reportedBy}, pending confirmation`}</PendingBadge>}
              </>
            ) : (
              <PendingBlock>Phone number to be confirmed.</PendingBlock>
            )}
          </div>

          <div className="visit__block">
            <h3 className="visit__label">
              <Icon name="mail" size={20} /> Email
            </h3>
            {email?.address ? (
              <a className="visit__value" href={`mailto:${email.address}`}>
                {email.address}
              </a>
            ) : (
              <PendingBlock>Email address to be provided by Melt Me.</PendingBlock>
            )}
          </div>

          <div className="visit__block">
            <h3 className="visit__label">
              <Icon name="instagram" size={20} /> Instagram
            </h3>
            <a className="visit__value" href={instagram.url} target="_blank" rel="noopener noreferrer">
              {instagram.handle}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
