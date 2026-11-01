<script setup lang="ts">
import { portfolioCopy } from "~/data/portfolio";
import type { PortfolioPanel } from "~/data/portfolio";
defineProps<{ paused: boolean }>();
const emit = defineEmits<{ navigate: [panel: PortfolioPanel] }>();
const { locale } = useI18n();
const copy = computed(() => portfolioCopy[locale.value]);
</script>
<template>
  <section
    id="home"
    class="hero"
    :class="{ 'is-paused': paused }"
    aria-labelledby="hero-heading"
  >
    <div class="hero-intro">
      <div class="hero-heading">
        <p class="eyebrow">
          JEFFREY ZSCHÖTTCHE <span aria-hidden="true">/</span> AMSTERDAM
        </p>
        <h1 id="hero-heading">
          Digital<br />builder<span class="period">.</span
          ><span class="creative-spark" aria-hidden="true">✳</span>
        </h1>
      </div>
      <div class="hero-description">
        <p class="intro-kicker">{{ copy.kicker }}</p>
        <p>{{ copy.intro }}</p>
        <a href="#contact" @click.prevent="emit('navigate', 'contact')"
          >{{ copy.letsMake }} <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
    <HomeSilhouetteReel :paused="paused" />
  </section>
</template>
<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
}
.hero-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 48px;
  padding: 18px 0 35px;
}
.eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.13em;
  margin: 0 0 23px;
  color: #a6a6a0;
}
.eyebrow span {
  margin-inline: 10px;
  color: #555;
}
h1 {
  position: relative;
  width: fit-content;
  margin: 0;
  font-size: clamp(76px, 8.6vw, 142px);
  font-weight: 500;
  line-height: 0.85;
  letter-spacing: -0.075em;
}
.period {
  color: #c5f33c;
}
.creative-spark {
  position: absolute;
  top: 4px;
  right: -0.73em;
  font-size: 0.47em;
  line-height: 1;
  color: #c5f33c;
  animation: spark-turn 24s linear infinite;
}
.hero-description {
  width: 270px;
  flex-shrink: 0;
  padding-bottom: 5px;
  color: #a6a6a0;
  font-size: 14px;
  line-height: 1.7;
}
.hero-description .intro-kicker {
  margin: 0 0 13px;
  font-size: 13px;
  font-weight: 500;
  color: #f4f3ef;
}
.hero-description p {
  margin: 0 0 23px;
}
.hero-description > a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: fit-content;
  padding-bottom: 7px;
  border-bottom: 1px solid #575752;
  color: #f4f3ef;
  font-size: 12px;
}
.hero-description > a:hover {
  border-color: #c5f33c;
  color: #c5f33c;
}
.hero-description > a span {
  font-size: 19px;
}
@keyframes spark-turn {
  to {
    transform: rotate(360deg);
  }
}
.is-paused .creative-spark {
  animation-play-state: paused;
}
@media (min-height: 900px) and (min-width: 701px) {
  .hero-intro {
    padding-top: 32px;
    padding-bottom: 45px;
  }
  h1 {
    font-size: clamp(100px, 9.5vw, 156px);
  }
}
@media (max-width: 1000px) {
  .hero-description {
    width: 230px;
    font-size: 13px;
  }
  .hero-intro {
    gap: 32px;
  }
  .hero-description .intro-kicker {
    font-size: 12px;
  }
  h1 {
    font-size: clamp(78px, 10vw, 110px);
  }
}
@media (max-width: 700px) {
  .hero-intro {
    align-items: flex-start;
    gap: 22px;
    padding: 10px 0 28px;
  }
  h1 {
    font-size: clamp(68px, 12vw, 100px);
  }
  .eyebrow {
    font-size: 8px;
    letter-spacing: 0.08em;
    margin-bottom: 19px;
  }
  .eyebrow span {
    margin-inline: 5px;
  }
  .hero-description {
    width: 180px;
    padding-top: 31px;
    font-size: 12px;
  }
  .hero-description .intro-kicker {
    font-size: 11px;
    margin-bottom: 10px;
  }
  .hero-description p {
    margin-bottom: 15px;
  }
  .hero-description > a {
    font-size: 11px;
  }
}
@media (max-width: 500px) {
  .hero-intro {
    display: block;
    padding-top: 9px;
    padding-bottom: 25px;
  }
  .eyebrow {
    margin-bottom: 20px;
    font-size: 8px;
  }
  h1 {
    font-size: clamp(75px, 20vw, 99px);
    line-height: 0.84;
  }
  .creative-spark {
    top: 6px;
    right: -0.78em;
    font-size: 0.44em;
  }
  .hero-description {
    width: auto;
    padding-top: 22px;
    font-size: 12px;
    line-height: 1.65;
  }
  .hero-description .intro-kicker {
    display: none;
  }
  .hero-description p {
    max-width: 310px;
    margin-bottom: 11px;
  }
  .hero-description > a {
    font-size: 11px;
    padding-bottom: 4px;
  }
}
@media (max-height: 740px) and (min-width: 701px) {
  .hero-intro {
    padding-block: 8px 25px;
  }
  h1 {
    font-size: clamp(76px, 7.5vw, 105px);
  }
  .eyebrow {
    margin-bottom: 17px;
  }
  .hero-description {
    font-size: 12px;
  }
  .hero-description p {
    margin-bottom: 13px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .creative-spark {
    animation: none;
  }
}
@media (max-width: 500px) {
  .hero-intro {
    padding-bottom: 18px;
  }
  .eyebrow {
    margin-bottom: 14px;
  }
  h1 {
    font-size: clamp(66px, 18.5vw, 92px);
  }
  .hero-description {
    padding-top: 16px;
  }
  .hero-description p {
    margin-bottom: 8px;
  }
}
</style>
