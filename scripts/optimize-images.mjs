/**
 * Image optimizer
 * ------------------------------------------------------------------
 * Converts every photo in `images-source/` (except `originals/`) into
 * responsive WebP files in `public/images/`, and writes a manifest the
 * site uses to build `srcset`, `width` and `height` automatically.
 *
 *   npm run images
 *
 * Source:  images-source/flavors/ube-malted-crunch.png
 * Output:  public/images/flavors/ube-malted-crunch-480.webp (etc.)
 * Use in data files as:  image: 'flavors/ube-malted-crunch'
 *
 * Transparent PNG cut-outs keep their transparency.
 * Images are never upscaled beyond their original width.
 */
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'images-source')
const OUT = path.join(root, 'public', 'images')
const MANIFEST = path.join(root, 'src', 'data', 'image-manifest.json')
const WIDTHS = [320, 480, 640, 960, 1280, 1920]
const SKIP_DIRS = new Set(['originals'])
const EXTENSIONS = /\.(png|jpe?g|webp|avif|tiff?)$/i

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...(await walk(full)))
    } else if (EXTENSIONS.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function run() {
  await rm(OUT, { recursive: true, force: true })
  const files = await walk(SRC)
  const manifest = {}

  for (const file of files) {
    const rel = path.relative(SRC, file)
    const key = rel.replace(EXTENSIONS, '').split(path.sep).join('/')
    const image = sharp(file).rotate()
    const { width, height } = await image.metadata()
    const targets = WIDTHS.filter((w) => w < width)
    targets.push(width)

    await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true })
    const variants = []
    for (const w of [...new Set(targets)]) {
      const outRel = `${key}-${w}.webp`
      await sharp(file)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 82, alphaQuality: 90, effort: 6, smartSubsample: true })
        .toFile(path.join(OUT, outRel))
      variants.push({ width: w, src: `/images/${outRel}` })
    }
    manifest[key] = { width, height, variants }
    console.log(`✓ ${key} (${variants.map((v) => v.width).join(', ')})`)
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\nWrote ${Object.keys(manifest).length} images and src/data/image-manifest.json`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
