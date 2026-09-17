<script setup lang="ts">
const { locale, setLocale } = useI18n()
const isOpen = ref(false)
const toggle = () => { isOpen.value = !isOpen.value }
const selectLang = (lang: 'nl' | 'en') => { setLocale(lang); isOpen.value = false }
</script>
<template>
  <div class="lang-toggle" :class="{ open: isOpen }">
    <button class="lang-current" @click="toggle">
      <span v-if="locale === 'nl'" class="flag">🇳🇱</span>
      <span v-else class="flag">🇬🇧</span>
      <svg class="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div v-if="isOpen" class="lang-dropdown">
      <button @click="selectLang('nl')" :class="{ active: locale === 'nl' }">
        <span class="flag">🇳🇱</span> Nederlands
        <svg v-if="locale === 'nl'" class="check" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>
      </button>
      <button @click="selectLang('en')" :class="{ active: locale === 'en' }">
        <span class="flag">🇬🇧</span> English
        <svg v-if="locale === 'en'" class="check" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.lang-toggle{position:relative;z-index:40}
.lang-current{display:flex;align-items:center;gap:6px;background:#1a3fe0;border:2px solid #000;border-radius:20px;padding:8px 12px;cursor:pointer}
.lang-current .flag{font-size:18px;line-height:1}
.chevron{width:14px;height:14px;stroke:white;stroke-width:2.5;fill:none;transition:transform .2s}
.open .chevron{transform:rotate(180deg)}
.lang-dropdown{position:absolute;top:calc(100% + 8px);right:0;background:#1a3fe0;border-radius:12px;padding:6px;min-width:150px;box-shadow:0 10px 30px #0008}
.lang-dropdown button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:0;background:transparent;color:white;font-size:13px;border-radius:8px;cursor:pointer;text-align:left}
.lang-dropdown button:hover{background:#2850f0}
.lang-dropdown button.active{background:#2850f0}
.lang-dropdown .flag{font-size:16px}
.check{width:16px;height:16px;stroke:white;stroke-width:2.5;fill:none;margin-left:auto}
</style>
