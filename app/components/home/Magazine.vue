<script setup lang="ts">
import type { CSSProperties } from 'vue'

const { t } = useI18n()
const active = ref(0)
const magazines = [
  { title: 'Poster 1', image: '/images/magazine/poster1.jpg' },
  { title: 'Poster 2', image: '/images/magazine/poster2.jpg' },
  { title: 'Poster 3', image: '/images/magazine/poster3.jpg' },
  { title: 'Poster 4', image: '/images/magazine/poster4.jpg' },
  { title: 'Poster 5', image: '/images/magazine/poster5.jpg' },
  { title: 'Poster 6', image: '/images/magazine/poster6.jpg' },
  { title: 'Poster 7', image: '/images/magazine/poster7.jpg' },
]
const cardStyle = (index: number): CSSProperties => {
  const offset = (index - active.value + magazines.length) % magazines.length
  return {
    transform: `translateX(${offset * 17}%) scale(${1 - offset * .045}) rotateY(${-offset * 10}deg)`,
    zIndex: magazines.length - offset,
    opacity: offset < 7 ? 1 : 0,
    pointerEvents: offset === 0 ? 'auto' : 'none',
  }
}
const go = (direction: number) => {
  active.value = (active.value + direction + magazines.length) % magazines.length
}
let pointerStart: { id: number; x: number; y: number } | undefined
const pointerDown = (event: PointerEvent) => {
  if (!event.isPrimary || event.button !== 0) return
  pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY }
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}
const pointerUp = (event: PointerEvent) => {
  if (!pointerStart || event.pointerId !== pointerStart.id) return
  const dx = event.clientX - pointerStart.x
  const dy = event.clientY - pointerStart.y
  if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  pointerStart = undefined
}
</script>

<template>
  <section id="why" class="why-section" aria-labelledby="why-title">
    <div class="why-copy">
      <p class="why-label">04 <span>/</span> {{ t('why.label') }}</p>
      <h2 id="why-title">{{ t('why.title') }}<br>{{ t('why.titleLine2') }}</h2>
      <p>{{ t('why.story') }}</p>
      <HomeDoodleAnimation class="why-doodle" />
    </div>
    <div class="magazine-side" role="region" aria-roledescription="carousel" aria-label="What drives me" tabindex="0" @keydown.left.prevent="go(-1)" @keydown.right.prevent="go(1)">
      <div class="magazine-carousel" @pointerdown="pointerDown" @pointerup="pointerUp" @pointercancel="pointerStart = undefined" @lostpointercapture="pointerStart = undefined" @dragstart.prevent>
        <div v-for="(magazine, index) in magazines" :key="magazine.title" class="magazine-card" :class="{ active: index === active }" :style="cardStyle(index)" role="group" aria-roledescription="slide" :aria-label="`${index + 1} of ${magazines.length}: ${magazine.title}`" :aria-hidden="index !== active">
          <img :src="magazine.image" :alt="`${magazine.title} magazine cover`" width="1080" height="1440" loading="lazy" draggable="false">
        </div>
      </div>
      <div class="carousel-controls">
        <button type="button" class="nav-btn" aria-label="Previous magazine" @click="go(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="dots">
          <button v-for="(magazine, index) in magazines" :key="magazine.title" type="button" :class="{ active: index === active }" :aria-label="`Show ${magazine.title}`" :aria-current="index === active ? 'true' : undefined" @click="active = index"><span /></button>
        </div>
        <button type="button" class="nav-btn" aria-label="Next magazine" @click="go(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <p class="sr-only" aria-live="polite" aria-atomic="true">{{ magazines[active]?.title }} — {{ active + 1 }} of {{ magazines.length }}</p>
    </div>
  </section>
</template>

<style scoped>
.why-section{display:grid;grid-template-columns:minmax(0,.32fr) minmax(0,.68fr);align-items:center;gap:clamp(24px,3vw,48px);max-width:1560px;margin-inline:auto;padding:clamp(64px,7vw,112px) 3.3%;background:#fff;color:#080909;overflow:clip}
.why-copy{min-width:0;padding:12px 0 0;max-width:440px}
.why-label{font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:#2453ff;margin:0 0 34px;font-weight:700}
.why-label span{margin:0 9px}
.why-copy h2{font-weight:700;font-size:clamp(48px,6vw,96px);line-height:.99;letter-spacing:-.05em;margin:0 0 26px}
.why-copy>p:not(.why-label){font-size:18px;line-height:1.5;color:#454453;letter-spacing:-.02em;margin:0;max-width:410px}
.why-copy :deep(.why-doodle){width:68%;max-width:250px;margin:12px auto 0}
.magazine-side{position:relative;z-index:0;min-width:0;outline-offset:6px}
.magazine-carousel{position:relative;width:100%;aspect-ratio:1.2;touch-action:pan-y;user-select:none;perspective:1600px;cursor:grab}
.magazine-carousel:active{cursor:grabbing}
.magazine-card{position:absolute;inset:0 auto auto 0;width:54%;aspect-ratio:3 / 4;border:1px solid rgba(255,255,255,.9);border-radius:11px;overflow:hidden;background:#f6f5f0;box-shadow:0 12px 26px -10px rgb(0 0 0 / 24%);transition:transform .55s cubic-bezier(.22,.68,0,1),opacity .35s;transform-origin:center center;backface-visibility:hidden}
.magazine-card.active{box-shadow:0 14px 30px -12px rgb(0 0 0 / 28%)}
.magazine-card img{width:100%;height:100%;object-fit:contain}
.carousel-controls{position:relative;z-index:10;display:flex;align-items:center;justify-content:center;gap:22px;margin-top:-40px;width:100%}
.nav-btn{display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:#f0f0f0;color:#111;transition:background .2s}
.nav-btn:hover{background:#e2e2e2}
.nav-btn svg{width:18px;height:18px;stroke:currentColor;stroke-width:1.5;fill:none}
.dots{display:flex;align-items:center}
.dots button{display:grid;place-items:center;width:20px;height:44px;border:0;padding:0;background:transparent}
.dots span{width:7px;height:7px;border-radius:50%;background:#d1d1d1;transition:background .2s,transform .2s}
.dots button.active span{background:#0647ff;transform:scale(1.1)}
.carousel-controls button:focus-visible,.magazine-side:focus-visible{outline:2px solid #0647ff;outline-offset:3px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(min-width:701px) and (max-width:1050px){.why-section{gap:24px;grid-template-columns:minmax(0,.33fr) minmax(0,.67fr);padding-inline:4%}.why-label{font-size:8px;letter-spacing:.25em;margin-bottom:24px}.why-copy h2{font-size:6vw;margin-bottom:20px}.why-copy>p:not(.why-label){font-size:16px}.why-copy :deep(.why-doodle){max-width:180px}.carousel-controls{margin-top:-20px}}
@media(max-width:700px){.why-section{display:flex;flex-direction:column;align-items:stretch;padding:56px 8% 48px;gap:14px;max-width:520px}.why-copy{padding:0;max-width:none}.why-label{font-size:8px;letter-spacing:.25em;margin-bottom:16px}.why-copy h2{font-size:clamp(40px,10vw,64px);margin-bottom:14px}.why-copy>p:not(.why-label){font-size:16px;line-height:1.45;max-width:none}.why-copy :deep(.why-doodle){width:52%;max-width:165px;margin:8px auto 0}.magazine-carousel{aspect-ratio:1.08}.magazine-card{width:72%;border-radius:7px}.carousel-controls{width:100%;margin-top:48px;gap:14px}.nav-btn{width:36px;height:36px}}
@media(prefers-reduced-motion:reduce){.magazine-card,.dots span{transition:none}}
</style>
