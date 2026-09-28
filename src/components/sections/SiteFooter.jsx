import { business, navigation } from '../../data/site.js'
import Icon from '../ui/Icon.jsx'
import Logo from '../ui/Logo.jsx'
import './SiteFooter.css'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo size={96} />
          <address>
            {business.street}
            <br />
            {business.city}
          </address>
          <a className="site-footer__instagram" href={business.instagram.url} target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" size={20} />
            {business.instagram.handle}
            <span className="visually-hidden"> on Instagram (opens in a new tab)</span>
          </a>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#press">Press</a>
            </li>
            <li>
              <a href="#top">Back to top</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container site-footer__legal">
        <p>
          © {year} {business.copyrightHolder ?? '[Copyright holder to be confirmed]'}
        </p>
        <p className="site-footer__notice">
          <strong>Unofficial concept preview.</strong> Not affiliated with or endorsed by Melt Me Creamery.
        </p>
      </div>
    </footer>
  )
}
