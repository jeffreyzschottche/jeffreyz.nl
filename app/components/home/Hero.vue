<script setup lang="ts">
import { gsap } from 'gsap'
const hero = ref<HTMLElement>()
let context: gsap.Context | undefined
let media: gsap.MatchMedia | undefined
onMounted(() => {
  if (!hero.value) return
  const root = hero.value
  context = gsap.context(() => {
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy > *', { y: 25, autoAlpha: 0, duration: 1, stagger: .12, ease: 'power3.out', delay: .15 })
      gsap.from('.portrait', { y: 65, opacity: 0, duration: 1.5, ease: 'power3.out' })
      gsap.from('.float-layer', { opacity: 0, duration: 1.2, stagger: .035, ease: 'power2.out' })
      const layers = gsap.utils.toArray<HTMLElement>('.float-layer')
      layers.forEach((layer, index) => gsap.to(layer, { y: index % 2 ? 9 : -12, duration: 3 + index % 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: index * .12 }))
      const setters = layers.map(layer => ({ x: gsap.quickTo(layer, 'x', { duration: 1.5, ease: 'power3.out' }), depth: Number(layer.dataset.depth || 1) }))
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        const bounds = root.getBoundingClientRect()
        const offset = ((event.clientX - bounds.left) / bounds.width - .5) * 25
        setters.forEach(layer => layer.x(offset * layer.depth))
      }
      const reset = () => setters.forEach(layer => layer.x(0))
      root.addEventListener('pointermove', move)
      root.addEventListener('pointerleave', reset)
      return () => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', reset) }
    })
  }, root)
})
onBeforeUnmount(() => { media?.revert(); context?.revert() })
</script>
<template>
  <section id="home" ref="hero" class="hero" aria-labelledby="hero-heading">
    <div class="blue-field" />
    <HomeHeader />
    <HomeCollage />
    <div class="hero-copy"><span class="eyebrow"><span /> A CURIOUS MIND. A DIGITAL WORLD.</span><h1 id="hero-heading">Digital<br><em>Builder</em><sup>✦</sup></h1><p>Creates things digitally.</p><a href="#about" class="hero-cta">Scroll to explore <span>↓</span></a><HomeSocialLinks /></div>
  </section>
</template>
<style scoped>
.hero{position:relative;height:100vh;height:100dvh;isolation:isolate;background:#faf9f5;overflow:hidden}.blue-field{position:absolute;inset:0 51% 0 0;background:radial-gradient(ellipse at 85% 95%,#b4caff 0%,#7494ff 15%,transparent 46%),radial-gradient(ellipse at 70% 25%,#1255ff,transparent 65%),linear-gradient(135deg,#142bce,#003dff 65%,#3e69ff)}.hero-copy{position:absolute;z-index:12;left:6.3%;top:30%;color:white;text-align:center}.eyebrow{display:flex;align-items:center;justify-content:center;gap:9px;font-size:7px;letter-spacing:.2em;margin-bottom:25px}.eyebrow>span{width:5px;height:5px;background:#bdcaff;border-radius:50%}h1{position:relative;font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,min(7.7vw,13dvh),132px);font-weight:500;line-height:.99;letter-spacing:-.05em;margin:0}h1 em{font-weight:500}h1 sup{position:absolute;font-family:Georgia,serif;font-size:27px;font-weight:400;right:-29px;bottom:30px;letter-spacing:0}.hero-copy p{font-size:17px;font-weight:400;letter-spacing:-.02em;margin:24px 0 27px;color:#e2e8ff}.hero-cta{display:flex;width:218px;margin:0 auto;align-items:center;justify-content:space-between;padding:7px 7px 7px 22px;border:1px solid #a9c4ff;border-radius:50px;font-size:12px;transition:background .2s,box-shadow .2s}.hero-cta:hover{background:#ffffff1a;box-shadow:0 0 25px #9dc5ff33}.hero-cta>span{display:grid;place-items:center;width:37px;height:37px;background:#ffffff19;border-radius:50%;font-size:23px}.hero-copy :deep(.social-links){margin-top:31px}.hero-note{position:absolute;left:6.3%;bottom:6%;z-index:12;color:white;font-size:7px;line-height:2.2;letter-spacing:.4em}.little-rule{display:block;width:35px;height:1px;background:#b3c8ff;margin-bottom:15px}.edition{position:absolute;z-index:11;bottom:3%;left:40%;font-size:6px;letter-spacing:.28em;color:#e5ebff}.scroll-cue{position:absolute;right:5.5%;bottom:5%;z-index:12;display:flex;align-items:center;gap:19px;font-size:7px;letter-spacing:.22em}.scroll-cue svg{width:18px;height:24px}@media(max-width:1100px){.hero-copy{left:5.5%}.hero-copy h1{font-size:min(8.5vw,13dvh)}.eyebrow{font-size:6px}.hero-cta{width:195px}.hero-copy p{font-size:15px}}@media(max-width:650px){.blue-field{right:0;background:radial-gradient(ellipse at 0 40%,#7294ff,transparent 30%),linear-gradient(135deg,#123ddf,#0a43f1 45%,#163edf 75%,#244aed)}.hero-copy{top:auto;bottom:max(9%,calc(env(safe-area-inset-bottom) + 36px));left:8%;width:76%}.hero-copy .eyebrow{font-size:6px;margin-bottom:clamp(6px,1.6dvh,14px);letter-spacing:.13em}.hero-copy h1{font-size:clamp(48px,10dvh,80px);line-height:.98;letter-spacing:-.045em;width:fit-content}.hero-copy h1 sup{font-size:20px;right:-27px;bottom:17px}.hero-copy p{margin:clamp(7px,1.6dvh,14px) 0 clamp(10px,2.3dvh,20px);font-size:13px}.hero-cta{width:200px;padding:5px 5px 5px 19px;font-size:11px}.hero-cta>span{width:31px;height:31px;font-size:22px}.hero-copy :deep(.social-links){margin-top:clamp(12px,2.7dvh,23px);gap:23px}.hero-copy :deep(.social-links svg){width:18px;height:18px}.hero-note,.edition{display:none}.scroll-cue{color:white;bottom:max(3%,env(safe-area-inset-bottom));left:8%;right:auto;gap:14px;font-size:6px}}@media(max-height:600px) and (min-width:651px){.hero-copy{top:23%}.eyebrow{margin-bottom:12px}.hero-copy p{margin:12px 0 16px}.hero-copy :deep(.social-links){margin-top:16px}.hero-note{display:none}}
 </style>
<style scoped>
.hero-copy h1 sup{color:#f6b51f}
</style>
