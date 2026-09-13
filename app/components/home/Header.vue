<script setup lang="ts">
const menuOpen = ref(false)
const links = [{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Thoughts', href: '#thoughts' }, { label: 'Contact', href: '#contact' }]
</script>
<template>
  <header class="site-header">
    <a href="#home" class="logo" aria-label="Jeffreyz home">jeffreyz<span>®</span></a>
    <nav aria-label="Main navigation" class="desktop-nav"><a v-for="(link, index) in links" :key="link.href" :href="link.href" :class="{ active: index === 0 }">{{ link.label }}</a></nav>
    <a class="header-hello" href="mailto:hello@jeffreyz.nl">Let’s talk <span>↗</span></a>
    <button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="menuOpen = !menuOpen"><span>{{ menuOpen ? 'Close' : 'Menu' }}</span><svg viewBox="0 0 24 24"><path :d="menuOpen ? 'M5 5l14 14M19 5L5 19' : 'M3 8h18M3 16h18'" /></svg></button>
    <nav v-if="menuOpen" id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation" @keydown.esc="menuOpen = false"><a v-for="link in links" :key="link.href" :href="link.href" @click="menuOpen = false">{{ link.label }} <span>↗</span></a></nav>
  </header>
</template>
<style scoped>
.site-header{position:absolute;z-index:30;top:0;left:0;width:100%;height:112px;display:flex;align-items:center;padding:0 5.5%;gap:65px}.logo{font-size:35px;font-weight:700;color:white;letter-spacing:-2px;line-height:1}.logo span{font-size:10px;letter-spacing:0;vertical-align:top;margin-left:5px}.desktop-nav{display:flex;gap:37px;margin-left:auto}.desktop-nav a{position:relative;font-size:12px;font-weight:500}.desktop-nav a:after{content:'';position:absolute;width:4px;height:4px;background:#2046ed;left:50%;bottom:-11px;border-radius:50%;opacity:0;transition:opacity .2s}.desktop-nav a:hover:after,.desktop-nav a.active:after{opacity:1}.header-hello{display:flex;gap:30px;align-items:center;border:1px solid #b9bac1;border-radius:30px;padding:11px 18px;font-size:12px}.header-hello span{font-size:20px}.menu-toggle{display:none}.mobile-nav{position:absolute;left:16px;right:16px;top:85px;border-radius:8px;background:#faf9f5;padding:20px;box-shadow:0 15px 50px #07182a22}.mobile-nav a{display:flex;justify-content:space-between;padding:15px;border-bottom:1px solid #dededb}.mobile-nav a:last-child{border:0}@media(max-width:900px){.site-header{gap:30px}.desktop-nav{gap:22px}.header-hello{display:none}}@media(max-width:650px){.site-header{height:90px;padding:0 7%}.logo{font-size:30px}.desktop-nav{display:none}.menu-toggle{margin-left:auto;display:flex;align-items:center;gap:10px;border:0;background:#faf9f5d9;padding:10px 14px;border-radius:30px;font-size:11px}}
</style>
