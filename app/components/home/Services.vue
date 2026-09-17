<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const section = ref<HTMLElement>()
const services = computed(() => [
  { title: t('services.items.automation.title'), kind: 'automation', caption: t('services.items.automation.caption') },
  { title: t('services.items.software.title'), kind: 'software', caption: t('services.items.software.caption') },
  { title: t('services.items.ai.title'), kind: 'ai', caption: t('services.items.ai.caption') },
  { title: t('services.items.music.title'), kind: 'music', caption: t('services.items.music.caption') },
  { title: t('services.items.threeD.title'), kind: 'three-d', caption: t('services.items.threeD.caption') },
  { title: t('services.items.writing.title'), kind: 'writing', caption: t('services.items.writing.caption') },
  { title: t('services.items.design.title'), kind: 'design', caption: t('services.items.design.caption') },
  { title: t('services.items.strategy.title'), kind: 'strategy', caption: t('services.items.strategy.caption') },
  { title: t('services.items.product.title'), kind: 'product', caption: t('services.items.product.caption') },
])
let media: gsap.MatchMedia | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
      gsap.from(card, { y: 36, opacity: .35, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 70%', scrub: .6 } })
    })
  }, section.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="about" ref="section" class="services" aria-labelledby="services-heading">
    <div class="intro">
      <div class="section-label"><span>01</span><span class="label-rule" /><span>{{ t('services.label') }}</span></div>
      <h2 id="services-heading">{{ t('services.title') }}<br>{{ t('services.titleLine2') }}</h2>
      <div class="intro-copy"><p>{{ t('services.intro1') }}</p><p>{{ t('services.intro2') }}</p></div>
      <HomeSocialLinks />
    </div>
    <div class="services-grid">
      <HomeServiceCard v-for="(service, index) in services" :key="service.kind" :service="service" :index="index" :class="{ 'center-card': [2,5,8].includes(index) }" />
    </div>
  </section>
</template>

<style scoped>
.services{display:grid;grid-template-columns:36% 64%;width:min(1800px,calc(100% - 64px));margin-inline:auto;padding-inline:clamp(16px,2.8vw,52px);column-gap:clamp(18px,2.5vw,44px);background:#fff;color:#080909;scroll-margin-top:0}
@media(min-width:701px){.services{padding-top:5em}}
.intro{padding:clamp(30px,4.6vw,76px) clamp(26px,4.2vw,70px) 24px;display:flex;align-items:flex-start;flex-direction:column}
.section-label{display:flex;align-items:center;gap:15px;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:#2453ff}
.label-rule{width:65px;height:1px;background:#a1a19d}
h2{font-size:clamp(48px,6vw,96px);line-height:.99;font-weight:700;letter-spacing:-.05em;margin:clamp(36px,4.7vw,76px) 0 25px}
.intro-copy{max-width:355px;font-size:18px;line-height:1.5;color:#454453;letter-spacing:-.02em}
.intro-copy p{margin:0 0 18px}
.intro-cta{display:flex;align-items:center;justify-content:space-between;gap:25px;background:#080909;color:#fff;font-size:12px;padding:16px 25px;margin:9px 0 28px;min-width:190px;transition:background .2s}
.intro-cta:hover{background:#1744f5}.intro-cta span{font-size:20px;line-height:1}
.intro :deep(.social-links){gap:23px}.intro :deep(.social-links svg){width:18px;height:18px}
.intro-note{margin-top:auto;padding-top:36px;text-transform:uppercase;font-size:7px;line-height:1.5;letter-spacing:.24em}
.services-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(10px,1.3vw,20px);align-content:start}
@media(min-width:1101px){.services-grid{width:75%;justify-self:center;align-self:center}}
@media(min-width:1800px){.intro{padding-left:6vw}.intro-copy{max-width:420px}}
@media(min-width:701px) and (max-width:1100px){.services{grid-template-columns:35% 65%}.intro{padding:32px 24px 24px}h2{font-size:6vw;margin-top:45px}.intro-copy{font-size:16px}.intro-cta{min-width:0;width:100%;padding:13px 16px;font-size:11px;margin-bottom:23px}.section-label{gap:10px;font-size:8px}.label-rule{width:35px}.intro :deep(.social-links){gap:15px}.intro :deep(.social-links svg){width:16px;height:16px}.intro-note{padding-top:25px}}
@media(max-width:700px){.services{grid-template-columns:1fr;width:100%;padding-inline:0}.intro{padding:44px 8% 38px}.section-label{font-size:8px}h2{font-size:clamp(40px,10vw,64px);margin:36px 0 24px}.intro-copy{font-size:16px;max-width:480px;line-height:1.5}.intro-cta{margin:8px 0 26px}.intro-note{display:none}.services-grid{grid-template-columns:repeat(2,minmax(0,1fr));padding-inline:4%}.services-grid>:deep(.center-card){grid-column:1/-1;justify-self:center;width:calc(50% - 5px)}}
</style>
