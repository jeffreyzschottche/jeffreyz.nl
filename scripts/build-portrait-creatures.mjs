import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const source = 'output/imagegen/portrait-creatures/source.png'
const target = 'public/images/portrait-creatures'
mkdirSync(target, { recursive: true })
function run(command, args) {
  const result = spawnSync(command, args, { maxBuffer: 32 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(result.stderr.toString())
  return result.stdout
}
const [width, height] = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', source]).toString().trim().split(',').map(Number)
// Keep the generated alpha and original poses; only cut and pack the atlas.
for (const [row, name] of ['lime', 'pink', 'cyan'].entries()) {
  const filters = []
  for (let frame = 0; frame < 6; frame++) {
    const x = Math.floor(frame * width / 6)
    const y = Math.floor(row * height / 3)
    const w = Math.floor((frame + 1) * width / 6) - x
    const h = Math.floor((row + 1) * height / 3) - y
    filters.push(`[0:v]crop=${w}:${h}:${x}:${y},scale=192:144:force_original_aspect_ratio=decrease:flags=lanczos,pad=192:144:(ow-iw)/2:(oh-ih)/2:color=black@0,setsar=1[f${frame}]`)
  }
  filters.push(`${Array.from({ length: 6 }, (_, i) => `[f${i}]`).join('')}hstack=inputs=6[out]`)
  run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-filter_complex', filters.join(';'), '-map', '[out]', '-frames:v', '1', `${target}/${name}.png`])
}
console.log('Packed 18 generated poses into three transparent 1152×144 atlases.')
