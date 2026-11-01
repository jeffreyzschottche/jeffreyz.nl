<script setup lang="ts">
import type { scenes } from '~/data/portfolio'
import { animateArtwork } from '~/utils/animateArtwork'

type SceneId = (typeof scenes)[number]['id']
const props = defineProps<{ scene: SceneId; paused: boolean; label: string }>()
const original = ref<HTMLImageElement>()
const canvas = ref<HTMLCanvasElement>()
const ready = ref(false)
let animation: ReturnType<typeof animateArtwork> = null
let unmounted = false
const handAnimated = computed(() => ['ai', 'music', 'design', 'experiment', 'ideas'].includes(props.scene))
const artworkSource = computed(() => {
  if (props.scene === 'city') return `/images/silhouettes/city-character/${props.paused ? 'poster' : 'loop'}.webp?v=character-poses-1`
  if (handAnimated.value) return `/images/silhouettes/hand-motion/${props.scene}/${props.paused ? 'poster' : 'loop'}.webp?v=hand-poses-3`
  return `/images/silhouettes/${props.scene}${props.scene === 'walk' && !props.paused ? '-motion' : ''}.webp?v=restored-original`
})

function initialize() {
  if (props.scene !== 'code' || animation || unmounted || !original.value?.complete || !original.value.naturalWidth || !canvas.value) return
  try {
    animation = animateArtwork(canvas.value, original.value)
    ready.value = !!animation
    animation?.setPaused(props.paused)
  } catch {
    // The approved, complete original remains visible if WebGL is unavailable.
    animation?.destroy()
    animation = null
    ready.value = false
  }
}
function onContextLost(event: Event) {
  event.preventDefault()
  ready.value = false
  animation?.destroy()
  animation = null
}
watch(() => props.paused, paused => animation?.setPaused(paused))
onMounted(initialize)
onBeforeUnmount(() => { unmounted = true; animation?.destroy() })
</script>

<template>
  <div class="original-art" :data-scene="scene">
    <picture>
      <source v-if="scene === 'walk'" media="(prefers-reduced-motion: reduce)" srcset="/images/silhouettes/walk.webp">
      <source v-if="scene === 'city'" media="(prefers-reduced-motion: reduce)" srcset="/images/silhouettes/city-character/poster.webp">
      <source v-if="handAnimated" media="(prefers-reduced-motion: reduce)" :srcset="`/images/silhouettes/hand-motion/${scene}/poster.webp?v=hand-poses-3`">
      <img ref="original" :src="artworkSource" :alt="label" width="480" :height="['code','ai','city'].includes(scene) ? 480 : 640" @load="initialize">
    </picture>
    <canvas v-if="scene === 'code'" v-show="ready" ref="canvas" class="detail-animation" aria-hidden="true" @webglcontextlost="onContextLost" />
  </div>
</template>

<style scoped>
.original-art{position:relative;display:block;width:100%;height:100%;overflow:hidden}.original-art picture{display:block;width:100%;height:100%}.original-art img,.detail-animation{display:block;width:100%;height:100%;max-width:none;object-fit:cover;object-position:50% 50%}.detail-animation{position:absolute;inset:0;pointer-events:none}
@media(max-width:1000px){.original-art img,.detail-animation{object-position:50% 42%}}
@media(prefers-reduced-motion:reduce){.detail-animation{visibility:hidden}}
</style>
