<script setup lang="ts">
defineProps<{ project: { name: string; kind: string; category: string; tagline: string; details: string }; index: number }>()
defineEmits<{ select: [project: { name: string; kind: string; category: string; tagline: string; details: string }] }>()
</script>

<template>
  <a href="#contact" class="project-card" @click.prevent="$emit('select', project)" :class="project.kind" :aria-label="`Get in touch about ${project.name.replace('\n', ' ')}`">
    <HomeProjectTexture :kind="project.kind" />
    <div class="card-top"><span class="project-index">{{ String(index + 1).padStart(2, '0') }} <i /></span><span>{{ project.category }}</span></div>
    <div class="project-identity">
      <div class="project-name"><svg v-if="project.kind === 'aitje'" class="aitje-mark" viewBox="0 0 70 90" aria-hidden="true"><path d="M35 4C20 4 4 31 4 53c0 21 13 33 31 33s31-12 31-33C66 31 50 4 35 4Z"/><path d="M24 43h23v21H24z" fill="currentColor" stroke="none"/><path d="M25 48 17 38m17 5V32M24 55H13m15 8-8 10"/><circle cx="16" cy="36" r="3" fill="currentColor"/><circle cx="34" cy="30" r="3" fill="currentColor"/><circle cx="11" cy="55" r="3" fill="currentColor"/><circle cx="18" cy="75" r="3" fill="currentColor"/></svg><h3>{{ project.name }}</h3></div>
      <p class="tagline">{{ project.tagline }}</p>
    </div>
    <p class="project-details">{{ project.details }}</p>
    <span class="project-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></span>
  </a>
</template>

<style scoped>
.project-card{--accent:#f1db59;position:relative;isolation:isolate;container-type:inline-size;min-height:0;aspect-ratio:1.32;background:#060807;color:var(--accent);border:1px solid #3a3c39;border-radius:9px;overflow:hidden;box-shadow:0 1px 3px #0002}
.media{--accent:#8be57b;aspect-ratio:1.44}.creative{--accent:#f16456;aspect-ratio:1.57}
.card-top{position:absolute;z-index:3;top:7%;left:5.5%;right:7%;display:flex;align-items:center;justify-content:space-between;gap:12px;text-transform:uppercase;font-size:2cqw;font-weight:700;letter-spacing:.22em}
.project-index{display:flex;align-items:center;gap:10px}.project-index i{width:8.5cqw;height:1px;background:currentColor;opacity:.8}
.project-identity{position:absolute;z-index:3;top:27%;left:9%;right:5%}
.project-name{display:flex;align-items:center;gap:3cqw}
h3{white-space:pre-line;font-size:13.5cqw;font-weight:700;line-height:.87;letter-spacing:-.06em;margin:0}
.aitje h3{font-size:16cqw;letter-spacing:-.04em}.aitje-mark{width:18cqw;height:23cqw;flex-shrink:0;stroke-width:3.5}
.media .project-identity{top:23%;left:7.5%}.creative .project-identity{top:24%;left:7.5%}
.creative h3{font-size:9.5cqw;line-height:.97;letter-spacing:-.045em}
.tagline{white-space:pre-line;font-size:2.45cqw;letter-spacing:.36em;text-transform:uppercase;line-height:1.7;color:#e1e3e1;margin:3.6cqw 0 0}
.project-details{position:absolute;left:6%;bottom:6%;z-index:3;white-space:pre-line;font-size:1.8cqw;font-weight:500;letter-spacing:.2em;text-transform:uppercase;line-height:1.5;color:#878c88;margin:0}
.project-arrow{position:absolute;z-index:3;bottom:5.5%;right:6%;width:11.5%;aspect-ratio:1;border:1.5px solid currentColor;border-radius:50%;display:grid;place-items:center;transition:background .25s,color .25s}
.project-arrow svg{width:53%;height:53%}.project-card:hover .project-arrow{background:var(--accent);color:#080808}.project-card:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
@media(min-width:701px){.project-card{aspect-ratio:auto;min-height:220px}}
@media(prefers-reduced-motion:reduce){.project-arrow{transition:none}}
</style>
