<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const section = ref<HTMLElement>()
const services = [
  { label: 'Software & AI', icon: 'mdi:laptop' },
  { label: 'Creative systems', icon: 'mdi:lightbulb-outline' },
  { label: 'Content & strategy', icon: 'mdi:file-document-outline' },
  { label: 'Digital products', icon: 'mdi:cube-outline' },
  { label: 'Automation', icon: 'mdi:cog-outline' },
  { label: 'Brand & design', icon: 'mdi:palette-outline' },
]
const socials = [
  { label: 'TikTok', icon: 'simple-icons:tiktok', href: 'https://www.tiktok.com/' },
  { label: 'Instagram', icon: 'simple-icons:instagram', href: 'https://www.instagram.com/' },
  { label: 'LinkedIn', icon: 'simple-icons:linkedin', href: 'https://www.linkedin.com/' },
  { label: 'Zschot Media', href: 'https://zschotmedia.com' },
  { label: 'AITJE.com', href: 'https://aitje.com' },
  { label: 'Mail me', icon: 'simple-icons:gmail', href: 'mailto:jeffreyzschot@gmail.com' },
]
let media: gsap.MatchMedia | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.notes-reveal', { y: 22, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: section.value, start: 'top 84%', once: true } })
  }, section.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="tldr" ref="section" class="final-notes" aria-labelledby="notes-heading">
    <div class="notes-copy">
      <div class="notes-brand notes-reveal">TL;DR</div>
      <p class="notes-kicker notes-reveal">Final notes</p>
      <div class="notes-rule" />
      <div class="notes-prose notes-reveal"><p>I’m Jeffreyz — a digital builder working across software, AI, design, content and product creation. I like turning ideas into things that are useful, beautiful and a little unexpected.</p><p>If you’re building something ambitious, exploring AI, shaping your digital presence or looking for someone to think along with, I’d be happy to connect.</p></div>
      <div class="what-i-do notes-reveal"><p>What I do</p><ul><li v-for="service in services" :key="service.label"><Icon :name="service.icon" class="service-icon" />{{ service.label }}</li></ul></div>
    <div class="connect-socials notes-reveal"><p>Let's connect</p><nav><a v-for="social in socials" :key="social.label" :href="social.href" :target="social.href.startsWith('http') ? '_blank' : undefined" rel="noopener noreferrer"><strong class="social-icon"><Icon v-if="social.icon" :name="social.icon" /><img v-else-if="social.label === 'AITJE.com'" class="aitje-icon" src="/images/aitje-icon.svg" alt="AITJE" /><img v-else-if="social.label === 'Zschot Media'" class="zschot-icon" src="/images/zschotmedia-icon.svg" alt="Zschot Media" /><span v-else class="letter-mark">{{ social.letter }}</span></strong><span>{{ social.label }}</span></a></nav></div>
    </div>
    <div class="amsterdam-frame notes-reveal"><img src="/images/amsterdam.webp" alt="Zonnig Amsterdam met grachten, tulpen, fietsen en historische gebouwen" loading="lazy" /></div>
  </section>
</template>

<style scoped>
.final-notes{display:grid;grid-template-columns:1.14fr .86fr;gap:6.5%;padding:68px 4.6% 60px;background:#fff;color:#11151d}.notes-copy{min-width:0;padding:20px 0 0 1.2%}.notes-brand{font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:clamp(54px,7vw,103px);letter-spacing:-.085em;line-height:.9}.notes-kicker{font-size:13px;letter-spacing:.2em;color:#687184;margin:22px 0 24px}.notes-rule{height:1px;background:#d8dce3;width:100%;margin-bottom:29px}.notes-prose{max-width:750px;font-family:Georgia,'Times New Roman',serif;font-size:clamp(17px,1.6vw,25px);line-height:1.35;color:#141920;letter-spacing:-.02em}.notes-prose p{margin:0 0 28px}.what-i-do{border-top:1px solid #d8dce3;border-bottom:1px solid #d8dce3;padding:26px 0 21px;margin-top:4px}.what-i-do>p,.connect-socials>p{font-size:12px;text-transform:uppercase;letter-spacing:.25em;color:#687184;margin:0 0 15px}.what-i-do ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 24px}.what-i-do li{display:flex;align-items:center;gap:19px;font-family:Georgia,serif;font-size:17px}.service-icon{width:22px;height:22px;color:#0e51ed;flex-shrink:0}.connect-socials{padding-top:26px}.connect-socials nav{display:grid;grid-template-columns:repeat(6,1fr)}.connect-socials a{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;padding:5px 8px;border-right:1px solid #d9dde4;color:#0649ec;text-align:center}.connect-socials a:last-child{border:0}.connect-socials strong{font-family:Arial,sans-serif;font-size:32px;line-height:1;font-weight:700}.connect-socials span{font-family:Georgia,serif;font-size:14px;white-space:nowrap}.connect-socials a:hover{color:#052c9f}.amsterdam-frame{align-self:center;border-radius:12px;overflow:hidden;aspect-ratio:.83;box-shadow:0 7px 25px #12325e12}.amsterdam-frame img{width:100%;height:100%;display:block;object-fit:cover;object-position:center}
.connect-socials .social-icon{display:grid;place-items:center;width:38px;height:38px;font-family:Arial,sans-serif;font-size:31px;line-height:1}.social-icon .iconify{width:30px;height:30px}.social-icon .aitje-icon{width:44px;height:44px;filter:brightness(0) saturate(100%) invert(24%) sepia(98%) saturate(2043%) hue-rotate(215deg) brightness(99%) contrast(96%)}.social-icon .zschot-icon{width:auto;height:44px;filter:brightness(0) saturate(100%) invert(24%) sepia(98%) saturate(2043%) hue-rotate(215deg) brightness(99%) contrast(96%)}.social-icon .letter-mark{font-family:Arial,sans-serif;font-size:38px;font-weight:700}
@media(min-width:1700px){.final-notes{padding-left:5.5%;padding-right:5.5%;gap:8%}.notes-copy{padding-top:35px}.notes-prose{font-size:25px}}
@media(min-width:701px) and (max-width:1050px){.final-notes{padding:50px 4%;gap:5%}.notes-brand{font-size:7.6vw}.notes-prose{font-size:16px}.notes-kicker{font-size:10px}.what-i-do li{font-size:14px}.connect-socials span{font-size:10px}.connect-socials strong{font-size:25px}.amsterdam-frame{aspect-ratio:.78}}
@media(max-width:700px){.final-notes{grid-template-columns:1fr;padding:55px 7% 45px;gap:32px}.notes-copy{padding:0}.notes-brand{font-size:64px}.notes-kicker{font-size:11px;margin:18px 0}.notes-prose{font-size:18px}.notes-prose p{margin-bottom:22px}.what-i-do{padding:22px 0 18px}.what-i-do li{font-size:17px}.connect-socials nav{grid-template-columns:repeat(3,1fr);row-gap:16px}.connect-socials a:nth-child(3){border:0}.connect-socials span{font-size:12px}.connect-socials strong{font-size:28px}.amsterdam-frame{aspect-ratio:.83}}
</style>
