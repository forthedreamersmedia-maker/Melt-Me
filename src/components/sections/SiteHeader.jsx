import { useEffect, useId, useRef, useState } from 'react'
import { business, navigation } from '../../data/site.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Logo from '../ui/Logo.jsx'
import './SiteHeader.css'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape, outside click, or when resizing to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (event) => {
      if (!panelRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const media = window.matchMedia('(min-width: 900px)')
    const onMedia = (event) => event.matches && setMenuOpen(false)

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    media.addEventListener('change', onMedia)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      media.removeEventListener('change', onMedia)
    }
  }, [menuOpen])

  const secondaryLinks = navigation.filter((item) => item.href !== '#flavors')

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner container">
        <a href="#top" className="site-header__brand">
          <Logo size={52} priority alt="" />
          <span className="visually-hidden">Melt Me Creamery, back to top</span>
        </a>

        <nav className="site-header__nav" aria-label="Main">
          <ul className="site-header__links">
            {secondaryLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="site-header__link">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={business.instagram.url}
                className="site-header__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
                <Icon name="arrowUpRight" size={14} />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <Button href="#flavors" size="sm" className="site-header__cta">
            See This Month’s Flavors
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        ref={panelRef}
        className={`site-header__panel ${menuOpen ? 'is-open' : ''}`}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <ul className="container">
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Instagram <Icon name="arrowUpRight" size={18} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
