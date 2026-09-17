<script setup lang="ts">
defineProps<{ service: { title: string; kind: string; caption: string }; index: number }>()
</script>

<template>
  <a class="service-card" :class="[service.kind, { 'is-dark': index % 2 === 1 }]" href="#contact" :aria-label="`Let’s talk about ${service.title.replace('\n', ' ')}`">
    <span class="card-number">{{ String(index + 1).padStart(2, '0') }}</span>
    <HomeServiceArtwork :kind="service.kind" />
    <div class="card-copy"><h3>{{ service.title }}</h3><p>{{ service.caption }}</p></div>
    <svg class="card-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M7 6h11v11" /></svg>
  </a>
</template>

<style scoped>
.service-card{position:relative;isolation:isolate;aspect-ratio:1.16;overflow:hidden;background:radial-gradient(ellipse at 70% 30%,#f5f4f0,#e5e4e0);color:#080909;border-left:1px solid #bdbdb633;border-bottom:1px solid #bdbdb655;container-type:inline-size}
.is-dark{background:#080909;color:#fff}
.service-card:is(.automation,.ai,.design,.product){background:radial-gradient(ellipse at 70% 30%,#f4f4f4,#e4e4e4);color:#080808;border-color:#bdbdbd55}
.card-number{position:absolute;top:6%;left:6%;font-size:10px;z-index:4}
.card-copy{position:absolute;bottom:6%;left:7%;z-index:3;pointer-events:none}
h3{font-size:clamp(16px,8cqw,30px);font-weight:700;line-height:.94;letter-spacing:-.04em;text-transform:uppercase;white-space:pre-line;margin:0 0 12px}
p{white-space:pre-line;text-transform:uppercase;letter-spacing:.2em;font-size:clamp(6px,2.7cqw,10px);line-height:1.4;margin:0}
.card-arrow{position:absolute;bottom:7%;right:6%;width:16px;height:16px;z-index:4;transition:transform .25s}
.service-card:hover .card-arrow{transform:translate(3px,-3px)}
.service-card:focus-visible{outline:3px solid #1744ff;outline-offset:-4px;z-index:5}
.service-card:hover :deep(.artwork){transform:scale(1.045)}
.is-dark:after{content:'';position:absolute;inset:40% 0 0;background:linear-gradient(transparent,#08090980);z-index:1;pointer-events:none}
@media(min-width:701px) and (max-width:1100px){.service-card{aspect-ratio:.96}h3{font-size:8.1cqw;margin-bottom:9px}.card-number{font-size:8px}.card-arrow{width:13px;height:13px}}
@media(max-width:480px){.service-card{aspect-ratio:1.24}h3{font-size:8cqw}p{font-size:2.4cqw}.card-number{font-size:11px}.card-arrow{width:20px;height:20px}}
@media(prefers-reduced-motion:reduce){.card-arrow,.service-card :deep(.artwork){transition:none}}
</style>
