<script setup lang="ts">
const props = defineProps<{ paused?: boolean; alt: string }>()
const host = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const creatures = [
  { name: 'lime', duration: 32, offset: 2, width: 190, direction: 1, contact: .86, hide: [.32, .36, .43, .47] },
  { name: 'pink', duration: 38, offset: 15, width: 170, direction: -1, contact: .84, hide: [.79, .83, .89, .93] },
  { name: 'cyan', duration: 42, offset: 29, width: 180, direction: 1, contact: .90, hide: [.56, .60, .68, .72] },
]

// An unbroken walking surface: straight edges joined by rounded corners.
// Its tangent also gives the inward-facing normal where the paws touch the frame.
const corner = 48
const straight = 888
const arc = Math.PI * corner / 2
const route = [
  { x: 56, y: 8, angle: 0, length: straight, radius: 0 },
  { x: 944, y: 56, angle: -Math.PI / 2, length: arc, radius: corner },
  { x: 992, y: 56, angle: Math.PI / 2, length: straight, radius: 0 },
  { x: 944, y: 944, angle: 0, length: arc, radius: corner },
  { x: 944, y: 992, angle: Math.PI, length: straight, radius: 0 },
  { x: 56, y: 944, angle: Math.PI / 2, length: arc, radius: corner },
  { x: 8, y: 944, angle: -Math.PI / 2, length: straight, radius: 0 },
  { x: 56, y: 56, angle: Math.PI, length: arc, radius: corner },
]
const perimeter = 4 * (straight + arc)
function framePosition(progress: number) {
  let distance = progress * perimeter
  for (const segment of route) {
    if (distance <= segment.length) {
      if (segment.radius) {
        const angle = segment.angle + distance / segment.radius
        return { x: segment.x + Math.cos(angle) * segment.radius, y: segment.y + Math.sin(angle) * segment.radius, angle: angle + Math.PI / 2 }
      }
      return { x: segment.x + Math.cos(segment.angle) * distance, y: segment.y + Math.sin(segment.angle) * distance, angle: segment.angle }
    }
    distance -= segment.length
  }
  return { x: 56, y: 8, angle: 0 }
}
const smooth = (value: number) => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t) }
function behindDepth(progress: number, hide: number[]) {
  const [enter, hidden, emerge, exit] = hide as [number, number, number, number]
  if (progress < enter || progress > exit) return 0
  return smooth((progress - enter) / (hidden - enter)) * (1 - smooth((progress - emerge) / (exit - emerge)))
}

let images: HTMLImageElement[] = []
let frame = 0
let elapsed = 0
let lastTime = 0
let visible = false
let disposed = false
let observer: IntersectionObserver | undefined
let resizeObserver: ResizeObserver | undefined

function paint() {
  const element = canvas.value
  const ctx = element?.getContext('2d')
  if (!ctx || !element || images.length !== 3) return
  const pixels = Math.round(element.getBoundingClientRect().width * Math.min(window.devicePixelRatio || 1, 2))
  if (element.width !== pixels) element.width = element.height = pixels
  ctx.setTransform(element.width / 1240, 0, 0, element.height / 1240, 0, 0)
  ctx.clearRect(0, 0, 1240, 1240)
  ctx.translate(120, 120)
  ctx.save()
  // Reserve the entire oval for the portrait, at every point in every loop.
  ctx.beginPath()
  ctx.rect(-120, -120, 1240, 1240)
  ctx.moveTo(878, 513)
  ctx.ellipse(500, 513, 378, 387, 0, 0, Math.PI * 2)
  ctx.clip('evenodd')
  for (const [index, creature] of creatures.entries()) {
    const phase = (((elapsed + creature.offset) / creature.duration * creature.direction) % 1 + 1) % 1
    const pose = framePosition(phase)
    const depth = behindDepth(phase, creature.hide)
    ctx.save()
    if (depth > 0) {
      // Only their exposed heads/tails show as they crawl behind the solid frame.
      ctx.beginPath()
      ctx.rect(-120, -120, 1240, 1240)
      ctx.rect(4, 4, 992, 992)
      ctx.clip('evenodd')
    }
    // Tuck in under the outside edge, then re-emerge along that same edge.
    ctx.translate(pose.x - Math.sin(pose.angle) * depth * 190, pose.y + Math.cos(pose.angle) * depth * 190)
    ctx.rotate(pose.angle)
    ctx.scale(creature.direction, 1)
    const sprite = Math.floor((elapsed + creature.offset) * 7) % 6
    const height = creature.width * 144 / 192
    // Anchor the feet to the surface, rather than moving the creature's centre
    // along the edge. The body always stays on the outside of the frame.
    ctx.drawImage(images[index]!, sprite * 192, 0, 192, 144, -creature.width / 2, -height * creature.contact, creature.width, height)
    ctx.restore()
  }
  ctx.restore()
}
function tick(now: number) {
  frame = 0
  if (lastTime) elapsed += Math.min((now - lastTime) / 1000, .1)
  lastTime = now
  paint()
  if (visible && !props.paused && !document.hidden) frame = requestAnimationFrame(tick)
}
function sync() {
  cancelAnimationFrame(frame)
  frame = 0
  lastTime = 0
  if (!images.length || disposed) return
  paint()
  if (visible && !props.paused && !document.hidden) frame = requestAnimationFrame(tick)
}
watch(() => props.paused, sync)
onMounted(async () => {
  observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; sync() })
  if (host.value) observer.observe(host.value)
  resizeObserver = new ResizeObserver(() => paint())
  if (host.value) resizeObserver.observe(host.value)
  document.addEventListener('visibilitychange', sync)
  const loaded = await Promise.all(creatures.map(creature => new Promise<HTMLImageElement | null>(resolve => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = `/images/portrait-creatures/${creature.name}.png`
  })))
  if (disposed || loaded.some(image => !image)) return
  images = loaded as HTMLImageElement[]
  sync()
})
onBeforeUnmount(() => {
  disposed = true
  cancelAnimationFrame(frame)
  observer?.disconnect()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', sync)
})
</script>

<template>
  <div ref="host" class="portrait-scene">
    <img class="portrait-photo" src="/images/jz2.webp" :alt="alt" width="649" height="649">
    <canvas ref="canvas" class="portrait-creatures" aria-hidden="true" />
  </div>
</template>

<style scoped>
.portrait-scene{position:relative;isolation:isolate;width:100%;aspect-ratio:1}
.portrait-photo{display:block;width:100%;height:100%;object-fit:contain}
.portrait-creatures{position:absolute;inset:-12%;width:124%;height:124%;pointer-events:none}
@media(max-width:500px){.portrait-scene{width:calc(100% - 20px);margin-inline:10px}}
</style>
