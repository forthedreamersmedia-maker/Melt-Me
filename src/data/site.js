/**
 * SITE CONTENT
 * ------------------------------------------------------------------
 * Business details, story, process and press for the concept preview.
 *
 * Rules for this file:
 *   - Only verified or owner-provided facts.
 *   - `confirmed: false` shows a visible "pending owner confirmation"
 *     label on the page. Flip to `true` once the owners sign off.
 *   - `null` renders as a labeled placeholder. Never fill in guesses.
 */

const ADDRESS_QUERY = 'Melt Me Creamery, 1918 Martin Luther King Jr Way, Berkeley, CA 94704'

export const business = {
  name: 'Melt Me Creamery',
  street: '1918 Martin Luther King Jr. Way',
  city: 'Berkeley, California',
  // Berkeleyside, Jul 24, 2025
  crossStreets: 'Between Berkeley Way and Hearst Avenue',

  hours: {
    confirmed: false,
    // Reported by East Bay Express on Aug 19, 2025. Replace with the
    // owners' current hours and set confirmed: true.
    reportedBy: 'East Bay Express, August 2025',
    schedule: [
      { days: 'Monday – Thursday', time: '3 – 9 pm' },
      { days: 'Friday – Sunday', time: 'Noon – 9 pm' },
    ],
  },

  phone: {
    confirmed: false,
    display: '(510) 936-6456',
    href: 'tel:+15109366456',
    reportedBy: 'The Infatuation',
  },

  // No public email address was found. Add one here once provided,
  // e.g. { confirmed: true, address: 'hello@example.com' }.
  email: null,

  instagram: {
    handle: '@meltme.creamery',
    url: 'https://www.instagram.com/meltme.creamery/',
  },

  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
  appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent('Melt Me Creamery')}&address=${encodeURIComponent('1918 Martin Luther King Jr Way, Berkeley, CA 94704')}`,

  copyrightHolder: null, // e.g. 'Melt Me Creamery LLC' once confirmed
}

export const navigation = [
  { label: 'This Month’s Flavors', href: '#flavors' },
  { label: 'Our Story', href: '#story' },
  { label: 'Visit', href: '#visit' },
]

/**
 * Small-batch process. Captions are drafted only from what the owners
 * told East Bay Express (Aug 19, 2025) and the shop's own monthly
 * series. Have the owners approve or rewrite before publishing.
 * `image` accepts an optimized image key once process photos exist.
 */
export const process = {
  approved: false,
  source: 'Drafted from the owners’ interview with East Bay Express (August 2025).',
  steps: [
    {
      title: 'Flavor development',
      caption:
        'New flavors are worked out in-house, and a themed monthly series rotates through the case alongside the regulars.',
      image: null,
      color: 'pink',
    },
    {
      title: 'Base, rested overnight',
      caption: 'Each ice cream base is made, then refrigerated overnight before it goes anywhere near the machine.',
      image: null,
      color: 'cream',
    },
    {
      title: 'Churned in small batches',
      caption: 'The rested base is churned and frozen in small batches, for up to five hours, before it is ready to serve.',
      image: null,
      color: 'matcha',
    },
    {
      title: 'Scooped in Berkeley',
      caption:
        'Everything is served at the shop on Martin Luther King Jr. Way, with prep done after closing so the case is full the next day.',
      image: null,
      color: 'caramel',
    },
  ],
}

/**
 * Our story. Every sentence maps to a published source listed in
 * `story.sources`. Founders' own words appear only as published.
 */
export const story = {
  founders: ['Nutchapol Phaungjit', 'Suphaluk Moontha'],
  paragraphs: [
    'Melt Me Creamery is run by husband-and-wife team Nutchapol Phaungjit and Suphaluk Moontha. Their first idea was a boba shop, until a visit to Gunther’s Ice Cream in Sacramento showed them what a neighborhood scoop shop could feel like, and they changed course to ice cream.',
    'They soft-opened on July 11, 2025, at 1918 Martin Luther King Jr. Way, a Berkeley storefront that was previously home to Ono Bakery and Secret Scoop. The shop is pink and white, inside and out.',
    'The case mixes Thai and broader Asian flavors, like Thai tea with brown sugar mochi, mango sticky rice, ube and matcha, with less expected ones like cheddar cheese with walnut pralines. Everything is made in small batches, and a monthly series keeps the lineup changing.',
  ],
  quote: {
    text: 'We’re excited to become part of this amazing community and look forward to sharing joy, smiles, and delicious ice cream with all of you.',
    attribution: 'The owners, as quoted by Patch, August 2025',
  },
  values: [
    { title: 'Community', text: 'Sparked by the community feel of Gunther’s Ice Cream in Sacramento.' },
    { title: 'Curiosity', text: 'Cheddar and walnut praline. Korean corn coffee latte. Earl Grey stracciatella.' },
    { title: 'Thai & Asian flavors', text: 'Thai tea, mango sticky rice, ube, matcha, calamansi and more.' },
    { title: 'Small batches', text: 'Bases rest overnight, then get churned a little at a time.' },
    { title: 'Made to share', text: 'A new monthly series to try, compare and pass around.' },
  ],
  sources: 'Sources: East Bay Express (Aug 19, 2025), Patch (Aug 7, 2025), Berkeleyside (Jul 24, 2025).',
}

/**
 * Press coverage. Every item is a real, published article. Add new
 * coverage at the top. `date` is ISO (YYYY-MM-DD) or null if unconfirmed.
 */
export const press = [
  {
    publication: 'San Francisco Chronicle',
    title: 'Melt Me Creamery in Berkeley serves creative, Asian-inspired ice cream',
    date: null,
    url: 'https://www.sfchronicle.com/food/restaurants/article/melt-me-creamery-berkeley-20770935.php',
  },
  {
    publication: 'East Bay Express',
    title: 'Melt Me Creamery serves Asian-inspired ice cream flavors',
    date: '2025-08-19',
    url: 'https://eastbayexpress.com/melt-me-creamery-serves-asian-inspired-ice-cream-flavors/',
  },
  {
    publication: 'The Infatuation',
    title: 'Melt Me Creamery',
    date: '2025-08-11',
    url: 'https://www.theinfatuation.com/san-francisco/reviews/melt-me-creamery',
  },
  {
    publication: 'Patch',
    title: 'New Creamery Opens In Berkeley',
    date: '2025-08-07',
    url: 'https://patch.com/california/berkeley/fun-flavors-aplenty-new-berkeley-ice-cream-shop',
  },
  {
    publication: 'Berkeleyside',
    title: 'Cheese-flavored ice cream comes to Berkeley; Mugunghwa expands into Oakland',
    date: '2025-07-24',
    url: 'https://www.berkeleyside.org/2025/07/24/mugungwha-melt-me-kien-svay-new-restaurants',
  },
]
