<script setup lang="ts">
import { scenes } from '~/data/portfolio'
defineProps<{ paused: boolean }>()
const { locale } = useI18n()
</script>
<template>
  <div class="silhouette-reel" :class="{ paused }" :aria-label="locale === 'nl' ? 'Acht scènes uit mijn creatieve wereld' : 'Eight scenes from my creative world'">
    <figure v-for="(scene, index) in scenes" :key="scene.id" class="scene" :class="`scene-${scene.id}`" :style="{ '--scene-color': scene.color }" tabindex="0">
      <HomeAnimatedScene :scene="scene.id" :paused="paused" :label="locale === 'nl' ? scene.altNl : scene.altEn" />
      <span class="scene-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }} <span>↗</span></span>
      <div v-if="scene.id === 'code'" class="code-fragment" aria-hidden="true"><span>const idea =</span><span>make.it.real<span class="code-cursor">_</span></span></div>
      <span v-if="scene.id === 'ai'" class="ai-fragment" aria-hidden="true">human + machine</span>
      <figcaption><span>{{ locale === 'nl' ? scene.nl : scene.en }}</span><span class="scene-dot" aria-hidden="true" /></figcaption>
    </figure>
  </div>
</template>
<style scoped>
.silhouette-reel{display:flex;gap:5px;flex:1;min-height:300px;max-height:650px;width:100%;isolation:isolate}.scene{position:relative;flex:1;min-width:0;overflow:hidden;margin:0;background:var(--scene-color);transition:flex .65s cubic-bezier(.2,.7,.2,1)}.scene picture{display:block;width:100%;height:100%}.scene img{width:100%;height:100%;object-fit:cover;object-position:50% 50%;max-width:none;transition:filter .4s}.scene-number{position:absolute;inset:16px 13px auto;display:flex;justify-content:space-between;font:10px var(--font-mono);color:#080808;z-index:1}.scene-number>span{font-size:16px;opacity:0;transform:translate(-4px,4px);transition:opacity .3s,transform .3s}.scene figcaption{position:absolute;inset:auto 0 0;display:flex;align-items:center;justify-content:space-between;gap:6px;padding:38px 13px 16px;color:#fff;background:linear-gradient(transparent,#000b);font-size:10px;font-weight:500;line-height:1.4;white-space:normal}.scene-dot{flex-shrink:0;width:4px;height:4px;background:var(--scene-color);border-radius:50%}.code-fragment{position:absolute;left:13px;top:48px;display:flex;flex-direction:column;gap:3px;font:9px/1.5 var(--font-mono);color:#111}.code-cursor{animation:cursor-blink 1s steps(1) infinite}.ai-fragment{position:absolute;top:46px;left:13px;font:8px var(--font-mono);color:#111}
@media(hover:hover) and (min-width:1001px){.scene:hover,.scene:focus-visible{flex:2.4}.scene:hover .scene-number>span,.scene:focus-visible .scene-number>span{opacity:1;transform:translate(0,0)}}
.scene:focus-visible{outline:2px solid #fff;outline-offset:-4px;z-index:2}.paused .code-cursor{animation-play-state:paused}
@keyframes cursor-blink{50%{opacity:0}}
@media(max-width:1100px) and (min-width:701px){.scene figcaption{font-size:9px;white-space:normal;line-height:1.4;padding-inline:9px}.scene-dot{display:none}.scene-number{left:9px;right:9px}.code-fragment,.ai-fragment{left:9px;font-size:8px}}
@media(max-width:1000px){.silhouette-reel{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:4px;min-height:350px;max-height:none}.scene img{object-position:50% 42%}.scene-number{inset:11px 10px auto;font-size:8px}.scene figcaption{padding:30px 10px 12px;font-size:9px;line-height:1.4;white-space:normal}.scene-dot{display:none}.code-fragment{top:33px;left:10px;font-size:7px}.ai-fragment{top:33px;left:10px;font-size:6px}}
@media(max-width:500px){.silhouette-reel{min-height:260px}.scene figcaption{font-size:8px;padding-inline:8px}.scene-number{left:8px;right:8px}.code-fragment,.ai-fragment{display:none}}
@media(prefers-reduced-motion:reduce){.scene,.scene img,.scene-number>span{transition:none}.code-cursor{animation:none}}
@media(max-width:350px){.silhouette-reel{min-height:240px}}
</style>
