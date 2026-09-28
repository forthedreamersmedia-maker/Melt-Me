/**
 * THIS MONTH'S FLAVORS
 * ------------------------------------------------------------------
 * This is the only file that needs to change when the menu rotates.
 *
 * To update the menu:
 *   1. Save each new scoop photo (ideally a transparent PNG cut-out) in
 *      `images-source/flavors/`, e.g. `ube-malted-crunch.png`.
 *   2. Run `npm run images`.
 *   3. Edit the list below. `image` is the file name without the
 *      extension, prefixed with `flavors/`.
 *   4. Update MENU_LABEL.
 *
 * Field guide
 *   name          Flavor name, exactly as the shop writes it.
 *   image         Optimized image key, e.g. 'flavors/matcha-calamansi'.
 *   imageAlt      A visual description of the scoop that does not give
 *                 away the name before it is revealed.
 *   description   Owner-approved description (string) or null.
 *   ingredients   Array of strings, or null.
 *   tastingNotes  Array of strings, or null.
 *   allergens     Array of strings, or null. Never guess allergens.
 *   accentColor   Hex color sampled from the scoop. Drives the card
 *                 background and the details panel accents.
 *   available     true = in the case now, false = sold out for now.
 *
 * Any field left as `null` is shown on the site as a clearly labeled
 * "awaiting owner confirmation" note instead of invented copy.
 */

/** Heading label for the current rotation, as the shop names it. */
export const MENU_LABEL = 'September Series'

export const flavors = [
  {
    name: 'Earl Grey Stracciatella',
    image: 'flavors/earl-grey-stracciatella',
    imageAlt: 'A pale tan scoop flecked with fine dark chocolate shavings',
    description: null,
    ingredients: null,
    tastingNotes: null,
    allergens: null,
    accentColor: '#B9A57C',
    available: true,
  },
  {
    name: 'Amaretto Tiramisu',
    image: 'flavors/amaretto-tiramisu',
    imageAlt: 'A creamy golden scoop layered with soft, cake-like pieces',
    description: null,
    ingredients: null,
    tastingNotes: null,
    allergens: null,
    accentColor: '#C9965A',
    available: true,
  },
  {
    name: 'Roasted Coconut Sorbet',
    image: 'flavors/roasted-coconut-sorbet',
    imageAlt: 'A bright white, frosty scoop with a fine icy texture',
    description: null,
    ingredients: null,
    tastingNotes: null,
    allergens: null,
    accentColor: '#C8B596',
    available: true,
  },
  {
    name: 'Matcha Calamansi',
    image: 'flavors/matcha-calamansi',
    imageAlt: 'A two-tone scoop, half deep green and half soft peach',
    description: null,
    ingredients: null,
    tastingNotes: null,
    allergens: null,
    accentColor: '#9EAB4C',
    available: true,
  },
]
