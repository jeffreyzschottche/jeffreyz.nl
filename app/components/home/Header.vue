<script setup lang="ts">
import type { PortfolioPanel } from '~/data/portfolio'
defineProps<{ active: PortfolioPanel }>()
const emit = defineEmits<{ navigate: [panel: PortfolioPanel] }>()
const { locale } = useI18n()
const links = computed(() => [
  { id: 'home' as const, label: 'Start', href: '#home' },
  { id: 'projects' as const, label: locale.value === 'nl' ? 'Werk' : 'Work', href: '#projects' },
  { id: 'about' as const, label: locale.value === 'nl' ? 'Over mij' : 'About', href: '#about' },
])
</script>
<template>
  <header class="site-header">
    <a class="logo" href="#home" aria-label="Jeffreyz — home" @click.prevent="emit('navigate', 'home')">jeffreyz<span>©</span></a>
    <nav class="nav-pill" :aria-label="locale === 'nl' ? 'Hoofdnavigatie' : 'Main navigation'">
      <a v-for="link in links" :key="link.id" :href="link.href" :class="{ active: active === link.id }" :aria-current="active === link.id ? 'page' : undefined" @click.prevent="emit('navigate', link.id)">{{ link.label }}</a>
      <a class="nav-contact" href="#contact" @click.prevent="emit('navigate', 'contact')">Let’s talk <span aria-hidden="true">↗</span></a>
    </nav>
  </header>
</template>
<style scoped>
.site-header{display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%;padding-block:30px;flex-shrink:0}.logo{font-size:38px;font-weight:700;letter-spacing:-2.6px;line-height:1;white-space:nowrap}.logo span{display:inline-block;font-size:15px;vertical-align:top;letter-spacing:0;margin:3px 0 0 5px}.nav-pill{display:flex;align-items:center;gap:3px;border-radius:100px;padding:5px;background:#f5f4f0;color:#111}.nav-pill a{display:flex;align-items:center;justify-content:center;gap:24px;min-height:40px;padding:0 23px;border-radius:100px;font-size:12px;font-weight:500;transition:background .2s,color .2s}.nav-pill a:hover{background:#e2e1dd}.nav-pill a.active{background:#161616;color:#fff}.nav-pill .nav-contact{background:#c5f33c;margin-left:3px;padding-inline:22px 16px}.nav-pill .nav-contact:hover{background:#b1e31f}.nav-contact span{font-size:21px;line-height:1}
@media(max-width:700px){.site-header{padding-block:24px;gap:16px}.logo{font-size:32px}.nav-pill a{padding-inline:15px;font-size:11px}.nav-pill .nav-contact{padding-inline:15px 12px;gap:14px}}
@media(max-width:500px){.site-header{align-items:flex-start;flex-wrap:wrap;padding-block:22px 20px;gap:21px}.logo{font-size:33px}.nav-pill{margin-left:auto}.nav-pill a{min-height:34px;padding-inline:12px;font-size:11px}.nav-pill .nav-contact{gap:10px;padding-inline:12px}.nav-contact span{font-size:18px}}
@media(max-width:450px){.site-header{gap:20px}.nav-pill{width:100%;justify-content:space-between}.nav-pill a{flex:1}.nav-pill .nav-contact{flex:1.3}}
@media(max-width:500px){.site-header{padding-block:20px 12px;gap:14px}.nav-pill a{white-space:nowrap}.nav-pill .nav-contact{gap:8px}}
</style>
