<script setup lang="ts">
import { portfolioCopy } from '~/data/portfolio'
import type { PortfolioPanel } from '~/data/portfolio'
const { locale, setLocale } = useI18n()
const copy = computed(() => portfolioCopy[locale.value])
const activePanel = ref<PortfolioPanel>('home')
const dialog = ref<HTMLDialogElement>()
const dialogScroll = ref<HTMLElement>()
const dialogContent = ref<HTMLElement>()
const dialogNeedsScroll = ref(false)
let dialogResizeObserver: ResizeObserver | undefined
const animationsPaused = ref(false)
const title = computed(() => activePanel.value === 'projects' ? copy.value.workTitle : activePanel.value === 'about' ? copy.value.aboutTitle : copy.value.contactTitle)
const contactEmail = 'jeffrey@zschotmedia.nl'
const socialLinks = [
  { label: 'Instagram', icon: 'instagram' as const, href: 'https://www.instagram.com/jeffreyz.nl' },
  { label: 'LinkedIn', icon: 'linkedin' as const, href: 'https://www.linkedin.com/in/jeffrey-zschöttche-71aa95151' },
]
useSeoMeta({ title: 'Jeffreyz — Digital builder | Amsterdam', description: () => copy.value.intro, ogTitle: 'Jeffreyz — Digital builder', ogDescription: () => copy.value.intro, ogImage: 'https://jeffreyz.nl/images/silhouettes/social-cover.png', themeColor: '#080808' })
useHead({ htmlAttrs: { lang: () => locale.value } })
function updateDialogScroll() {
  if (!dialog.value?.open || !dialogScroll.value || !dialogContent.value) return
  // Ignore subpixel rounding; only create a scroll area for real hidden content.
  dialogNeedsScroll.value = dialogContent.value.getBoundingClientRect().height > dialogScroll.value.clientHeight + 2
}
function navigate(panel: PortfolioPanel, updateHash = true) {
  activePanel.value = panel
  if (panel === 'home') dialog.value?.close()
  else if (dialog.value && !dialog.value.open) dialog.value.showModal()
  nextTick(updateDialogScroll)
  if (updateHash) history.replaceState(null, '', panel === 'home' ? location.pathname + location.search : `#${panel}`)
}
function onDialogClose() { if (dialog.value?.open) return; activePanel.value = 'home'; history.replaceState(null, '', location.pathname + location.search) }
function onBackdropClick(event: MouseEvent) {
  if (event.target !== dialog.value || !dialog.value) return
  const bounds = dialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) navigate('home')
}
let motionQuery: MediaQueryList | undefined
const syncMotion = () => { animationsPaused.value = motionQuery?.matches ?? false }
const syncHash = () => {
  const hash = location.hash.slice(1)
  const aliases: Record<string, PortfolioPanel> = { home: 'home', projects: 'projects', about: 'about', contact: 'contact', why: 'about', tldr: 'about' }
  navigate(aliases[hash] ?? 'home', false)
}
onMounted(() => {
  motionQuery = matchMedia('(prefers-reduced-motion: reduce)')
  syncMotion()
  motionQuery.addEventListener('change', syncMotion)
  window.addEventListener('hashchange', syncHash)
  dialogResizeObserver = new ResizeObserver(updateDialogScroll)
  if (dialogScroll.value) dialogResizeObserver.observe(dialogScroll.value)
  if (dialogContent.value) dialogResizeObserver.observe(dialogContent.value)
  document.fonts.ready.then(updateDialogScroll)
  syncHash()
})
onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', syncMotion)
  window.removeEventListener('hashchange', syncHash)
  dialogResizeObserver?.disconnect()
})
</script>
<template>
  <div class="creative-page">
    <a class="skip-link" href="#hero-heading">{{ locale === 'nl' ? 'Naar de inhoud' : 'Skip to content' }}</a>
    <HomeHeader :active="activePanel" @navigate="navigate">
      <template #socials>
        <div class="header-socials">
          <a v-for="social in socialLinks" :key="social.icon" :href="social.href" target="_blank" rel="noopener noreferrer" class="header-social" :aria-label="social.label" :title="social.label"><img :src="`/icons/${social.icon}-lime.svg`" alt="" width="24" height="24"></a>
        </div>
      </template>
    </HomeHeader>
    <main class="main-canvas"><HomeHero :paused="animationsPaused" @navigate="navigate" /></main>
    <footer class="site-footer">
      <span class="footer-note"><span class="status-dot" />{{ copy.footer }}</span>
      <div class="footer-controls">
        <div class="locale-toggle" :aria-label="locale === 'nl' ? 'Taal' : 'Language'"><button :aria-pressed="locale === 'nl'" :class="{ selected: locale === 'nl' }" @click="setLocale('nl')">NL</button><span>/</span><button :aria-pressed="locale === 'en'" :class="{ selected: locale === 'en' }" @click="setLocale('en')">EN</button></div>
        <a v-for="social in socialLinks" :key="social.icon" :href="social.href" target="_blank" rel="noopener noreferrer" class="footer-social" :aria-label="social.label" :title="social.label"><img :src="`/icons/${social.icon}-lime.svg`" alt="" width="24" height="24"></a>
      </div>
    </footer>
    <dialog ref="dialog" class="detail-dialog" :class="`panel-${activePanel}`" aria-labelledby="dialog-title" @close="onDialogClose" @click="onBackdropClick" @cancel.prevent="navigate('home')" @keydown.esc.stop.prevent="navigate('home')">
      <div ref="dialogScroll" class="dialog-scroll" :class="{ 'is-scrollable': dialogNeedsScroll }">
      <div ref="dialogContent" class="dialog-content">
      <div class="dialog-topline"><a class="dialog-logo" href="#home" :aria-label="copy.back" @click.prevent="navigate('home')">jeffreyz<span>©</span></a><button class="dialog-close" :aria-label="copy.close" @click="navigate('home')"><span aria-hidden="true">×</span></button></div>
      <template v-if="activePanel === 'projects'">
        <p class="dialog-eyebrow">01 / {{ copy.workLabel }}</p><h2 id="dialog-title">{{ title }}</h2><p class="dialog-intro">{{ copy.workIntro }}</p>
        <div class="work-list">
          <a href="https://aitje.com" target="_blank" rel="noopener noreferrer" class="work-item work-ai"><span class="work-index">01</span><div><h3>AITJE</h3><p>{{ copy.aitje }}</p></div><span class="work-arrow" aria-hidden="true">↗</span></a>
          <a href="https://zschotmedia.nl" target="_blank" rel="noopener noreferrer" class="work-item work-media"><span class="work-index">02</span><div><h3>Zschot Media</h3><p>{{ copy.media }}</p></div><span class="work-arrow" aria-hidden="true">↗</span></a>
        </div>
      </template>
      <template v-else-if="activePanel === 'about'">
        <p class="dialog-eyebrow">02 / {{ copy.aboutLabel }}</p><h2 id="dialog-title">{{ title }}</h2>
        <div class="about-layout"><div class="about-art"><HomePortraitCreatures :paused="animationsPaused" :alt="locale === 'nl' ? 'Portret van Jeffrey in een gouden schilderijlijst' : 'Portrait of Jeffrey in a gold picture frame'" /></div><div class="about-copy"><p class="dialog-intro">{{ copy.aboutIntro }}</p><p>{{ copy.aboutBody }}</p><p class="about-ending">{{ copy.aboutEnd }}</p></div></div>
        <div class="skill-tags"><span v-for="skill in copy.skills" :key="skill">{{ skill }}</span></div>
      </template>
      <template v-else>
        <p class="dialog-eyebrow">03 / {{ copy.contactLabel }}</p><h2 id="dialog-title">{{ title }}</h2><p class="dialog-intro">{{ copy.contactIntro }}</p>
        <div class="contact-socials">
          <a class="email-link" :href="`mailto:${contactEmail}`" :aria-label="`${copy.email} — ${contactEmail}`" :title="contactEmail"><img src="/icons/gmail-lime.svg" alt="" width="32" height="32"></a>
          <a v-for="social in socialLinks" :key="social.icon" :href="social.href" target="_blank" rel="noopener noreferrer" :aria-label="social.label" :title="social.label"><img :src="`/icons/${social.icon}-lime.svg`" alt="" width="32" height="32"></a>
        </div>
        <div class="contact-palette" aria-hidden="true"><span v-for="color in ['#08bce9','#f347a0','#c1ee3e','#ffc331','#4163ff','#a376ff','#ff812c','#ff4744']" :key="color" :style="{ background: color }" /></div>
      </template>
      </div>
      </div>
    </dialog>
  </div>
</template>
<style scoped>
.header-socials{display:none;align-items:center;gap:8px}.header-social{display:grid;place-items:center;width:44px;height:44px;transition:opacity .2s,transform .2s}.header-social img{display:block;width:24px;height:24px}.header-social:hover{opacity:.75;transform:translateY(-2px)}
.creative-page{display:flex;flex-direction:column;min-height:100svh;height:100dvh;padding:0 clamp(22px,3.3vw,64px);background:#080808}.main-canvas{display:flex;flex:1;min-height:0}.site-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:72px;padding-block:20px;flex-shrink:0;color:#898984;font-size:10px}.footer-note{display:flex;align-items:center;gap:9px;letter-spacing:.01em}.status-dot{width:5px;height:5px;background:#c5f33c;border-radius:50%;flex-shrink:0}.footer-controls{display:flex;align-items:center;gap:25px}.locale-toggle{display:flex;align-items:center;gap:8px;font:9px var(--font-mono)}.locale-toggle button{border:0;padding:4px 0;background:transparent;color:#777}.locale-toggle button.selected{color:#f4f3ef}.locale-toggle>span{color:#444}.footer-social{display:grid;place-items:center;width:32px;height:32px;color:#c5f33c;transition:opacity .2s,transform .2s}.footer-social img{display:block;width:24px;height:24px}.footer-social:hover{opacity:.75;transform:translateY(-2px)}.skip-link{position:fixed;left:20px;top:-60px;z-index:100;background:#c5f33c;color:#080808;padding:10px 20px;border-radius:30px}.skip-link:focus{top:15px}
.detail-dialog{--dialog-gap:64px;width:min(780px,calc(100% - 40px));max-height:calc(100dvh - var(--dialog-gap));overflow:hidden;position:fixed;margin:auto;border:1px solid #363632;border-radius:20px;padding:0;background:#111110;color:#f4f3ef;box-shadow:0 40px 120px #000a}.dialog-scroll{max-height:calc(100dvh - var(--dialog-gap) - 2px);overflow:hidden;overscroll-behavior:contain}.dialog-scroll.is-scrollable{overflow-y:auto}.dialog-content{display:flow-root;padding:32px 42px 42px}.detail-dialog::backdrop{background:#000b;backdrop-filter:blur(12px)}.detail-dialog[open]{animation:dialog-in .25s ease-out}.dialog-topline{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:44px}.dialog-logo{font-size:25px;font-weight:700;letter-spacing:-1.5px}.dialog-logo>span{font-size:11px;margin-left:4px;vertical-align:top;letter-spacing:0}.dialog-close{display:grid;place-items:center;width:34px;height:34px;border:1px solid #45453e;border-radius:50%;background:transparent;font-size:25px;font-weight:400;line-height:1}.dialog-close:hover{background:#f4f3ef;color:#111}.dialog-eyebrow{font:9px/1.7 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:#a3a39c;margin:0 0 19px}.detail-dialog h2{font-size:clamp(36px,4.5vw,60px);font-weight:500;letter-spacing:-.065em;line-height:1.04;max-width:540px;margin:0 0 22px}.dialog-intro{font-size:15px;line-height:1.7;color:#aaa9a1;max-width:510px;margin-bottom:30px}.work-list{display:grid;gap:9px}.work-item{display:flex;gap:17px;align-items:flex-start;padding:25px 22px;color:#111;transition:transform .2s}.work-item:hover{transform:translateX(4px)}.work-ai{background:#c1ee3e}.work-media{background:#f347a0}.work-index{font:10px var(--font-mono);padding-top:6px}.work-item h3{font-size:29px;font-weight:500;letter-spacing:-1.3px;margin:0 0 8px}.work-item p{max-width:390px;font-size:12px;line-height:1.6;margin:0}.work-arrow{margin-left:auto;font-size:28px}.skill-tags{display:flex;flex-wrap:wrap;gap:8px}.skill-tags>span{display:inline-flex;gap:14px;align-items:center;border:1px solid #3e3e37;border-radius:40px;padding:10px 15px;font-size:11px}.about-layout{display:grid;grid-template-columns:280px 1fr;gap:28px;align-items:start;margin-top:30px}.about-art{width:100%;aspect-ratio:1;align-self:start}.about-art img{display:block;width:100%;height:100%;object-fit:contain}.about-copy p{font-size:13px;line-height:1.75;color:#aaa9a1}.about-copy .dialog-intro{font-size:16px;color:#f4f3ef;margin-bottom:18px}.about-copy .about-ending{color:#c5f33c}.skill-tags{margin-top:24px}.skill-tags>span{font-size:10px}.contact-socials{display:flex;align-items:center;gap:20px;color:#c5f33c}.contact-socials img{display:block;width:32px;height:32px}.contact-socials>a{display:grid;place-items:center;width:48px;height:48px;transition:opacity .2s,transform .2s}.contact-socials>a:hover{opacity:.75;transform:translateY(-2px)}.contact-palette{display:flex;margin-top:42px;height:45px;gap:4px}.contact-palette>span{flex:1}
@keyframes dialog-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1000px){.footer-controls{gap:19px}.site-footer{font-size:9px}}
@media(max-width:700px){.creative-page{height:auto;min-height:100dvh}.main-canvas{min-height:0}.site-footer{align-items:flex-start;min-height:72px;flex-wrap:wrap;gap:15px;padding-block:22px}.footer-note{font-size:9px}.footer-controls{gap:17px}.detail-dialog{--dialog-gap:32px}.dialog-content{padding:25px}.dialog-topline{margin-bottom:34px}.detail-dialog h2{font-size:44px}.dialog-intro{font-size:13px}.about-layout{grid-template-columns:190px 1fr;gap:20px}.about-copy .dialog-intro{font-size:14px}.about-copy p{font-size:12px}}
@media(max-width:500px){.creative-page{padding-inline:18px}.site-footer{gap:17px;padding-block:19px 24px;justify-content:center}.footer-note{width:100%;justify-content:center}.footer-controls{gap:19px}.footer-social{font-size:9px}.detail-dialog{width:calc(100% - 24px);border-radius:15px}.dialog-content{padding:22px}.detail-dialog h2{font-size:39px}.dialog-eyebrow{font-size:8px}.work-item{padding:20px 14px;gap:12px}.work-item h3{font-size:25px}.work-item p{font-size:11px}.about-layout{grid-template-columns:1fr}.about-art{max-width:320px}.about-copy .dialog-intro{font-size:15px}}
@media(max-height:740px) and (min-width:701px){.creative-page{min-height:690px}.site-footer{min-height:58px;padding-block:16px}}
@media(prefers-reduced-motion:reduce){.detail-dialog[open]{animation:none}.work-item{transition:none}}
@media(max-width:700px){.creative-page{height:100dvh;min-height:100svh}}
@media(max-width:500px){.site-footer{min-height:0;padding-block:16px;gap:10px}.footer-controls{gap:17px}}
@media(max-width:700px){.header-socials{display:flex}.footer-social{display:none}}
</style>
