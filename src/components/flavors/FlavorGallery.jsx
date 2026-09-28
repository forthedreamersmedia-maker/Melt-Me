import { useCallback, useEffect, useRef, useState } from 'react'
import { flavors, MENU_LABEL } from '../../data/flavors.js'
import Reveal from '../ui/Reveal.jsx'
import FlavorCard from './FlavorCard.jsx'
import FlavorDetails from './FlavorDetails.jsx'
import './FlavorGallery.css'

export default function FlavorGallery() {
  const [revealedIndex, setRevealedIndex] = useState(null)
  const [openIndex, setOpenIndex] = useState(null)
  const [announcement, setAnnouncement] = useState('')
  const listRef = useRef(null)
  const buttonRefs = useRef([])

  const reveal = useCallback((index) => {
    setRevealedIndex(index)
    setAnnouncement(`Revealed: ${flavors[index].name}.`)
  }, [])

  const conceal = useCallback((index) => {
    setRevealedIndex((current) => (current === index ? null : current))
  }, [])

  // Touch: tapping anywhere outside the gallery closes a revealed card.
  useEffect(() => {
    if (revealedIndex === null) return undefined
    const onPointerDown = (event) => {
      if (!listRef.current?.contains(event.target)) setRevealedIndex(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [revealedIndex])

  const handleActivate = (index) => {
    if (revealedIndex === index) {
      setOpenIndex(index)
    } else {
      // First tap on touch (or first activation without hover/focus) only reveals.
      reveal(index)
    }
  }

  const handleClose = () => {
    const index = openIndex
    setOpenIndex(null)
    setRevealedIndex(null)
    if (index !== null) {
      // Return focus to the card that opened the panel.
      requestAnimationFrame(() => buttonRefs.current[index]?.focus({ preventScroll: true }))
    }
  }

  return (
    <section id="flavors" className="flavors" aria-labelledby="flavors-title">
      <div className="container">
        <Reveal className="flavors__header">
          <p className="flavors__series">{MENU_LABEL ?? 'This month'}</p>
          <h2 id="flavors-title" className="flavors__title">
            This Month’s Flavors
          </h2>
          <p className="flavors__instruction">Every scoop has a story. Hover or tap to discover it.</p>
        </Reveal>

        <ul ref={listRef} className="flavors__grid" data-count={flavors.length}>
          {flavors.map((flavor, index) => (
            <FlavorCard
              key={flavor.name}
              ref={(node) => {
                buttonRefs.current[index] = node
              }}
              flavor={flavor}
              index={index}
              total={flavors.length}
              revealed={revealedIndex === index}
              onPointerReveal={(event) => event.pointerType === 'mouse' && reveal(index)}
              onPointerConceal={(event) => event.pointerType === 'mouse' && openIndex === null && conceal(index)}
              onFocusReveal={(event) => {
                // Keyboard focus reveals; a tap that happens to focus the button does not.
                if (event.currentTarget.matches(':focus-visible')) reveal(index)
              }}
              onBlurConceal={() => openIndex === null && conceal(index)}
              onActivate={() => handleActivate(index)}
            />
          ))}
        </ul>

        <p className="flavors__footnote">
          Descriptions, ingredients and allergen details appear once the shop confirms them. Please ask staff about
          allergens before ordering.
        </p>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>

      <FlavorDetails flavor={openIndex !== null ? flavors[openIndex] : null} onClose={handleClose} />
    </section>
  )
}
