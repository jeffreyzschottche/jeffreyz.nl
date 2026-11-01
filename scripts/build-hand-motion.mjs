import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const root = 'output/imagegen/hand-motion-v2'
const configs = {
  ideas: { height: 640, channel: 0, regions: [[155, 280, 281, 375]], seeds: [[265, 347]], speed: 5 },
  design: { height: 640, channel: 2, regions: [[142, 204, 265, 295]], seeds: [[200, 265], [250, 265]], order: [0, 1, 2, 3, 7, 6, 1, 0], speed: 4 },
  music: { height: 640, channel: 2, regions: [[110, 271, 300, 320], [188, 305, 322, 362]], seeds: [[288, 300], [302, 344]], speed: 4, graphic: { type: 'pulse', box: [66, 136, 196, 268], center: [48, 205] } },
  experiment: { height: 640, channel: 0, regions: [[242, 252, 389, 349]], seeds: [[260, 325]], speed: 3, graphic: { type: 'rotate', box: [299, 138, 405, 258], center: [352, 197] } },
  ai: { height: 480, channel: 1, regions: [[37, 239, 206, 420]], seeds: [[170, 392]], speed: 3, graphic: { type: 'rotate', box: [8, 62, 250, 260], center: [126, 165] } },
}
function run(command, args, input) {
  const result = spawnSync(command, args, { input, maxBuffer: 64 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(result.stderr?.toString() || `${command} failed`)
  return result.stdout
}
const ffmpeg = (args, input) => run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], input)
const dimensions = file => run('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file]).toString().trim().split(',').map(Number)
function read(file, size) { return ffmpeg(['-i', file, ...(size ? ['-vf', `scale=${size[0]}:${size[1]}:flags=lanczos`] : []), '-f', 'rawvideo', '-pix_fmt', 'rgba', 'pipe:1']) }
function png(pixels, width, height, file) { ffmpeg(['-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${width}x${height}`, '-i', 'pipe:0', '-frames:v', '1', file], pixels) }
const clamp = n => Math.max(0, Math.min(1, n))
function bounds(pixels, stride, left, top, width, height) {
  let x0 = width, x1 = 0, y0 = height, y1 = 0
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = ((top + y) * stride + left + x) * 4
    if (pixels[i] < 55 && pixels[i + 1] < 55 && pixels[i + 2] < 55) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y)
    }
  }
  return { x: x0, y: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 }
}
function sample(pixels, stride, x, y, channel) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy
  let value = 0
  for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) {
    const i = ((iy + dy) * stride + ix + dx) * 4 + channel
    value += (pixels[i] ?? 255) * (dx ? fx : 1 - fx) * (dy ? fy : 1 - fy)
  }
  return value
}
function limbComponents(matte, width, height, seeds) {
  const labels = new Int32Array(width * height)
  const components = []
  let nextLabel = 0
  for (let i = 0; i < matte.length; i++) {
    if (matte[i] < .45 || labels[i]) continue
    const label = ++nextLabel, queue = [i], distances = seeds.map(() => Infinity)
    labels[i] = label
    for (let j = 0; j < queue.length; j++) {
      const p = queue[j], x = p % width, y = Math.floor(p / width)
      seeds.forEach(([sx, sy], k) => { distances[k] = Math.min(distances[k], (x - sx) ** 2 + (y - sy) ** 2) })
      for (const n of [p - 1, p + 1, p - width, p + width]) {
        if (n < 0 || n >= matte.length || labels[n] || matte[n] < .45) continue
        if (Math.abs(n % width - x) > 1) continue
        labels[n] = label; queue.push(n)
      }
    }
    if (queue.length >= 16) components.push({ label, distances })
  }
  const keep = new Set(seeds.map((_, k) => components.reduce((best, c) => !best || c.distances[k] < best.distances[k] ? c : best, null)?.label))
  return (x, y) => {
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const label = labels[(y + dy) * width + x + dx]
      if (label && keep.has(label)) return true
    }
    return false
  }
}
for (const [scene, config] of Object.entries(configs)) {
  if (process.argv.slice(2).some(arg => !arg.startsWith('--')) && !process.argv.includes(scene)) continue
  const source = `${root}/${scene}`
  const target = `public/images/silhouettes/hand-motion/${scene}`
  for (const dir of [`${source}/keyframes`, `${source}/flow`, `${source}/rendered`, target]) mkdirSync(dir, { recursive: true })
  const width = 480, height = config.height
  const original = read(`output/imagegen/silhouettes/loops/${scene}.png`)
  const clean = read(`${source}/clean.png`, [width, height])
  const [atlasWidth, atlasHeight] = dimensions(`${source}/atlas.png`)
  const atlas = read(`${source}/atlas.png`)
  const referenceBounds = bounds(original, width, 0, 0, width, height)
  const backgroundRows = []
  for (let y = 0; y < height; y++) {
    const channels = [[], [], []]
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (original[i + config.channel] > 150 && Math.min(original[i], original[i + 1], original[i + 2]) < 180) {
        for (let c = 0; c < 3; c++) channels[c].push(original[i + c])
      }
    }
    backgroundRows.push(channels.map(values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)] ?? 255))
  }
  const regionWeight = (x, y) => {
    let weight = 0
    for (const [x0, y0, x1, y1] of config.regions) {
      if (x >= x0 && x < x1 && y >= y0 && y < y1) weight = Math.max(weight, clamp(Math.min(x - x0, x1 - x - 1, y - y0, y1 - y - 1) / 5))
    }
    // This bottom node belongs to the static network, just above the hand.
    if (scene === 'ai' && x > 80 && x < 124 && y < 255) return 0
    if (scene === 'ideas' && x > 240 && y < 315) return 0
    if (scene === 'music' && x < 208 && y > 286 + (x - 40) * .23 && y < 320) return 0
    if (scene === 'music' && x < 241 && y > 342) return 0
    return weight
  }
  function animateGraphic(pixels, phase) {
    const graphic = config.graphic
    if (!graphic) return
    const [x0, y0, x1, y1] = graphic.box, [cx, cy] = graphic.center
    const sourceContains = (x, y) => {
      if (x < x0 + 3 || x >= x1 - 3 || y < y0 + 3 || y >= y1 - 3) return false
      if (scene === 'ai') return y < 242 || (x > 80 && x < 124 && y < 254)
      return y < 251
    }
    if (graphic.type === 'pulse') {
      for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * width + x) * 4, bg = backgroundRows[y]
        if (original[i + config.channel] >= bg[config.channel] - 4) continue
        const radius = Math.hypot(x - cx, y - cy)
        const strength = .4 + .6 * (.5 + .5 * Math.sin(phase * Math.PI * 2 - radius * .075))
        for (let c = 0; c < 3; c++) pixels[i + c] = Math.round(bg[c] * (1 - strength) + original[i + c] * strength)
      }
      return
    }
    // Keep the original hologram moving as a rigid object, separately from the
    // generated hand poses. No deformation of the person or their fingers.
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      if (!sourceContains(x, y)) continue
      const i = (y * width + x) * 4, bg = backgroundRows[y]
      if (original[i + config.channel] < bg[config.channel] - 2) for (let c = 0; c < 3; c++) pixels[i + c] = bg[c]
    }
    const angle = Math.sin(phase * Math.PI * 2) * .045
    const bob = Math.sin(phase * Math.PI * 2) * 1.5
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const dx = x - cx, dy = y - cy - bob
      const sx = cx + Math.cos(angle) * dx + Math.sin(angle) * dy
      const sy = cy - Math.sin(angle) * dx + Math.cos(angle) * dy
      if (!sourceContains(sx, sy)) continue
      const bg = backgroundRows[Math.round(sy)]
      const color = sample(original, width, sx, sy, config.channel)
      const alpha = clamp((bg[config.channel] - color - 3) / (bg[config.channel] - 8))
      if (!alpha) continue
      const i = (y * width + x) * 4
      for (let c = 0; c < 3; c++) pixels[i + c] = Math.round(pixels[i + c] * (1 - alpha) + 5 * alpha)
    }
  }
  const normalized = []
  for (let pose = 0; pose < 8; pose++) {
    const inputPose = config.order?.[pose] ?? pose
    const left = Math.floor(inputPose % 4 * atlasWidth / 4), top = Math.floor(Math.floor(inputPose / 4) * atlasHeight / 2)
    const cellWidth = Math.floor((inputPose % 4 + 1) * atlasWidth / 4) - left
    const cellHeight = Math.floor((Math.floor(inputPose / 4) + 1) * atlasHeight / 2) - top
    const box = bounds(atlas, atlasWidth, left, top, cellWidth, cellHeight)
    const sx = referenceBounds.width / box.width, sy = referenceBounds.height / box.height
    const pixels = Buffer.from(original)
    const matte = new Float32Array(width * height)
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      if (!regionWeight(x, y)) continue
      const dx = scene === 'music' ? (y < 314 ? -10 : -12) : 0
      const dy = scene === 'music' && y < 314 ? 12 : 0
      const gx = left + box.x + (x - dx - referenceBounds.x) / sx
      const gy = top + box.y + (y - dy - referenceBounds.y) / sy
      const generated = sample(atlas, atlasWidth, gx, gy, config.channel)
      const bg = backgroundRows[y][config.channel]
      let alpha = clamp((bg - generated - 10) / (bg - 15))
      if (alpha < .2 && [0, 1, 2].every(c => sample(atlas, atlasWidth, gx, gy, c) > 180)) {
        // The generated earbud wire can bisect the sleeve. Fill that narrow
        // interior gap, then put the unchanged original white cable on top.
        const darkLeft = sample(atlas, atlasWidth, gx - 2, gy, config.channel) < 75
        const darkRight = sample(atlas, atlasWidth, gx + 2, gy, config.channel) < 75
        if (darkLeft && darkRight) alpha = 1
      }
      matte[y * width + x] = alpha
    }
    const isLimb = limbComponents(matte, width, height, config.seeds)
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const weight = regionWeight(x, y)
      if (!weight) continue
      const i = (y * width + x) * 4
      const bg = backgroundRows[y]
      const alpha = isLimb(x, y) ? matte[y * width + x] : 0
      const cleanAlpha = clamp((bg[config.channel] - clean[i + config.channel] - 10) / (bg[config.channel] - 15))
      // Remove the old arm using the generated clean plate; retain original props.
      const remove = cleanAlpha < .5 ? 1 : 0
      for (let c = 0; c < 3; c++) {
        const cleared = original[i + c] * (1 - remove) + bg[c] * remove
        const result = cleared * (1 - alpha) + 5 * alpha
        pixels[i + c] = Math.round(original[i + c] * (1 - weight) + result * weight)
      }
      // Preserve the real earbud cable wherever it crosses a sleeve.
      if (original[i] > 190 && original[i + 1] > 190 && original[i + 2] > 190) original.copy(pixels, i, i, i + 4)
    }
    normalized.push({ pose, inputPose, bounds: box, sx, sy })
    png(pixels, width, height, `${source}/keyframes/${String(pose).padStart(2, '0')}.png`)
  }
  writeFileSync(`${source}/registration.json`, JSON.stringify({ referenceBounds, poses: normalized, regions: config.regions }, null, 2))
  console.log(`${scene}: eight generated hand poses composited into the original.`)
  if (process.argv.includes('--keyframes')) continue
  const fps = 24
  const frames = Math.round(8 / config.speed * fps)
  ffmpeg(['-framerate', String(config.speed), '-stream_loop', '-1', '-i', `${source}/keyframes/%02d.png`, '-vf', `format=yuv444p,minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=none,setpts=PTS-STARTPTS`, '-frames:v', String(frames), `${source}/flow/%03d.png`])
  const files = []
  for (let frame = 0; frame < frames; frame++) {
    const pixels = Buffer.from(original)
    animateGraphic(pixels, frame / frames)
    const flow = read(`${source}/flow/${String(frame + 1).padStart(3, '0')}.png`)
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      if (regionWeight(x, y) <= 0) continue
      const i = (y * width + x) * 4
      flow.copy(pixels, i, i, i + 4)
    }
    const file = `${source}/rendered/${String(frame).padStart(3, '0')}.png`
    png(pixels, width, height, file)
    files.push(file)
  }
  run('img2webp', ['-loop', '0', '-lossless', '-m', '4', ...files.flatMap(file => ['-d', '42', file]), '-o', `${target}/loop.webp`])
  run('cwebp', ['-quiet', '-q', '90', files[0], '-o', `${target}/poster.webp`])
  ffmpeg(['-framerate', String(fps), '-i', `${source}/rendered/%03d.png`, '-frames:v', String(frames), '-vf', 'split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=4', '-loop', '0', `${target}/loop.gif`])
  writeFileSync(`${source}/animation.json`, JSON.stringify({ width, height, poses: 8, fps, frames, duration: frames * .042, regions: config.regions, graphic: config.graphic }, null, 2))
  console.log(`${scene}: encoded ${frames} frames; original figure and setting preserved.`)
}
