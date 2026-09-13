<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = ref<HTMLElement>()
const services = [
  { title: 'Automation', kind: 'automation', caption: 'Systems\nthat work\nfor you.' },
  { title: 'Software\ndevelopment', kind: 'software', caption: 'Ideas\ninto scalable\nproducts.' },
  { title: 'AI\nengineering', kind: 'ai', caption: 'Intelligence\ninto\nreal solutions.' },
  { title: 'Music\ncreation', kind: 'music', caption: 'Sound\nas a medium\nto create.' },
  { title: '3D\ncreation', kind: 'three-d', caption: 'Ideas\ninto\nthree dimensions.' },
  { title: 'Writing', kind: 'writing', caption: 'Thoughts\ninto\nclear ideas.' },
  { title: 'Design', kind: 'design', caption: 'Function\nmeets\naesthetics.' },
  { title: 'Strategist', kind: 'strategy', caption: 'Ideas\nplans\ndirection.' },
  { title: 'Product\ncreation', kind: 'product', caption: 'Concepts\ninto\nreality.' },
]
let media: gsap.MatchMedia | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.service-card', { y: 28, autoAlpha: 0, duration: .7, stagger: .07, ease: 'power2.out', scrollTrigger: { trigger: section.value, start: 'top 85%', once: true } })
  }, section.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="about" ref="section" class="services" aria-labelledby="services-heading">
    <div class="intro">
      <div class="section-label"><span>01</span><span class="label-rule" /><span>What I do</span></div>
      <h2 id="services-heading">Building<br>what’s next.</h2>
      <div class="intro-copy"><p>I’m Jeffreyz, a digital builder with a broad range of interests. I work across technology, creativity and strategy to build things that are useful, beautiful and a little unexpected.</p><p>From automation and software to AI, design, music and more — I love turning ideas into real digital experiences.</p></div>
      <a class="intro-cta" href="#contact">Get to know me <span aria-hidden="true">⟶</span></a>
      <HomeSocialLinks />
      <span class="intro-note">Ideas<br>into<br>reality</span>
    </div>
    <div class="services-grid">
      <HomeServiceCard v-for="(service, index) in services" :key="service.kind" :service="service" :index="index" />
    </div>
  </section>
</template>

<style scoped>
.services{display:grid;grid-template-columns:36% 64%;background:#f7f6f2;color:#080909;scroll-margin-top:0}
.intro{padding:clamp(30px,4.6vw,76px) clamp(26px,4.2vw,70px) 24px;display:flex;align-items:flex-start;flex-direction:column}
.section-label{display:flex;align-items:center;gap:15px;font-size:8px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
.label-rule{width:65px;height:1px;background:#a1a19d}
h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(40px,5.25vw,86px);line-height:.98;font-weight:500;letter-spacing:-.065em;margin:clamp(36px,4.7vw,76px) 0 25px;white-space:nowrap}
.intro-copy{max-width:355px;font-size:clamp(12px,1.13vw,18px);line-height:1.43;color:#414240;letter-spacing:-.025em}
.intro-copy p{margin:0 0 18px}
.intro-cta{display:flex;align-items:center;justify-content:space-between;gap:25px;background:#080909;color:#fff;font-size:12px;padding:16px 25px;margin:9px 0 28px;min-width:190px;transition:background .2s}
.intro-cta:hover{background:#1744f5}.intro-cta span{font-size:20px;line-height:1}
.intro :deep(.social-links){gap:23px}.intro :deep(.social-links svg){width:18px;height:18px}
.intro-note{margin-top:auto;padding-top:36px;text-transform:uppercase;font-size:7px;line-height:1.5;letter-spacing:.24em}
.services-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
@media(min-width:1800px){.intro{padding-left:6vw}.intro-copy{max-width:420px}}
@media(min-width:701px) and (max-width:1100px){.services{grid-template-columns:35% 65%}.intro{padding:32px 24px 24px}h2{font-size:4.8vw;margin-top:45px}.intro-copy{font-size:12px}.intro-cta{min-width:0;width:100%;padding:13px 16px;font-size:11px;margin-bottom:23px}.section-label{gap:10px;font-size:6px}.label-rule{width:35px}.intro :deep(.social-links){gap:15px}.intro :deep(.social-links svg){width:16px;height:16px}.intro-note{padding-top:25px}}
@media(max-width:700px){.services{grid-template-columns:1fr}.intro{padding:44px 8% 38px}.section-label{font-size:7px}h2{font-size:clamp(48px,10vw,68px);margin:36px 0 24px}.intro-copy{font-size:15px;max-width:480px;line-height:1.5}.intro-cta{margin:8px 0 26px}.intro-note{display:none}.services-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:480px){.services-grid{grid-template-columns:1fr}}
</style>
