import { story } from '../../data/site.js'
import Logo from '../ui/Logo.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import './StorySection.css'

export default function StorySection() {
  return (
    <section id="story" className="story" aria-labelledby="story-title">
      <div className="container story__grid">
        <Reveal className="story__intro">
          <SectionHeading id="story-title" eyebrow="Our story" title="A boba-shop idea that turned into ice cream." />
          <p className="story__founders">
            <span>Founded by</span> {story.founders.join(' & ')}
          </p>
          <div className="story__badge" aria-hidden="true">
            <Logo size={180} alt="" />
          </div>
        </Reveal>

        <div className="story__content">
          {story.paragraphs.map((paragraph, index) => (
            <Reveal as="p" key={index} delay={index * 80} className={index === 0 ? 'story__lead' : 'story__text'}>
              {paragraph}
            </Reveal>
          ))}

          <Reveal as="figure" className="story__quote">
            <blockquote>
              <p>“{story.quote.text}”</p>
            </blockquote>
            <figcaption>{story.quote.attribution}</figcaption>
          </Reveal>
        </div>
      </div>

      <div className="container">
        <ul className="story__values" aria-label="What Melt Me is about">
          {story.values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index * 70} className="story__value">
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="story__sources">{story.sources}</p>
      </div>
    </section>
  )
}
