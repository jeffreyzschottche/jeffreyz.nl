<script setup lang="ts">
defineProps<{ kind: string }>()
</script>

<template>
  <div class="artwork" :class="kind" aria-hidden="true">
    <div v-if="kind === 'automation'" class="gear" />
    <template v-else-if="kind === 'software'"><div class="code-frame"/><span class="code-block block-one"/><span class="code-block block-two"/><span class="code-block block-three"/></template>
    <template v-else-if="kind === 'ai'"><span class="ai-backdrop"/><img src="/images/services/android.webp" alt="" loading="lazy" class="android"/><span class="ai-blue"/></template>
    <div v-else-if="kind === 'music'" class="music-notes" aria-hidden="true"><span>♪</span><span>♫</span><span>♪</span></div>
    <img v-else-if="kind === 'three-d'" src="/images/services/sculpture.webp" alt="" loading="lazy" class="sculpture" />
    <template v-else-if="kind === 'writing'"><img src="/images/typewriter.webp" alt="" loading="lazy" class="writing-typewriter" /><span class="writing-blue"/></template>
    <template v-else-if="kind === 'design'"><div class="design-grid"><span v-for="n in 9" :key="n" :class="`square-${n}`"/></div><div class="design-sphere"/></template>
    <template v-else-if="kind === 'strategy'"><span class="blue-sun"/><img src="/images/services/mountains.webp" alt="" loading="lazy" class="mountains"/></template>
    <template v-else-if="kind === 'product'"><span class="product-block block-a"/><span class="product-block block-b"/><div class="glass-cube"><div v-for="side in ['front', 'back', 'left', 'right', 'top', 'bottom']" :key="side" class="cube-face" :class="side"><span v-for="n in 9" :key="n"/></div></div></template>
  </div>
</template>

<style scoped>
.artwork{position:absolute;inset:0;transition:transform .65s cubic-bezier(.2,.7,.2,1);transform-origin:65% 35%;pointer-events:none}
.artwork img{position:absolute;object-fit:contain}
.knot{width:76%;height:73%;right:2%;top:0;transform:rotate(14deg);filter:grayscale(1) drop-shadow(3px 8px 6px #0002)}
.gear{position:absolute;right:7%;top:8%;width:70%;aspect-ratio:1;border-radius:50%;background:repeating-conic-gradient(from 0deg,#eef0f2 0deg 8deg,#7b8188 8deg 12deg,#f9fafb 12deg 20deg);filter:drop-shadow(5px 9px 7px #0003);mask:radial-gradient(circle at center,transparent 0 19%,#000 20% 56%,transparent 57%),repeating-conic-gradient(#000 0 16deg,transparent 16deg 24deg)}
.gear:after{content:'';position:absolute;inset:31%;border-radius:50%;background:#9da3a8;box-shadow:inset 3px 4px 5px #fff9,inset -4px -5px 7px #34383d}
.code-frame{position:absolute;width:64%;height:58%;right:-4%;top:-6%;border:18px ridge #1743ff;box-shadow:-12px 8px 0 #061763,-18px 12px 0 #133ce1;transform:skewY(-4deg)}
.code-block{position:absolute;background:linear-gradient(130deg,#3b65ff,#0034f3 70%);box-shadow:inset -7px -5px 0 #09249b,6px 6px 0 #00165b}
.block-one{width:28%;height:23%;left:35%;top:35%}.block-two{width:16%;height:18%;left:21%;top:23%}.block-three{width:18%;height:17%;right:0;top:0}
.ai-backdrop{position:absolute;right:0;top:0;width:45%;height:58%;background:#0c0d0d}
.android{height:106%;width:73%;right:-9%;top:-5%;filter:grayscale(1)}
.ai-blue{position:absolute;top:8%;right:29%;width:25%;height:27%;background:#123fff;mix-blend-mode:hard-light}
.record{position:absolute;top:8%;right:2%;width:76%;aspect-ratio:1;border-radius:50%;border:2px solid #666;background:repeating-radial-gradient(circle,#141414 0px,#141414 1px,#292929 2px,#090909 3px);box-shadow:0 0 0 4px #070707,0 0 0 5px #414141;transform:rotate(-20deg) scaleY(.9)}
.record:after{content:'';position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 20deg,transparent,#ffffff30 12%,transparent 22%,transparent 45%,#ffffff22 59%,transparent 73%)}
.record-label{position:absolute;inset:35%;border-radius:50%;background:#1647ff;display:grid;place-items:center;z-index:1}.record-label i{width:3px;height:3px;background:#efefef;border-radius:50%}
.tonearm{position:absolute;right:9%;top:11%;height:51%;width:9%;border-right:5px ridge #c7c7c7;border-bottom:5px ridge #999;border-radius:0 0 16px 0;transform:rotate(21deg);transform-origin:top}.tonearm i{position:absolute;width:10px;height:18px;background:#ccc;bottom:-12px;left:-2px;transform:rotate(23deg)}
.music-notes{position:absolute;inset:8% 8% 4% 16%;color:#16191b;font-family:Georgia,serif;font-weight:700;filter:drop-shadow(5px 8px 4px #0002)}
.music-notes span{position:absolute;line-height:.8;font-size:clamp(70px,13cqw,150px)}.music-notes span:nth-child(1){left:4%;top:17%;transform:rotate(-12deg)}.music-notes span:nth-child(2){right:5%;top:2%;font-size:clamp(100px,19cqw,210px);color:#1647ff}.music-notes span:nth-child(3){left:28%;bottom:0;transform:rotate(10deg)}
.sculpture{width:66%;height:78%;right:2%;top:2%;transform:rotate(-12deg);filter:drop-shadow(5px 9px 8px #0002)}
.paper-stack{position:absolute;right:8%;top:8%;width:52%;height:63%;transform:rotate(-12deg)}
.writing-typewriter{width:82%;height:78%;right:4%;top:6%;object-fit:contain!important;transform:rotate(-5deg);filter:drop-shadow(4px 8px 6px #0003)}
.paper-stack>span,.paper{position:absolute;inset:0;background:#efefea;box-shadow:1px 3px 8px #0004}.paper-stack>span:first-child{transform:rotate(-8deg) translate(-9px,6px);background:#afafaa}.paper-stack>span:nth-child(2){transform:rotate(5deg) translate(4px,4px);background:#d2d2cd}
.paper{padding:13% 10%;background:linear-gradient(125deg,#e6e5df,#faf9f6)}.paper p{font-family:monospace;font-size:2.4cqw;line-height:1.7;letter-spacing:.025em;color:#262626;margin:0}
.writing-blue{position:absolute;width:10%;height:28%;background:#123cff;right:7%;top:56%}
.design-grid{position:absolute;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);width:70%;height:88%;right:0;top:0}.design-grid span{border-right:1px solid #65656066;border-bottom:1px solid #65656066}.square-2,.square-4{background:#1644ff}.square-6,.square-8{background:#060707}
.design-sphere{position:absolute;top:25%;right:30%;width:30%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 32% 25%,white 0%,#e4e4e1 15%,#999b9c 44%,#3e4144 69%,#131518 91%);box-shadow:9px 10px 13px #0003}
.blue-sun{position:absolute;width:23%;aspect-ratio:1;border-radius:50%;background:#1644ff;right:25%;top:19%}
.mountains{width:123%;height:86%;max-width:none;left:-9%;bottom:0;object-fit:cover!important;object-position:top}
.product-block{position:absolute;background:#080909}.block-a{width:53%;height:46%;top:0;left:0}.block-b{width:47%;height:51%;bottom:0;right:0}
.glass-cube{--edge:42cqw;position:absolute;width:var(--edge);height:var(--edge);top:18%;right:17%;transform-style:preserve-3d;transform:perspective(700px) rotateX(-23deg) rotateY(-32deg) rotateZ(0deg)}
.cube-face{position:absolute;inset:0;border:1px solid #efefefa6;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);background:linear-gradient(130deg,#ffffff26,#b4b9bd10 45%,#f0f3f455);backface-visibility:visible}
.cube-face span{border:.5px solid #ededed88;background:linear-gradient(135deg,#fff0,#fff1 70%,#ffffff50)}
.front{transform:translateZ(calc(var(--edge)/2))}.back{transform:rotateY(180deg) translateZ(calc(var(--edge)/2))}.left{transform:rotateY(-90deg) translateZ(calc(var(--edge)/2))}.right{transform:rotateY(90deg) translateZ(calc(var(--edge)/2))}.top{transform:rotateX(90deg) translateZ(calc(var(--edge)/2))}.bottom{transform:rotateX(-90deg) translateZ(calc(var(--edge)/2))}
</style>
