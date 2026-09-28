import { business } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import Logo from '../ui/Logo.jsx'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import './Hero.css'

/** Scoops from the shop's own photography, arranged on the logo's pink disc. */
const heroScoops = [
  { key: 'flavors/matcha-calamansi', className: 'hero__scoop--main', sizes: '(min-width: 900px) 30vw, 58vw' },
  { key: 'flavors/amaretto-tiramisu', className: 'hero__scoop--top', sizes: '(min-width: 900px) 17vw, 34vw' },
  { key: 'flavors/earl-grey-stracciatella', className: 'hero__scoop--side', sizes: '(min-width: 900px) 18vw, 36vw' },
]

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__copy">
          <Logo size={120} priority className="hero__logo" />
          <h1 id="hero-title" className="hero__title">
            <span>Small batches.</span> <span>Unexpected flavors.</span> <span>Made in Berkeley.</span>
          </h1>
          <p className="hero__lede">
            Melt Me Creamery makes artisanal, Asian-inspired ice cream, handcrafted a few batches at a time on
            Martin Luther King Jr.&nbsp;Way.
          </p>
          <div className="hero__actions">
            <Button href="#flavors" size="lg" icon="arrowDown">
              See This Month’s Flavors
            </Button>
            <Button href={business.directionsUrl} size="lg" variant="secondary" external>
              Get Directions
            </Button>
          </div>
        </div>

        <div
          className="hero__visual"
          role="img"
          aria-label="Three scoops from Melt Me’s current series: a two-tone green and peach scoop, a golden layered scoop, and a pale scoop flecked with chocolate."
        >
          <div className="hero__disc" aria-hidden="true" />
          {heroScoops.map((scoop, index) => (
            <div key={scoop.key} className={`hero__scoop ${scoop.className}`} style={{ '--i': index }}>
              <ResponsiveImage
                imageKey={scoop.key}
                alt=""
                sizes={scoop.sizes}
                loading="eager"
                fetchPriority={index === 0 ? 'high' : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
