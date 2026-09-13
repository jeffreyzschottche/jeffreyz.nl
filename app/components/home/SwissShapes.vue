<template>
  <div class="swiss-shapes" aria-hidden="true">
    <div class="swiss-float swiss-star"><svg viewBox="0 0 100 100"><path d="m50 0 9 29 26-14-14 26 29 9-29 9 14 26-26-14-9 29-9-29-26 14 14-26L0 50l29-9-14-26 26 14Z"/></svg></div>
    <div class="swiss-float swiss-cube"><div class="swiss-cube-inner"><span class="front"/><span class="back"/><span class="left"/><span class="right"/><span class="top"/><span class="bottom"/></div></div>
    <div class="swiss-float swiss-triangle"><svg viewBox="0 0 80 80"><path d="M40 7 74 68H6Z"/><path class="triangle-inner" d="m40 24 23 39H17Z"/></svg></div>
    <span class="swiss-cross">+</span>
  </div>
</template>

<style scoped>
.swiss-shapes{position:absolute;inset:0;pointer-events:none;z-index:1;perspective:800px;color:#0647ff}
.swiss-float{position:absolute;will-change:transform}.swiss-star{width:53px;height:53px;right:4.3%;top:-27px;filter:drop-shadow(0 7px 6px #1547f525)}
.swiss-star svg{width:100%;height:100%;fill:#124cff;stroke:none}
.swiss-cube{--size:29px;width:var(--size);height:var(--size);left:-14px;top:62%;perspective:350px}
.swiss-cube-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:rotateX(-22deg) rotateY(30deg) rotateZ(-10deg)}
.swiss-cube-inner>span{position:absolute;inset:0;border:1px solid #81a5ff;background:#1950f9}
.front{transform:translateZ(calc(var(--size)/2))}.back{transform:rotateY(180deg) translateZ(calc(var(--size)/2));background:#002ac8!important}.left{transform:rotateY(-90deg) translateZ(calc(var(--size)/2));background:#002dbd!important}.right{transform:rotateY(90deg) translateZ(calc(var(--size)/2));background:#326aff!important}.top{transform:rotateX(90deg) translateZ(calc(var(--size)/2));background:#729aff!important}.bottom{transform:rotateX(-90deg) translateZ(calc(var(--size)/2))}
.swiss-triangle{width:49px;height:49px;left:46%;bottom:-23px;transform:rotate(15deg);filter:drop-shadow(0 6px 5px #164bff18)}
.swiss-triangle svg{width:100%;height:100%;fill:#1048ff;stroke:none}.swiss-triangle .triangle-inner{fill:#f9fbff}
.swiss-cross{position:absolute;right:2.2%;bottom:8%;font-size:20px;font-weight:400;color:#0647ff80}
@media(max-width:700px){.swiss-star{width:35px;height:35px;right:8%;top:-18px}.swiss-cube{--size:20px;left:-10px;top:38%}.swiss-triangle{width:31px;height:31px;left:auto;right:13%;bottom:-16px}.swiss-cross{display:none}}
@media(prefers-reduced-motion:reduce){.swiss-float{will-change:auto}}
</style>
