<script setup lang="ts">
const menuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('home')
const links = [{ label: 'Start', href: '#home', id: 'home' }, { label: 'What I do', href: '#about', id: 'about' }, { label: 'Working on', href: '#projects', id: 'projects' }, { label: 'When', href: '#contact', id: 'contact' }, { label: 'Why', href: '#why', id: 'why' }]

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 50
    // Scroll spy - find which section is currently in view
    const allSections = [...links.map(l => l.id), 'tldr']
    const sections = allSections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const viewportMiddle = window.scrollY + window.innerHeight * 0.4

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i]
      const sectionTop = section.offsetTop
      if (viewportMiddle >= sectionTop) {
        activeSection.value = allSections[i]
        break
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>
<template>
  <header class="site-header" :class="{ scrolled, 'past-hero': activeSection !== 'home' }">
    <a href="#home" class="logo" aria-label="Jeffreyz home">jeffreyz<span>©</span></a>
    <HomeLanguageToggle class="lang-center" />
    <div class="nav-pill">
      <nav aria-label="Main navigation" class="desktop-nav">
        <a v-for="link in links" :key="link.href" :href="link.href" :class="{ active: activeSection === link.id }">{{ link.label }}</a>
      </nav>
      <a class="header-cta" href="#tldr">TL;DR <span>↓</span></a>
    </div>
    <HomeLanguageToggle class="lang-mobile" />
    <button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? 'Close menu' : 'Open menu'" @click="menuOpen = !menuOpen"><span>/ {{ menuOpen ? 'CLOSE' : 'MENU' }}</span><svg viewBox="0 0 24 24"><path :d="menuOpen ? 'M5 5l14 14M19 5L5 19' : 'M3 7h18M3 12h18M3 17h18'" /></svg></button>
    <nav v-if="menuOpen" id="mobile-menu" class="mobile-nav" aria-label="Mobile navigation" @keydown.esc="menuOpen = false"><a v-for="link in links" :key="link.href" :href="link.href" :class="{ active: activeSection === link.id }" @click="menuOpen = false">{{ link.label }} <span>↗</span></a><a href="#tldr" class="mobile-nav-cta" @click="menuOpen = false">TL;DR ↓</a></nav>
  </header>
</template>
<style scoped>
.site-header{position:fixed;z-index:30;top:0;left:0;width:100%;height:112px;display:flex;align-items:center;padding:0 5.5%;gap:20px;transition:all .3s}
.scrolled{height:80px;background:#1a3fe0;border-radius:50px;margin:12px 5.5% 0;width:calc(100% - 11%);padding:8px 8px 8px 28px}
.scrolled .logo{color:white}
.scrolled .nav-pill{background:transparent;padding:0}
.scrolled .desktop-nav a{color:white}
.scrolled .desktop-nav a.active{background:rgba(255,255,255,.15)}
.scrolled .desktop-nav a.active:before{background:#ff3333}
.scrolled :deep(.lang-current){background:transparent;border-color:rgba(255,255,255,.3)}

.logo{font-size:35px;font-weight:700;color:white;letter-spacing:-2px;line-height:1}
.logo span{font-size:16px;letter-spacing:0;vertical-align:top;margin-left:5px}

.lang-center{position:absolute;left:49%;transform:translateX(-50%);z-index:5}
.lang-mobile{display:none}

.nav-pill{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-radius:50px;padding:6px 6px 6px 12px;margin-left:auto;margin-right:1%}
.desktop-nav{display:flex;gap:2px}
.desktop-nav a{position:relative;font-size:13px;font-weight:500;padding:8px 14px;border-radius:20px;color:#1a1a2e;transition:all .2s;text-align:center}
.desktop-nav a:before{content:'';position:absolute;width:4px;height:4px;background:transparent;border-radius:50%;left:6px;top:50%;transform:translateY(-50%);transition:background .2s}
.desktop-nav a:hover{color:#0a0a15;background:rgba(0,0,0,.06)}
.desktop-nav a.active{color:#0a0a15;background:rgba(0,0,0,.08)}
.desktop-nav a.active:before{background:#ff5555}

.header-cta{display:flex;align-items:center;gap:8px;background:#ff4444;color:white;border-radius:20px;padding:8px 16px;font-size:12px;font-weight:500;letter-spacing:.03em;transition:background .2s}
.header-cta:hover{background:#e63333}
.header-cta span{font-size:14px}

.menu-toggle{display:none}
.mobile-nav{position:absolute;left:16px;right:16px;top:90px;background:linear-gradient(135deg,#1a3fe0,#0a2ed0);padding:24px 24px 28px;border-radius:16px;box-shadow:0 20px 60px #07182a44;color:white}
.mobile-nav a{display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.15);color:white;font-size:17px;font-weight:500;letter-spacing:-.01em}
.mobile-nav a:nth-last-child(2){border:0}
.mobile-nav a span{font-size:18px;opacity:.6}
.mobile-nav a.active{color:#ff3333}
.mobile-nav a.active span{color:white}
.mobile-nav-cta{display:block;margin-top:20px;background:#ff3333;color:white;text-align:center;padding:14px;border-radius:30px;font-size:13px;font-weight:600;letter-spacing:.05em}

@media(max-width:1100px){.nav-pill{gap:4px;padding:5px}.desktop-nav a{padding:10px 12px;font-size:13px}.desktop-nav a.active{padding-left:20px}.header-cta{padding:10px 16px}}
@media(max-width:900px){.nav-pill{display:none}}
@media(max-width:650px){
  .site-header{height:90px;padding:0 7%;justify-content:space-between;gap:0}
  .site-header.scrolled{height:90px;padding:0 7%;background:transparent;border-radius:0;margin:0;width:100%}
  .past-hero .logo{color:#1a3fe0}
  .logo{font-size:30px}
  .nav-pill{display:none}
  .lang-center{display:none}
  .lang-mobile{display:block}
  .lang-mobile :deep(.lang-current){background:#1a3fe0;border:0}
  .lang-mobile :deep(.chevron){stroke:white}
  .menu-toggle{display:flex;align-items:center;justify-content:center;gap:12px;border:0;background:#1a3fe0;color:white;width:130px;padding:12px 16px;border-radius:30px;font-size:11px;font-weight:500;letter-spacing:.08em}
  .menu-toggle svg{width:20px;height:20px;stroke:white;stroke-width:2}
}
</style>
