<script setup lang="ts">
</script>

<template>
  <div ref="collageRef" class="collage" aria-hidden="true">
    <div class="checkerboard" />
    <img src="/images/cloud.webp" class="cloud cloud-back float-layer" data-depth="0.4" alt="" />
    <img src="/images/chrome-cube.png" alt="" class="sculpture chrome-cube-top float-layer" data-depth="0.8" />
        <img src="/images/chrome-ribbon.webp" alt="" class="sculpture chrome-sculpture-right float-layer" data-depth="1.2" />
    <img src="/images/pocket-watch.webp" alt="" class="pocket-watch float-layer" data-depth="0.6" />
    <img src="/images/sunflower.png" class="bust sunflower float-layer" data-depth="0.5" alt="" />
    <img src="/images/chrome-knot.webp" alt="" class="sculpture chrome-knot-small float-layer" data-depth="1.3" />
    <img src="/images/cloud.webp" class="cloud cloud-right float-layer" data-depth="0.7" alt="" />
    <div class="portrait-sun" />
    <img src="/images/image-jz.png" class="portrait" alt="Jeffrey Zschottche" fetchpriority="high" />

    <img src="/images/chrome-ribbon.webp" alt="" class="chrome-ribbon float-layer" data-depth="0.8" />
    <img src="/images/rose.webp" class="rose float-layer" data-depth="1.1" alt="" />
    <img src="/images/typewriter.webp" alt="" class="typewriter float-layer" data-depth="0.7" />
    <HomeArtObject kind="drop" class="drop-left float-layer" data-depth="1.3" />
    <HomeArtObject v-for="n in 5" :key="n" kind="star" :class="`spark spark-${n} float-layer`" :style="{ color: '#f6b51f' }" data-depth="1" />
    <div class="scene-coordinate">52°05′ N &nbsp; 05°07′ E</div>
  </div>
  <div class="collage collage-foreground" aria-hidden="true">
    <img src="/images/cloud.webp" class="cloud cloud-front-left float-layer" data-depth="1.2" alt="" />
    <img src="/images/cloud.webp" class="cloud cloud-front-right float-layer" data-depth="1" alt="" />
    <img src="/images/chrome-knot.webp" alt="" class="sculpture chrome-knot-bottom float-layer" data-depth="1.4" />
  </div>
</template>

<style scoped>
.sculpture,.pocket-watch,.typewriter,.chrome-ribbon{position:absolute;object-fit:contain;filter:drop-shadow(7px 12px 12px #152b5826)}.collage{position:absolute;inset:0;pointer-events:none;overflow:hidden}.checkerboard{position:absolute;inset:0 0 0 49%;background-color:#fff;background-image:conic-gradient(#33363d 25%,#fff 0 50%,#33363d 0 75%,#fff 0);background-size:clamp(130px,14vw,230px) clamp(130px,14vw,230px);mask-image:linear-gradient(to bottom,#000b,#000 32%,#000d 75%,#0002)}.checkerboard:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 20%,#fff5 65%,#fffe8 100%)}.portrait{position:absolute;z-index:5;height:86%;width:54%;object-fit:contain;object-position:center bottom;bottom:0;left:30%;filter:drop-shadow(12px 6px 18px #152b581c)}.cloud{position:absolute;object-fit:contain;filter:drop-shadow(0 12px 20px #bbcafa15)}.cloud-back{width:24%;left:23%;top:10%;z-index:2;transform:rotate(-8deg)}.cloud-right{width:25%;right:0;top:35%;z-index:3}.cloud-front-left{width:42%;left:15%;bottom:-11%;z-index:9;transform:rotate(-12deg)}.cloud-front-right{width:36%;right:-5%;bottom:-3%;z-index:9}.bust{position:absolute;width:18%;height:37%;object-fit:contain;right:4%;top:31%;z-index:4;filter:drop-shadow(8px 12px 10px #1b28462a)}.rose{position:absolute;height:39%;width:20%;object-fit:contain;left:36%;bottom:0%;z-index:7;transform:rotate(-17deg)}.chrome-cube-top{width:14vw;height:15vw;transform:rotate(-8deg);left:33%;top:13%;z-index:2}.chrome-sculpture-right{width:11vw;height:22vw;transform:rotate(24deg);right:16%;top:15%;z-index:3}.chrome-knot-small{width:7vw;height:7vw;transform:rotate(45deg);right:4%;top:53%;z-index:5}.chrome-knot-bottom{width:23vw;height:23vw;left:56%;bottom:-13%;transform:rotate(22deg);z-index:10}.drop-left{height:13%;width:3%;left:29%;top:55%;z-index:7}.pocket-watch{width:9vw;height:38%;right:17%;top:24%;z-index:6;transform:rotate(10deg);transform-origin:50% 0;object-position:center bottom}.typewriter{width:21%;height:28%;right:3%;bottom:12%;z-index:8;transform:rotate(-9deg)}.chrome-ribbon{width:11%;height:36%;left:35%;top:48%;z-index:6;transform:rotate(-20deg)}.scene-caption{position:absolute;right:5.5%;top:19%;font-size:8px;line-height:2.15;letter-spacing:.36em;z-index:3;font-weight:600}.scene-caption>span{display:block;width:33px;height:1px;background:#75787e;margin-top:20px}.spark{color:white;width:20px;height:20px;z-index:8}.spark-1{top:23%;left:29%}.spark-2{top:47%;left:27%;width:28px;height:28px}.spark-3{top:9%;left:43%;width:14px;height:14px}.spark-4{bottom:22%;right:4%;color:#1745e5}.spark-5{top:67%;left:33%;width:15px;height:15px}.scene-coordinate{position:absolute;right:4%;bottom:15%;font-size:7px;letter-spacing:.22em;writing-mode:vertical-rl;z-index:10;color:#555e6e}

@media(min-width:1600px){.portrait{width:50%;left:32%;height:86%}}
@media(max-width:900px) and (min-width:651px){
  .portrait{left:24%;width:70%;height:80%}
  .scene-caption{right:4%;top:18%}
  .pocket-watch{top:27%;right:12%;width:11vw;height:34%}
  .bust{right:0;width:22%}
  .cloud-front-left{width:50%;left:17%}
  .chrome-ribbon{left:41%}
  .rose{left:44%}
  .typewriter{right:1%;height:25%;width:27%}
}
@media(max-width:650px){
  .checkerboard{left:42%;background-size:116px 116px;mask-image:linear-gradient(#0009,#000 25%,#0009 53%,transparent 78%)}
  .portrait{top:auto;bottom:0;left:15%;height:85%;width:auto;max-width:none;object-fit:contain;object-position:center bottom}
  .cloud-back{width:51%;left:-7%;top:12%}
  .chrome-cube-top{width:21vw;height:22vw;left:29%;top:15%;transform:rotate(-8deg)}
  .chrome-sculpture-right{width:17vw;height:30vw;right:4%;top:12%;transform:rotate(16deg)}
  .pocket-watch{width:14vw;height:31vw;top:24%;right:2%;transform:rotate(-12deg)}
  .bust{width:25%;height:20%;top:38%;right:-8%}
  .cloud-right{width:40%;top:32%;right:-18%}
  .scene-caption{display:none}
  .chrome-ribbon{left:5%;top:33%;height:19%;width:12%;transform:rotate(-28deg)}
  .rose{height:22%;width:23%;left:6%;bottom:38%;transform:rotate(-16deg)}
  .typewriter{width:30%;height:15%;right:-1%;bottom:25%;transform:rotate(-8deg)}
  .cloud-front-left{width:48%;bottom:44%;left:-30%;transform:rotate(-12deg)}
  .cloud-front-right{width:47%;bottom:20%;right:-18%}
  .chrome-knot-small{width:10vw;height:10vw;right:2%;top:52%}
  .chrome-knot-bottom{width:24vw;height:24vw;left:auto;right:-9%;bottom:5%;opacity:.9}
  .drop-left{top:26%;left:9%;height:9%;width:5%}
  .spark-1{left:17%;top:24%}
  .spark-2{left:8%;top:44%;width:18px;height:18px}
  .spark-3{left:80%;top:11%}
  .spark-4{bottom:6%;right:23%;color:white}
  .spark-5{left:88%;top:43%}
  .scene-coordinate{display:none}
}
</style>

<style scoped>
/* Only the foreground escapes the hero; the rest of the collage stays cropped. */
.collage-foreground{overflow:visible;z-index:12}
@media(max-width:650px){
  .collage-foreground .cloud-front-left{width:62%;left:5%;bottom:-7%;transform:rotate(-12deg)}
  .collage-foreground .cloud-front-right{width:58%;right:-8%;bottom:-5%}
  .collage-foreground .chrome-knot-bottom{width:32vw;height:32vw;right:9%;bottom:-7%;opacity:1}
}
.spark{color:#f6b51f !important}
:deep(.spark){color:#f6b51f !important}

/* Gele zon cirkel - bedekt linker schouder afsnijding */
.portrait-sun{display:none}
@media(max-width:1100px){
  .portrait-sun{display:block;position:absolute;z-index:6;bottom:0%;left:-5%;width:45vw;height:45vw;border-radius:50%;background:#f6b51f}
}
@media(max-width:650px){
  .portrait-sun{bottom:-5%;left:-25%;width:60vw;height:60vw}
}
</style>
