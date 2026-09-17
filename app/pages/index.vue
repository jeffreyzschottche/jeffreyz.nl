<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
useSeoMeta({ title: 'Jeffreyz — Digital builder', description: 'Ideas, people, systems. Jeffrey builds digital experiences with curiosity and a different perspective.', themeColor: '#173df5' })

const page = ref<HTMLElement>()
let media: gsap.MatchMedia | undefined

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add({
    desktop: '(min-width: 701px)',
    motion: '(prefers-reduced-motion: no-preference)',
  }, (context) => {
    if (!context.conditions?.motion) return
    const distance = context.conditions.desktop ? 64 : 24

    // Animate the layout wrappers so the component animations stay independent.
    gsap.utils.toArray<HTMLElement>('.intro, .project-story, .next-story, .why-copy, .notes-copy').forEach((element) => {
      gsap.fromTo(element, { y: distance }, {
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: element, start: 'top bottom', end: 'top 35%', scrub: .8, invalidateOnRefresh: true },
      })
    })
  }, page.value)
})

onBeforeUnmount(() => media?.revert())
</script>

<template>
  <main ref="page" class="home-page">
    <HomeHero />
    <HomeServices />
    <HomeProjects />
    <HomeNextStep />
    <HomeMagazine />
    <HomeFinalNotes />
    <footer><a class="footer-logo" href="#home">jeffreyz<span>©</span></a><span class="footer-tagline">{{ t('footer.tagline') }}</span><a class="footer-top" href="#home">{{ t('footer.backToTop') }} ↑</a></footer>
  </main>
</template>

<style scoped>
.home-page{
  --section-space:clamp(96px,10vw,176px);
  position:relative;
  isolation:isolate;
  background:#fff;
}
.home-page :deep(.hero){overflow:visible;z-index:2}
.home-page :deep(.hero)::after{
  content:'';
  position:absolute;
  z-index:11;
  inset:auto 0 0;
  height:clamp(48px,8vh,96px);
  background:linear-gradient(transparent,#fff);
  pointer-events:none;
}
.home-page :deep(.services){
  position:relative;
  z-index:1;
  padding-block:calc(var(--section-space) + 5em) var(--section-space);
  background:transparent;
  align-items:start;
}
.home-page :deep(.intro){padding-top:0;padding-bottom:40px}
.home-page :deep(.intro-copy){line-height:1.65}
.home-page :deep(.services-grid){gap:clamp(10px,1.3vw,20px);padding-right:0}
.home-page :deep(.projects-section){padding-block:var(--section-space);background:transparent;gap:clamp(24px,4vw,64px)}
.home-page :deep(.story-heading){padding-bottom:40px}
.home-page :deep(.project-list){gap:24px}
.home-page :deep(.next-section){padding-block:calc(var(--section-space) * .7);background:transparent}
.home-page :deep(.next-panel){
  padding-block:clamp(64px,7vw,112px);
  border:0;
  border-radius:0;
  background:transparent;
}
.home-page :deep(.story-copy){line-height:1.65}
.home-page :deep(.final-notes){padding-top:var(--section-space);padding-bottom:calc(var(--section-space) * .35);background:transparent}
.home-page :deep(.notes-prose){line-height:1.55}
footer{position:relative;margin-top:42px;border-top:8px solid #0647ff}
footer::before{display:none}
@media(max-width:700px){
  .home-page{--section-space:clamp(72px,16vw,108px)}
  .home-page :deep(.intro){padding-bottom:48px}
  .home-page :deep(.services-grid){padding-inline:5%;gap:12px}
  .home-page :deep(.projects-section){gap:48px}
  .home-page :deep(.next-panel){padding:24px 3%;gap:40px}
  .home-page :deep(.next-help){padding-top:32px}
  .home-page :deep(.final-notes){gap:48px}
}
footer{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:40px 6%;font-size:13px;background:#0647ff;color:#fff}footer a{color:#fff;transition:color .2s,opacity .2s}footer a:hover{color:#dfe7ff;opacity:.9}.footer-logo{font-size:26px;font-weight:700;letter-spacing:-1.5px}.footer-logo span{font-size:16px;vertical-align:top;margin-left:4px}.footer-tagline{font-size:17px;font-weight:600;letter-spacing:-.5px}.footer-top{font-size:17px;font-weight:600;letter-spacing:-.5px}@media(max-width:650px){footer{flex-wrap:wrap;gap:16px}.footer-tagline,.footer-top{font-size:18px}}
</style>
