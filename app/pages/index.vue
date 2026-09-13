<script setup lang="ts">
useSeoMeta({ title: 'Jeffreyz — Digital builder', description: 'Ideas, people, systems. Jeffrey builds digital experiences with curiosity and a different perspective.', themeColor: '#173df5' })
</script>

<template>
  <main>
    <HomeHero />
    <HomeServices />
    <HomeProjects />
    <HomeNextStep />
    <HomeMagazine />
    <HomeFinalNotes />
    <footer><a class="footer-logo" href="#home">jeffreyz<span>®</span></a><a href="mailto:hello@jeffreyz.nl">Say hello ↗</a><span>Always curious.</span><a href="#home">Back to top ↑</a></footer>
  </main>
</template>

<style scoped>
footer{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:40px 6%;font-size:13px;background:#0647ff;color:#fff}footer a{color:#fff;transition:color .2s,opacity .2s}footer a:hover{color:#dfe7ff;opacity:.9}.footer-logo{font-size:26px;font-weight:700;letter-spacing:-1.5px}.footer-logo span{font-size:10px;vertical-align:top;margin-left:4px}footer>span{color:#fff}@media(max-width:650px){footer{flex-wrap:wrap}footer>span{display:none}}
</style>
