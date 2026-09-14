<template>
  <figure class="doodle-animation playing">
    <div class="doodle-viewport" role="img" aria-label="A curious doodle character shrugs, thinks, and has an idea.">
      <img class="doodle-strip" src="/images/doodle/storyboard-strip.png" width="3816" height="330" alt="" loading="lazy" aria-hidden="true">
    </div>
  </figure>
</template>

<style scoped>
.doodle-animation{position:relative;width:min(85%,280px);margin:28px 0 0 3%}
.doodle-viewport{aspect-ratio:318 / 330;overflow:hidden;mix-blend-mode:multiply}
.doodle-strip{display:block;width:1200%;max-width:none;height:100%;animation:doodle-frames 6s steps(12,end) infinite}
@keyframes doodle-frames{to{transform:translateX(-100%)}}
@media(max-width:700px){.doodle-animation{width:min(75%,240px);margin:24px 0 0 3%}}
@media(prefers-reduced-motion:reduce){.doodle-strip{animation:none}}
</style>
