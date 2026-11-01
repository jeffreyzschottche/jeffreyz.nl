import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const source = resolve('output/imagegen/city-character')
const frames = `${source}/sprites`
mkdirSync(frames, { recursive: true })
mkdirSync(`${source}/rendered`, { recursive: true })

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { maxBuffer: 32 * 1024 * 1024, ...options })
  if (result.status !== 0) throw new Error(result.stderr?.toString() || `${command} failed`)
  return result.stdout
}
function ffmpeg(args, options = {}) { return run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], options) }

const manifest = { width: 480, height: 480, fps: 12, duration: 9, atlases: {} }
for (const [name, columns, rows] of [['walk', 4, 2], ['climb', 4, 2], ['ledge', 2, 2]]) {
  const file = `${source}/${name}.png`
  const [width, height] = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file]).toString().trim().split(',').map(Number)
  const alpha = ffmpeg(['-i', file, '-vf', 'alphaextract', '-f', 'rawvideo', '-pix_fmt', 'gray', 'pipe:1'])
  const sprites = []
  for (let index = 0; index < columns * rows; index++) {
    const left = Math.floor((index % columns) * width / columns)
    const top = Math.floor(Math.floor(index / columns) * height / rows)
    const right = Math.floor(((index % columns) + 1) * width / columns)
    const bottom = Math.floor((Math.floor(index / columns) + 1) * height / rows)
    let minX = right, minY = bottom, maxX = left, maxY = top
    const rowMass = []
    for (let y = top; y < bottom; y++) {
      let mass = 0
      for (let x = left; x < right; x++) {
        if (alpha[y * width + x] > 48) {
          minX = Math.min(minX, x); minY = Math.min(minY, y)
          maxX = Math.max(maxX, x); maxY = Math.max(maxY, y)
          mass++
        }
      }
      rowMass.push(mass)
    }
    if (maxX <= minX || maxY <= minY) throw new Error(`Empty ${name} frame ${index}`)
    minX = Math.max(left, minX - 2); minY = Math.max(top, minY - 2)
    maxX = Math.min(right - 1, maxX + 2); maxY = Math.min(bottom - 1, maxY + 2)
    // Register the dense torso/backpack rather than a changing hand or foot.
    const window = Math.floor((bottom - top) * .2)
    let bestTop = 0, bestMass = 0
    for (let y = 0; y <= rowMass.length - window; y++) {
      let mass = 0
      for (let j = y; j < y + window; j++) mass += rowMass[j]
      if (mass > bestMass) { bestMass = mass; bestTop = y }
    }
    let mass = 0, momentX = 0, momentY = 0
    for (let y = top + bestTop; y < top + bestTop + window; y++) {
      for (let x = minX; x <= maxX; x++) {
        const weight = alpha[y * width + x] / 255
        mass += weight; momentX += x * weight; momentY += y * weight
      }
    }
    const sprite = {
      file: `sprites/${name}-${index}.png`,
      width: maxX - minX + 1, height: maxY - minY + 1,
      anchorX: momentX / mass - minX, anchorY: momentY / mass - minY,
    }
    ffmpeg(['-i', file, '-vf', `crop=${sprite.width}:${sprite.height}:${minX}:${minY}`, '-frames:v', '1', `${source}/${sprite.file}`])
    sprites.push(sprite)
  }
  manifest.atlases[name] = { cellWidth: width / columns, cellHeight: height / rows, sprites }
}

// Preserve the accepted background outside the small rectangle containing the
// old static character. image_gen supplies only the empty sky for that rectangle.
const original = ffmpeg(['-i', 'public/images/silhouettes/city.webp', '-f', 'rawvideo', '-pix_fmt', 'rgba', 'pipe:1'])
const cleaned = ffmpeg(['-i', `${source}/clean-sky.png`, '-vf', 'scale=480:480:flags=lanczos', '-f', 'rawvideo', '-pix_fmt', 'rgba', 'pipe:1'])
for (let y = 190; y < 294; y++) for (let x = 226; x < 288; x++) {
  const index = (y * 480 + x) * 4
  const weight = Math.min(1, (x - 226) / 4, (287 - x) / 4, (y - 190) / 4)
  for (let channel = 0; channel < 3; channel++) original[index + channel] = Math.round(original[index + channel] * (1 - weight) + cleaned[index + channel] * weight)
}
ffmpeg(['-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', '480x480', '-i', 'pipe:0', '-frames:v', '1', `${source}/background.png`], { input: original })
writeFileSync(`${source}/animation.json`, JSON.stringify(manifest, null, 2))

run('/usr/bin/swift', ['-module-cache-path', '/tmp/jeffreyz-swift-cache', 'scripts/render-city-character.swift', source], { stdio: 'inherit' })
ffmpeg(['-framerate', String(manifest.fps), '-i', `${source}/rendered/%03d.png`, '-vf', 'split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4', '-loop', '0', `${source}/city-character-loop.gif`])
run('gif2webp', ['-quiet', '-lossy', '-q', '82', '-m', '5', `${source}/city-character-loop.gif`, '-o', 'public/images/silhouettes/city-character/loop.webp'])
run('cwebp', ['-quiet', '-q', '90', `${source}/rendered/000.png`, '-o', 'public/images/silhouettes/city-character/poster.webp'])
console.log('Built a nine-second city loop from 20 image_gen character poses.')
