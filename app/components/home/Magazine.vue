<script setup lang="ts">
import { gsap } from 'gsap'
const active = ref(0)
const magazines = [
  { title: 'FREEDOM', image: '/images/magazine/freedom.webp', tone: 'blue' },
  { title: 'CURIOSITY', image: '/images/magazine/freedom.webp', tone: 'cream' },
  { title: 'IMPACT', image: '/images/magazine/freedom.webp', tone: 'dark' },
  { title: 'PROGRESS', image: '/images/magazine/freedom.webp', tone: 'blue' },
]
const carousel = ref<HTMLElement>()
const cardStyle = (index: number) => {
  const offset = (index - active.value + magazines.length) % magazines.length
  const normalized = offset === magazines.length - 1 ? -1 : offset
  return { '--offset': normalized, zIndex: normalized === 0 ? 10 : 8 - Math.abs(normalized), opacity: normalized === 0 ? 1 : .48, pointerEvents: normalized === 0 ? 'auto' : 'none' }
}
let startX = 0
const go = (direction: number) => {
  active.value = (active.value + direction + magazines.length) % magazines.length
  if (carousel.value) gsap.fromTo(carousel.value, { x: direction * 24, opacity: .55 }, { x: 0, opacity: 1, duration: .55, ease: 'power3.out' })
}
const pointerDown = (event: PointerEvent) => { startX = event.clientX }
const pointerUp = (event: PointerEvent) => { const delta = event.clientX - startX; if (Math.abs(delta) > 35) go(delta < 0 ? 1 : -1) }
</script>

<template>
  <section id="why" class="why-section">
    <div class="why-copy">
      <p class="why-label">05 <span>/</span> Why I do what I do</p>
      <h2>Why I do<br>what I do<span>.</span></h2>
      <p>I’m drawn to digital work because it gives me freedom — a place where technology, aesthetics and ideas can collide. It’s an endless sandbox of creativity: a space to build, explore and shape things that move people forward. Whether it becomes software, media, AI or design, I love turning curiosity into real work.</p>
      <svg class="doodle" viewBox="0 0 240 300" aria-label="Hand drawn person doodle"><path d="M105 42c-12-17 4-34 22-27 16-16 40-3 34 17 20 8 10 31-5 31-3 24-35 28-48 6-11-4-11-20-3-27Z"/><circle cx="132" cy="48" r="19"/><circle cx="125" cy="45" r="2" fill="currentColor"/><circle cx="139" cy="45" r="2" fill="currentColor"/><path d="M126 55q8 7 15-1M106 78c-11 18-18 44-19 76m65-75c8 18 15 43 15 75M87 101c-18 10-34 17-49 12m113-11c17 10 32 15 48 8M94 157c-5 29-8 57-7 86m71-87c3 29 8 57 9 87M87 243c-17 11-31 14-48 10m129-7c18 7 34 8 50 0" fill="none" stroke-width="4" stroke-linecap="round"/><path d="M36 102l-14-9m18 1-8-16m149 13 12-9m-17 3 7-16" stroke="#0c47ff" stroke-width="4" stroke-linecap="round"/></svg>
    </div>
    <div class="magazine-side">
      <div ref="carousel" class="magazine-carousel" @pointerdown="pointerDown" @pointerup="pointerUp">
        <div v-for="(magazine, index) in magazines" :key="magazine.title" class="magazine-card" :class="[magazine.tone, { active: index === active }]" :style="cardStyle(index)"><img :src="magazine.image" :alt="`${magazine.title} magazine cover`" loading="lazy"/></div>
      </div>
      <div class="carousel-controls"><button type="button" aria-label="Previous magazine" @click="go(-1)">‹</button><div class="dots"><button v-for="(_, index) in magazines" :key="index" type="button" :class="{ active: index === active }" :aria-label="`Show magazine ${index + 1}`" @click="active = index" /></div><button type="button" aria-label="Next magazine" @click="go(1)">›</button></div>
    </div>
  </section>
</template>

<style scoped>
.why-section{display:grid;grid-template-columns:36% 64%;gap:4%;padding:80px 4.5% 72px;background:#fff;color:#080909;overflow:hidden}.why-copy{padding:30px 0 0 4%;max-width:450px}.why-label{font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#17191e;margin:0 0 48px;font-weight:600}.why-label span{margin:0 10px;color:#8791a0}.why-copy h2{font-family:'Playfair Display',Georgia,serif;font-weight:500;font-size:clamp(47px,5.5vw,85px);line-height:.95;letter-spacing:-.07em;margin:0 0 30px;white-space:nowrap}.why-copy h2 span{color:#1550ff}.why-copy>p:not(.why-label){font-size:clamp(14px,1.3vw,19px);line-height:1.47;color:#606977;letter-spacing:-.02em;max-width:410px}.doodle{display:block;width:min(70%,230px);height:auto;margin:12px 0 0 6%;color:#101215}.magazine-side{min-width:0;padding-top:4px}.magazine-carousel{position:relative;height:680px;min-height:60vw;max-height:770px;touch-action:pan-y;user-select:none}.magazine-card{position:absolute;top:0;right:13%;width:68%;height:100%;border-radius:10px;overflow:hidden;box-shadow:0 12px 28px #18233b25;transform:translateX(calc(var(--index) * 13%)) translateY(calc(var(--index) * 6%)) rotate(calc(var(--index) * 2deg));opacity:calc(1 - (abs(var(--index)) * .2));transition:transform .6s ease,opacity .6s ease,z-index .6s}.magazine-card:nth-child(1){z-index:5}.magazine-card:nth-child(2){z-index:4}.magazine-card:nth-child(3){z-index:3}.magazine-card:nth-child(4){z-index:2}.magazine-card:not(.active){filter:saturate(.68) brightness(.98)}.magazine-card img{width:100%;height:100%;object-fit:cover}.cover-overlay{position:absolute;inset:0;padding:7% 6%;display:flex;flex-direction:column;color:#fff;background:linear-gradient(180deg,#0846d450,transparent 40%,#0004)}.cream .cover-overlay{color:#090909;background:linear-gradient(180deg,#fff4,transparent 45%)}.dark .cover-overlay{background:linear-gradient(180deg,#0008,transparent 60%)}.cover-title{font-size:clamp(32px,5.5vw,94px);font-weight:800;letter-spacing:-.06em;line-height:.8}.cover-sub{position:absolute;right:7%;top:9%;font-size:9px;line-height:1.4;letter-spacing:.23em}.cover-bottom{position:absolute;left:6%;bottom:8%;font-size:clamp(14px,2vw,33px);font-weight:800;line-height:.85;letter-spacing:-.03em}.carousel-controls{display:flex;align-items:center;justify-content:center;gap:22px;margin-top:18px}.carousel-controls>button{width:48px;height:48px;border:0;border-radius:50%;background:#f1f2f3;font-size:30px;line-height:1;transition:background .2s,transform .2s}.carousel-controls>button:hover{background:#dce5ff;transform:scale(1.08)}.dots{display:flex;gap:10px;align-items:center}.dots button{width:8px;height:8px;border:0;padding:0;border-radius:50%;background:#d4d6da}.dots button.active{background:#101114}.carousel-controls button:focus-visible{outline:2px solid #0647ff;outline-offset:3px}
@media(min-width:1700px){.why-section{padding-left:5.5%;padding-right:5.5%}.magazine-carousel{height:760px}}
@media(min-width:701px) and (max-width:1050px){.why-section{padding:55px 3.5%;gap:3%;grid-template-columns:38% 62%}.why-copy{padding-left:2%}.why-label{font-size:8px;margin-bottom:33px}.why-copy h2{font-size:5.2vw}.why-copy>p:not(.why-label){font-size:13px}.doodle{width:65%;margin-top:5px}.magazine-carousel{height:500px}.cover-title{font-size:6.7vw}.cover-sub{font-size:7px}.cover-bottom{font-size:2.5vw}.carousel-controls{margin-top:12px}}
@media(max-width:700px){.why-section{display:flex;flex-direction:column;padding:58px 8% 48px;gap:24px}.why-copy{padding:0;max-width:none}.why-label{font-size:8px;margin-bottom:30px}.why-copy h2{font-size:clamp(50px,12vw,70px);margin-bottom:23px}.why-copy>p:not(.why-label){font-size:15px;line-height:1.5;max-width:500px}.doodle{width:170px;margin:9px 0 0 5%}.magazine-side{padding:0}.magazine-carousel{height:480px;min-height:0}.magazine-card{right:16%;width:72%;}.cover-title{font-size:12vw}.cover-sub{font-size:7px}.cover-bottom{font-size:4.8vw}.carousel-controls{margin-top:10px;gap:18px}.carousel-controls>button{width:42px;height:42px}}
</style>
