<script setup lang="ts">
defineProps<{ kind: string }>()
const id = useId()
</script>

<template>
  <svg class="project-texture" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <filter :id="`${id}-grain`" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".95" numOctaves="3" seed="23" result="noise"/>
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.4 1.4 1.4 0 -1.9" result="speckle"/>
        <feComposite in="SourceGraphic" in2="speckle" operator="in"/>
      </filter>
      <linearGradient :id="`${id}-shade`" x1="0" y1="1" x2=".9" y2=".2"><stop offset="0" stop-color="currentColor" stop-opacity=".08"/><stop offset=".6" stop-color="currentColor" stop-opacity=".5"/><stop offset="1" stop-color="currentColor"/></linearGradient>
      <radialGradient :id="`${id}-fade`" cx="100%" cy="50%" r="95%"><stop stop-color="white"/><stop offset="1" stop-color="black"/></radialGradient>
      <mask :id="`${id}-mask`"><rect width="400" height="300" :fill="`url(#${id}-fade)`"/></mask>
    </defs>
    <g :filter="`url(#${id}-grain)`" :mask="`url(#${id}-mask)`">
      <rect width="400" height="300" fill="currentColor" opacity=".12" stroke="none"/>
      <path v-if="kind === 'aitje'" d="M277 325C276 229 297 118 358 66C393 36 424 34 459 40L474 92C419 62 375 89 349 139C321 192 315 259 317 325Z" :fill="`url(#${id}-shade)`" stroke="none"/>
      <path v-else-if="kind === 'media'" d="M238 127 416 32 416 90 291 157 291 216 416 149 416 203 238 300Z" :fill="`url(#${id}-shade)`" stroke="none"/>
      <path v-else d="M252 333C222 261 236 151 308 91C354 53 410 40 457 51L439 105C397 83 353 106 327 139C288 187 286 257 304 325Z" :fill="`url(#${id}-shade)`" stroke="none"/>
    </g>
  </svg>
</template>

<style scoped>
.project-texture{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
</style>
