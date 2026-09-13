<script setup lang="ts">
const gradientId = useId()
defineProps<{ kind: 'drop' | 'star' }>()
</script>
<template>
  <div class="art-object" :class="kind" aria-hidden="true">
    <svg v-if="kind === 'drop'" viewBox="0 0 50 160" class="drop-shape"><defs><linearGradient :id="`${gradientId}-drop`"><stop stop-color="#ffffff"/><stop offset=".22" stop-color="#7385a4"/><stop offset=".48" stop-color="#07152e"/><stop offset=".7" stop-color="#2060ff"/><stop offset=".87" stop-color="#d5e8ff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><path d="M25 2C25 85 7 112 7 135c0 28 36 28 36 0C43 112 25 85 25 2Z" :fill="`url(#${gradientId}-drop)`" stroke="#dce6f8"/></svg>
    <svg v-else viewBox="0 0 40 40"><path d="M20 0Q21 19 40 20Q21 21 20 40Q19 21 0 20Q19 19 20 0" fill="currentColor" stroke="none"/></svg>
  </div>
</template>
<style scoped>
.art-object{position:absolute;pointer-events:none}
.drop-shape{width:100%;height:100%;filter:drop-shadow(5px 8px 5px #21365420)}
.star svg{width:100%;height:100%}
</style>
