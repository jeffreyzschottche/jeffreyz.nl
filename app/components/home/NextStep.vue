<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const section = ref<HTMLElement>()
const connect = ref<HTMLAnchorElement>()
const waysToHelp = [
  'Digitalising your business',
  'Applying AI in practical ways',
  'Software and product thinking',
  'Content and creative direction',
  'Viral concepts and campaigns',
  'Strategic sparring about the future',
  'Turning vague ideas into clear plans',
  'Working with an engineer who’s in the middle of it',
]
let media: gsap.MatchMedia | undefined

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.next-reveal', { y: 20, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: section.value, start: 'top 85%', once: true } })
    gsap.utils.toArray<HTMLElement>('.swiss-float').forEach((shape, index) => {
      gsap.to(shape, { y: index % 2 ? -12 : 10, x: index % 2 ? 5 : -4, duration: 3.5 + index, repeat: -1, yoyo: true, ease: 'sine.inOut', scrollTrigger: { trigger: section.value, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } })
    })
    gsap.to('.swiss-star svg', { rotation: 180, duration: 30, repeat: -1, ease: 'none', transformOrigin: '50% 50%', scrollTrigger: { trigger: section.value, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } })
    gsap.to('.swiss-cube-inner', { rotationY: 205, rotationX: 35, duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut', scrollTrigger: { trigger: section.value, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } })
    gsap.to('.swiss-triangle svg', { rotationY: 35, rotationZ: -12, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', scrollTrigger: { trigger: section.value, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' } })
  }, section.value)
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const button = connect.value
    if (!button) return
    const x = gsap.quickTo(button, 'x', { duration: .45, ease: 'power3.out' })
    const y = gsap.quickTo(button, 'y', { duration: .45, ease: 'power3.out' })
    const move = (event: PointerEvent) => {
      const box = button.getBoundingClientRect()
      x(((event.clientX - box.left) / box.width - .5) * 10)
      y(((event.clientY - box.top) / box.height - .5) * 8)
    }
    const reset = () => { x(0); y(0) }
    button.addEventListener('pointermove', move)
    button.addEventListener('pointerleave', reset)
    return () => { button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', reset) }
  }, section.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="contact" ref="section" class="next-section" aria-labelledby="next-heading">
    <div id="thoughts" class="next-panel">
      <div class="next-story">
        <p class="section-label next-reveal">04 <span>/</span> What’s next</p>
        <h2 id="next-heading" class="next-reveal">Always looking<br>for the next step<span class="blue-period">.</span></h2>
        <div class="story-copy next-reveal"><p>I know a lot, and I know there’s still a lot more to learn.<br class="wide-break"> That balance keeps me curious, sharp and open to what’s next.</p><p>If you’re thinking about the digital future of your business, applying AI in a practical way, improving your content, exploring new ideas, or simply looking for someone technical to spar with — I’d love to hear from you.</p></div>
      </div>
      <div class="next-help">
        <div class="next-reveal"><h3>How I can help</h3><ul><li v-for="way in waysToHelp" :key="way">{{ way }}</li></ul></div>
        <div class="connect-block next-reveal"><span class="blue-rule" aria-hidden="true"/><p>Open to collaborations, conversations and interesting ideas.</p><a ref="connect" class="connect-cta" href="mailto:hello@jeffreyz.nl"><span class="cta-spark" aria-hidden="true">✳</span><span class="cta-label">Let’s connect</span><span class="cta-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></span></a></div>
        <p class="closing-note next-reveal"><span aria-hidden="true"/>I can help you think, build and move forward.</p>
      </div>
      <HomeSwissShapes />
    </div>
  </section>
</template>

<style scoped>
.next-section{padding:35px 3.2% 50px;background:#fff;color:#090a0c;scroll-margin-top:20px}
.next-panel{position:relative;isolation:isolate;display:grid;grid-template-columns:1.28fr 1fr;gap:4.5%;border:1px solid #d8dde4;border-radius:12px;padding:52px 5.1% 58px;background:linear-gradient(125deg,#fff 65%,#f9faff);scroll-margin-top:30px}
.next-story,.next-help{position:relative;z-index:2;min-width:0}
.section-label{display:flex;align-items:center;gap:12px;margin:0 0 28px;color:#687286;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.24em}
h2{font-family:'Playfair Display',Georgia,serif;font-weight:500;font-size:clamp(42px,5.55vw,88px);line-height:1.02;letter-spacing:-.065em;margin:0 0 26px;white-space:nowrap}
.blue-period{color:#0647ff}
.story-copy{max-width:510px;color:#606b7e;font-size:clamp(14px,1.4vw,20px);line-height:1.45;letter-spacing:-.02em}
.story-copy p{margin:0 0 24px}.story-copy p:last-child{margin-bottom:0}
.next-help{border-left:1px solid #d8dde4;padding:7px 0 0 10%}
h3{font-size:19px;line-height:1.2;letter-spacing:-.04em;font-weight:700;margin:0 0 17px}
ul{list-style:none;margin:0;padding:0;display:grid;gap:7px}
li{position:relative;padding-left:25px;font-size:clamp(12px,1.12vw,16px);line-height:1.35;color:#606b7e;letter-spacing:-.02em}
li:before{content:'';position:absolute;left:1px;top:.43em;width:7px;height:7px;background:#0647ff;border-radius:50%;box-shadow:0 0 0 3px #0647ff05}
.connect-block{margin-top:30px}.blue-rule{display:block;width:35px;height:2px;background:#0647ff;margin-bottom:18px}
.connect-block>p{font-size:clamp(13px,1.15vw,16px);color:#606b7e;line-height:1.45;margin:0 0 16px;letter-spacing:-.02em}
.connect-cta{position:relative;display:inline-flex;align-items:center;gap:13px;min-width:218px;padding:7px 8px 7px 20px;border:1px solid #0847ff;border-radius:50px;background:linear-gradient(110deg,#064dff,#0738ed);color:white;box-shadow:0 5px 15px #1649ff18;transition:box-shadow .25s,background .25s}
.cta-label{font-size:14px;font-weight:600}.cta-spark{font-size:22px;line-height:1;transition:transform .5s}.cta-arrow{display:grid;place-items:center;margin-left:auto;width:36px;height:36px;border-radius:50%;background:#ffffff20;transition:background .25s,color .25s}
.cta-arrow svg{width:20px;height:20px;transition:transform .25s}.connect-cta:hover{box-shadow:0 8px 25px #1649ff35}.connect-cta:hover .cta-arrow{background:white;color:#0647ff}.connect-cta:hover .cta-arrow svg{transform:rotate(-35deg)}.connect-cta:hover .cta-spark{transform:rotate(90deg)}
.connect-cta:focus-visible{outline:3px solid #8dabff;outline-offset:5px}
.closing-note{display:flex;align-items:center;gap:18px;margin:30px 0 0;font-size:10px;letter-spacing:.06em;line-height:1.5;color:#778193}
.closing-note>span{width:24px;height:1px;background:#738096;flex-shrink:0}
@media(min-width:1700px){.next-panel{padding-top:65px;padding-bottom:70px}.story-copy{max-width:620px}}
@media(min-width:701px) and (max-width:1050px){.next-panel{padding:38px 4%;gap:4%;grid-template-columns:1.15fr 1fr}h2{font-size:5.1vw}.section-label{font-size:8px;margin-bottom:23px}.story-copy{font-size:14px}.next-help{padding-left:8%}h3{font-size:17px}li{font-size:12px;padding-left:20px}ul{gap:6px}.wide-break{display:none}.closing-note{font-size:8px;gap:12px}.connect-cta{min-width:190px}}
@media(max-width:700px){.next-section{padding:20px 5% 35px}.next-panel{grid-template-columns:1fr;gap:28px;padding:30px 7% 27px}.section-label{font-size:8px;margin-bottom:23px}h2{font-size:clamp(32px,6.9vw,48px);margin-bottom:21px}.story-copy{font-size:14px;line-height:1.5}.story-copy p{margin-bottom:20px}.wide-break{display:none}.next-help{border-left:0;padding:21px 0 0;border-top:1px solid #d8dde4}h3{font-size:17px;margin-bottom:14px}li{font-size:13px;padding-left:20px}ul{gap:7px}li:before{width:6px;height:6px}.connect-block{margin-top:24px}.connect-block>p{font-size:13px}.blue-rule{margin-bottom:15px}.connect-cta{display:flex;width:100%;justify-content:center;min-width:0}.cta-label{margin-left:auto}.cta-spark{position:absolute;left:19px}.cta-arrow{margin-left:auto}.closing-note{font-size:9px;gap:13px;margin-top:23px}}
@media(prefers-reduced-motion:reduce){.connect-cta,.cta-arrow,.cta-arrow svg,.cta-spark{transition:none}}
</style>
