<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = ref<HTMLElement>()
const projects = [
  { name: 'AITJE', kind: 'aitje', category: 'AI × tools × people', tagline: 'Intelligence\nfor a brighter tomorrow', details: 'AI tools\nProductivity\nReal impact' },
  { name: 'Zschot\nMedia', kind: 'media', category: 'Brands × content × growth', tagline: 'Stories that\nmove people', details: 'Brand strategy\nContent creation\nDigital growth' },
  { name: 'Creative\nEndeavours', kind: 'creative', category: 'Ideas × art × experiments', tagline: 'Exploring ideas\nbeyond the obvious', details: 'Design\nExperiments\nWhat’s next' },
]
let media: gsap.MatchMedia | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.project-card', { y: 30, autoAlpha: 0, duration: .8, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: section.value, start: 'top 80%', once: true } })
  }, section.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="projects" ref="section" class="projects-section" aria-labelledby="projects-heading">
    <div class="project-story">
      <header class="story-heading">
        <p class="eyebrow">Currently <span /> building</p>
        <h2 id="projects-heading">What I’m<br>working on</h2>
        <div class="story-summary"><p>A multidisciplinary builder working across<br class="desktop-break"> products, software, AI and creative ventures.<br class="desktop-break"> Turning ideas into real things.</p><span class="side-note">Ideas<br>Products<br>People<br>A brighter tomorrow</span></div>
      </header>
      <div class="workspace-photo"><img src="/images/workspace-framed.webp" alt="Een digitale maker aan het werk in een lichte studio met meerdere schermen en blauwe accentverlichting" loading="lazy" /></div>
      <div class="photo-captions"><p>Same ideas.<br>A brighter tomorrow.<span /></p><p>Based anywhere<br>Building everywhere<span /></p></div>
    </div>
    <div class="project-list"><HomeProjectCard v-for="(project, index) in projects" :key="project.kind" :project="project" :index="index" /></div>
  </section>
</template>

<style scoped>
.projects-section{display:grid;grid-template-columns:minmax(0,1.95fr) minmax(0,1fr);gap:32px;padding:48px 3.3% 45px 2.2%;background:#fff;color:#050606;scroll-margin-top:20px}
.project-story{min-width:0;display:flex;flex-direction:column}
.story-heading{padding:0 5.7% 12px}
.eyebrow{display:flex;align-items:center;gap:15px;color:#2453ff;font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;margin:0 0 30px}
.eyebrow span{height:1px;width:40px;background:#2453ff}
h2{font-size:clamp(48px,6.7vw,112px);font-weight:700;line-height:.91;letter-spacing:-.065em;margin:0 0 23px}
.story-summary{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}
.story-summary>p{font-size:clamp(13px,1.3vw,20px);line-height:1.35;color:#737680;letter-spacing:-.02em;margin:0;max-width:470px}
.side-note{text-transform:uppercase;color:#92959c;font-size:8px;line-height:1.65;letter-spacing:.2em;flex-shrink:0;margin-top:-38px}
.workspace-photo{margin:0 -6.5%;min-height:0;overflow:visible}
.workspace-photo img{width:100%;height:auto;display:block}
.photo-captions{display:flex;justify-content:space-between;padding:3px 3.5% 0;color:#979aa1;text-transform:uppercase;font-size:8px;line-height:1.7;letter-spacing:.18em}
.photo-captions p{margin:0}.photo-captions span{display:block;width:14px;height:1px;background:#717783;margin-top:10px}
.project-list{display:grid;grid-template-rows:1.1fr 1fr .92fr;gap:13px}
@media(min-width:1700px){.projects-section{gap:40px;padding-top:80px}.story-heading{padding-bottom:25px}}
@media(min-width:701px) and (max-width:1000px){.projects-section{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:18px;padding:45px 3%}h2{font-size:6.4vw}.story-heading{padding:0 3% 15px}.story-summary>p{font-size:13px}.side-note{display:none}.eyebrow{font-size:7px;gap:10px;letter-spacing:.2em;margin-bottom:25px}.workspace-photo{margin:12px -6.5% 0}.photo-captions{font-size:6px;gap:15px}.desktop-break{display:none}}
@media(max-width:700px){.projects-section{grid-template-columns:1fr;padding:48px 5% 40px;gap:30px}.story-heading{padding:0 3% 16px}h2{font-size:clamp(47px,10.5vw,74px);margin-bottom:20px}.eyebrow{font-size:7px;gap:13px;margin-bottom:26px}.story-summary>p{font-size:15px;line-height:1.5}.side-note{display:none}.desktop-break{display:none}.workspace-photo{flex:none}.photo-captions{font-size:6px;padding-top:4px}.project-list{gap:14px;grid-template-rows:none}}
</style>
