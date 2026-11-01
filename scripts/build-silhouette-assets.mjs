import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Generated originals and their exact image_gen prompts live in output/imagegen/silhouettes.
// FFmpeg only crops, resizes and assembles the generated artwork into looping GIFs.
const source = resolve('output/imagegen/silhouettes')
const destination = resolve('public/images/silhouettes')
const intermediates = resolve('output/imagegen/silhouettes/loops')
mkdirSync(destination, { recursive: true })
mkdirSync(intermediates, { recursive: true })

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(result.stderr || 'FFmpeg failed')
}

const palette = ',split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4'
const walkCrop = "crop=396:496:'floor(mod(n,4)*iw/4)':'floor(mod(floor(n/4),2)*ih/2)',scale=320:400:flags=lanczos"
ffmpeg(['-i', `${source}/walk-sprites.png`, '-vf', 'crop=396:496:0:0,scale=320:400', '-frames:v', '1', `${intermediates}/walk.png`])
ffmpeg(['-loop', '1', '-framerate', '8', '-t', '1', '-i', `${source}/walk-sprites.png`, '-vf', walkCrop + palette, '-frames:v', '8', '-loop', '0', `${intermediates}/walk.gif`])

const scenes = [
  ['code', 'code-hair-v3.png', 724, 0],
  ['ai', 'code-ai-city.png', 724, 724],
  ['city', 'code-ai-city.png', 724, 1448],
  ['music', 'music-design-experiment-ideas-hair-v3.png', 543, 0],
  ['design', 'music-design-experiment-ideas-hair-v3.png', 543, 543],
  ['experiment', 'music-design-experiment-ideas-hair-v3.png', 543, 1086],
  ['ideas', 'music-design-experiment-ideas-hair-v3.png', 543, 1629],
]

for (const [name, file, width, left] of scenes) {
  const crop = `crop=${width}:724:${left}:0`
  ffmpeg(['-i', `${source}/${file}`, '-vf', `${crop},scale=480:-2:flags=lanczos`, '-frames:v', '1', `${intermediates}/${name}.png`])
  // A slow, perfectly periodic camera drift. Character gait is animated only in walk.gif.
  const motion = `${crop},scale=600:800:force_original_aspect_ratio=increase,crop=600:800,zoompan=z='1.04+0.018*sin(on*2*PI/36)':x='iw/2-iw/zoom/2+4*sin(on*2*PI/36)':y='ih/2-ih/zoom/2':d=36:s=360x480:fps=9`
  ffmpeg(['-i', `${source}/${file}`, '-vf', motion + palette, '-frames:v', '36', '-loop', '0', `${intermediates}/${name}.gif`])
}

for (const name of ['walk', ...scenes.map(scene => scene[0])]) {
  for (const [command, args] of [
    ['cwebp', ['-quiet', '-q', '82', `${intermediates}/${name}.png`, '-o', `${destination}/${name}.webp`]],
    ['gif2webp', ['-quiet', '-lossy', '-q', '72', '-m', '4', `${intermediates}/${name}.gif`, '-o', `${destination}/${name}-motion.webp`]],
  ]) {
    const result = spawnSync(command, args, { encoding: 'utf8' })
    if (result.status !== 0) throw new Error(result.stderr || `${command} failed`)
  }
}
console.log('Created eight GIF loops, eight optimized animated WebPs and eight static WebP posters.')
