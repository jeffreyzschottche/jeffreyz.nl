<script setup lang="ts">
defineProps<{ kind: string }>()
const chromeId = `service-chrome-${useId()}`
const chromeArtwork = {
  gear: '/images/services/chrome-gear.webp',
  sphere: '/images/services/chrome-sphere.webp',
  lotus: '/images/services/chrome-lotus.webp',
}
</script>

<template>
  <div class="artwork" :class="kind" aria-hidden="true">
    <img v-if="kind === 'automation'" :src="chromeArtwork.gear" alt="" loading="lazy" decoding="async" class="gear" />
    <template v-else-if="kind === 'software'">
      <div class="code-frame" />
      <img src="/images/services/vintage-computer.webp" alt="" loading="lazy" decoding="async" class="vintage-computer" />
      <svg class="chrome-code" viewBox="0 0 200 112" focusable="false">
        <defs>
          <linearGradient :id="chromeId" x1="0" y1="0" x2=".2" y2="1">
            <stop offset="0" stop-color="#fcfcfc" />
            <stop offset=".2" stop-color="#92999f" />
            <stop offset=".38" stop-color="#f8fafb" />
            <stop offset=".47" stop-color="#fff" />
            <stop offset=".5" stop-color="#454b52" />
            <stop offset=".64" stop-color="#afb6bd" />
            <stop offset=".81" stop-color="#fff" />
            <stop offset="1" stop-color="#636a70" />
          </linearGradient>
        </defs>
        <path class="code-depth" d="m63 17-51 39 51 39 10-14-34-25 34-25Zm62-12-20-5-31 107 20 5Zm12 12-10 14 34 25-34 25 10 14 51-39Z" />
        <path :fill="`url(#${chromeId})`" stroke="#f0f3f5" stroke-width=".65" d="m63 17-51 39 51 39 10-14-34-25 34-25Zm62-12-20-5-31 107 20 5Zm12 12-10 14 34 25-34 25 10 14 51-39Z" />
      </svg>
    </template>
    <template v-else-if="kind === 'ai'"><span class="ai-backdrop"/><img src="/images/services/android-silver.webp" alt="" loading="lazy" decoding="async" class="android"/></template>
    <template v-else-if="kind === 'music'">
      <img src="/images/services/grand-piano.webp" alt="" loading="lazy" decoding="async" class="music-piano" />
      <div class="music-notes"><span class="chrome-note">♪</span><span class="blue-note">♫</span><span class="chrome-note">♪</span></div>
    </template>
    <img v-else-if="kind === 'three-d'" src="/images/services/sculpture.webp" alt="" loading="lazy" class="sculpture" />
    <template v-else-if="kind === 'writing'">
      <div class="writing-letters">
        <span lang="ru">Ж</span><span lang="zh">文</span><span lang="ja">あ</span><span lang="en-US">A</span>
        <span lang="ru">Я</span><span lang="zh">字</span><span lang="ja">カ</span><span lang="en-US">R</span>
      </div>
      <img src="/images/services/underwood-typewriter.webp" alt="" loading="lazy" decoding="async" class="writing-typewriter" />
    </template>
    <template v-else-if="kind === 'design'"><div class="design-grid"><span v-for="n in 9" :key="n" :class="`square-${n}`"/></div><img :src="chromeArtwork.sphere" alt="" loading="lazy" decoding="async" class="design-sphere"/></template>
    <template v-else-if="kind === 'strategy'"><span class="blue-sun"/><img src="/images/services/mountains.webp" alt="" loading="lazy" class="mountains"/></template>
    <img v-else-if="kind === 'product'" :src="chromeArtwork.lotus" alt="" loading="lazy" decoding="async" class="product-lotus" />
  </div>
</template>

<style scoped>
.artwork{position:absolute;inset:0;transition:transform .65s cubic-bezier(.2,.7,.2,1);transform-origin:65% 35%;pointer-events:none}
.artwork:is(.automation,.ai,.design,.product){filter:grayscale(1)}
.artwork img{position:absolute;object-fit:contain}
.knot{width:76%;height:73%;right:2%;top:0;transform:rotate(14deg);filter:grayscale(1) drop-shadow(3px 8px 6px #0002)}
.gear{right:-1%;top:3%;width:80%;height:85%;transform:rotate(-16deg);filter:drop-shadow(2cqw 3cqw 2cqw #0002)}
.code-frame{position:absolute;width:59%;height:58%;right:-8%;top:-13%;border:5cqw ridge #1743ff;box-shadow:-3cqw 2cqw 0 #061763,-5cqw 3cqw 0 #133ce1;transform:skewY(-4deg)}
.vintage-computer{width:69%;height:95%;right:-5%;bottom:-13%;transform:rotate(8deg);filter:contrast(1.12)}
.chrome-code{position:absolute;width:51%;height:auto;left:19%;top:8%;overflow:visible;transform:rotate(-12deg);filter:drop-shadow(1cqw 2cqw 1.2cqw #0009)}
.code-depth{fill:#555d65;stroke:#a1a7ac;stroke-width:.6;transform:translate(2px,4px)}
.ai-backdrop{position:absolute;right:0;top:0;width:45%;height:58%;background:#111}
.android{height:106%;width:73%;right:-9%;top:-5%;filter:grayscale(1)}
.record{position:absolute;top:8%;right:2%;width:76%;aspect-ratio:1;border-radius:50%;border:2px solid #666;background:repeating-radial-gradient(circle,#141414 0px,#141414 1px,#292929 2px,#090909 3px);box-shadow:0 0 0 4px #070707,0 0 0 5px #414141;transform:rotate(-20deg) scaleY(.9)}
.record:after{content:'';position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 20deg,transparent,#ffffff30 12%,transparent 22%,transparent 45%,#ffffff22 59%,transparent 73%)}
.record-label{position:absolute;inset:35%;border-radius:50%;background:#1647ff;display:grid;place-items:center;z-index:1}.record-label i{width:3px;height:3px;background:#efefef;border-radius:50%}
.tonearm{position:absolute;right:9%;top:11%;height:51%;width:9%;border-right:5px ridge #c7c7c7;border-bottom:5px ridge #999;border-radius:0 0 16px 0;transform:rotate(21deg);transform-origin:top}.tonearm i{position:absolute;width:10px;height:18px;background:#ccc;bottom:-12px;left:-2px;transform:rotate(23deg)}
.music-piano{width:109%;height:92%;max-width:none;right:-28%;bottom:-19%;transform:rotate(-9deg)}
.music-notes{position:absolute;inset:0;font-family:Arial,'Helvetica Neue',sans-serif;font-weight:700}
.music-notes span{position:absolute;display:block;line-height:1;filter:drop-shadow(.7cqw 1cqw .6cqw #0008)}
.chrome-note{color:#d8dde1;background:linear-gradient(165deg,#fff 4%,#939ba3 21%,#f9fcff 34%,#fff 43%,#434b53 46%,#7f8992 55%,#fff 72%,#bec5cb 81%,#58616a 96%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;-webkit-text-stroke:.2cqw #d9dfe4}
.music-notes span:nth-child(1){left:23%;top:12%;font-size:29cqw;transform:rotate(-17deg)}
.music-notes .blue-note{right:8%;top:0;font-size:49cqw;color:#1647ff;transform:rotate(8deg)}
.music-notes span:nth-child(3){left:48%;top:32%;font-size:24cqw;transform:rotate(14deg)}
.sculpture{width:66%;height:78%;right:2%;top:2%;transform:rotate(-12deg);filter:drop-shadow(5px 9px 8px #0002)}
.paper-stack{position:absolute;right:8%;top:8%;width:52%;height:63%;transform:rotate(-12deg)}
.writing-typewriter{width:92%;height:86%;right:-11%;bottom:-12%;transform:rotate(-12deg);filter:contrast(1.12) drop-shadow(-1cqw 1cqw 2cqw #0008)}
.writing-letters{position:absolute;inset:0;color:#1647ff;font-weight:700;line-height:1}
.writing-letters span{position:absolute;font-size:21cqw}
.writing-letters span:nth-child(1){left:20%;top:8%;transform:rotate(-13deg)}
.writing-letters span:nth-child(2){left:47%;top:0;font-size:24cqw;transform:rotate(8deg)}
.writing-letters span:nth-child(3){right:0;top:11%;font-size:24cqw;transform:rotate(14deg)}
.writing-letters span:nth-child(4){left:3%;top:27%;font-size:24cqw;transform:rotate(-9deg)}
.writing-letters span:nth-child(5){left:33%;top:34%;font-size:17cqw;transform:rotate(10deg)}
.writing-letters span:nth-child(6){right:-5%;top:47%;font-size:21cqw}
.writing-letters span:nth-child(7){left:57%;top:26%;font-size:16cqw;transform:rotate(-12deg)}
.writing-letters span:nth-child(8){left:16%;top:60%;font-size:18cqw;transform:rotate(13deg)}
.paper-stack>span,.paper{position:absolute;inset:0;background:#efefea;box-shadow:1px 3px 8px #0004}.paper-stack>span:first-child{transform:rotate(-8deg) translate(-9px,6px);background:#afafaa}.paper-stack>span:nth-child(2){transform:rotate(5deg) translate(4px,4px);background:#d2d2cd}
.paper{padding:13% 10%;background:linear-gradient(125deg,#e6e5df,#faf9f6)}.paper p{font-size:2.4cqw;line-height:1.7;letter-spacing:.025em;color:#262626;margin:0}
.design-grid{position:absolute;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);width:70%;height:88%;right:0;top:0}.design-grid span{border-right:1px solid #6666;border-bottom:1px solid #6666}.square-2,.square-4{background:#a3a3a3}.square-6,.square-8{background:#080808}
.design-sphere{top:20%;right:22%;width:45%;height:52%;filter:drop-shadow(2cqw 3cqw 2cqw #0003)}
.blue-sun{position:absolute;width:23%;aspect-ratio:1;border-radius:50%;background:#1644ff;right:25%;top:19%}
.mountains{width:123%;height:86%;max-width:none;left:-9%;bottom:0;object-fit:cover!important;object-position:top}
.product-lotus{width:91%;height:80%;right:-4%;top:0;transform:rotate(-8deg);filter:drop-shadow(1cqw 3cqw 2cqw #0002)}
</style>
