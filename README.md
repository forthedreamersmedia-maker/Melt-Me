# Melt Me Creamery — unofficial concept preview

A one-page concept site for Melt Me Creamery, a small-batch, Asian-inspired ice cream shop at 1918 Martin Luther King Jr. Way in Berkeley.

**This is not the official Melt Me website, and Melt Me has not approved it.** It is set to `noindex, nofollow` in three places (the `<meta name="robots">` tag, an `X-Robots-Tag` header in `vercel.json`, and `public/robots.txt`), and the footer says "Unofficial concept preview."

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

Built with React and Vite. It deploys to Vercel with no extra settings: import the repo, and Vercel picks up `vercel.json` (Vite framework, `npm run build`, output folder `dist`).

## Update the monthly flavors

All flavor content is in **`src/data/flavors.js`**. The page layout never needs to change.

1. Save each scoop photo in `images-source/flavors/`. Transparent PNG cut-outs look best, because each card puts the scoop on a background tinted to match the flavor.
2. Run `npm run images`. This writes responsive WebP files to `public/images/` and updates `src/data/image-manifest.json`.
3. Edit the `flavors` array and the `MENU_LABEL`:

```js
{
  name: 'Matcha Calamansi',
  image: 'flavors/matcha-calamansi',   // file name without the extension
  imageAlt: 'A two-tone scoop, half deep green and half soft peach',
  description: null,                   // owner-approved text, or null
  ingredients: null,                   // ['Matcha', 'Calamansi', ...] or null
  tastingNotes: null,                  // ['Grassy', 'Bright citrus', ...] or null
  allergens: null,                     // ['Milk', ...] or null. Never guess.
  accentColor: '#9EAB4C',              // a color sampled from the scoop
  available: true,                     // false shows "Currently unavailable"
}
```

A field set to `null` shows up on the site as a clearly labeled "Awaiting owner confirmation" note. The site never fills gaps with invented copy.

## Other content

`src/data/site.js` holds the address, hours, phone, email, Instagram, process captions, story, and press links. Any detail marked `confirmed: false` shows a "Pending owner confirmation" label. Once the owners confirm it, change it to `true`.

## Project structure

```
src/
  data/            flavors.js, site.js, image-manifest.json (generated)
  components/
    flavors/       FlavorGallery, FlavorCard (the hinged lid), FlavorDetails (dialog)
    sections/      SiteHeader, Hero, ProcessSection, StorySection, PressSection, VisitSection, SiteFooter
    ui/            Button, Icon, Logo, ResponsiveImage, Reveal, SectionHeading, Pending
  styles/global.css  design tokens (palette, type) and base styles
images-source/     original images (the originals/ folder is never published)
scripts/optimize-images.mjs
```

## Accessibility notes

- Flavor cards are real buttons. Mouse hover or keyboard focus lifts the lid, and click or Enter opens the notes. On touch screens, the first tap reveals the name and the second tap opens the notes.
- The notes panel is a native modal `<dialog>`. Focus stays inside it, and it closes with Escape, the close button, or a click outside. Focus then returns to the card that opened it.
- With `prefers-reduced-motion`, the lid fades instead of swinging, and the float, reveal, and smooth-scroll effects are turned off.
- The site has a skip link, visible focus rings, and alt text for every image, and it passes axe-core (WCAG 2.1 AA) checks.

## Sources for the published facts

- East Bay Express, "Melt Me Creamery serves Asian-inspired ice cream flavors" (Aug 19, 2025): founders, the boba-shop origin, the Gunther's visit, the overnight-rested base, small batches, and the reported hours
- Patch, "New Creamery Opens In Berkeley" (Aug 7, 2025): the July 11, 2025 soft opening, the pink-and-white shop, and the owners' quote
- Berkeleyside (Jul 24, 2025): the cross streets
- The Infatuation (Aug 11, 2025): the listed phone number
- The owners' "September Series" menu art: this month's four flavors and the scoop photography
