<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const section = ref<HTMLElement>()
const projects = computed(() => [
  { name: t('projects.items.aitje.name'), kind: 'aitje', category: t('projects.items.aitje.category'), tagline: t('projects.items.aitje.tagline'), details: t('projects.items.aitje.details') },
  { name: t('projects.items.media.name'), kind: 'media', category: t('projects.items.media.category'), tagline: t('projects.items.media.tagline'), details: t('projects.items.media.details') },
  { name: t('projects.items.creative.name'), kind: 'creative', category: t('projects.items.creative.category'), tagline: t('projects.items.creative.tagline'), details: t('projects.items.creative.details') },
])
const selectedProject = ref<{ name: string; kind: string; category: string; tagline: string; details: string } | null>(null)
const closeProject = () => { selectedProject.value = null }
onMounted(() => window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProject() }))
onBeforeUnmount(() => window.removeEventListener('keydown', (event) => { if (event.key === 'Escape') closeProject() }))
let media: gsap.MatchMedia | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
      gsap.from(card, { y: 40, opacity: .35, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 65%', scrub: .8 } })
    })
  }, section.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="projects" ref="section" class="projects-section" aria-labelledby="projects-heading">
    <div class="project-story">
      <header class="story-heading">
        <p class="eyebrow">02 <span /> {{ t('projects.label') }}</p>
        <h2 id="projects-heading">{{ t('projects.title') }}<br>{{ t('projects.titleLine2') }}</h2>
        <div class="story-summary"><p>{{ t('projects.summary') }}</p></div>
      </header>
      <div class="workspace-photo"><img src="/images/Wat-me-bezighoudt.png" alt="Een digitale maker aan het werk in een lichte studio met meerdere schermen en blauwe accentverlichting" loading="lazy" /></div>
      <div class="photo-captions"><p v-html="t('projects.captions.left').replace('\\n', '<br>')"></p><p v-html="t('projects.captions.right').replace('\\n', '<br>')"></p></div>
    </div>
    <div class="project-list"><HomeProjectCard v-for="(project, index) in projects" :key="project.kind" :project="project" :index="index" @select="selectedProject = $event" /></div>
    <Teleport to="body">
      <Transition name="modal">
      <div v-if="selectedProject" class="project-modal" role="dialog" aria-modal="true" :aria-label="`${selectedProject.name.replace('\n', ' ')} project details`" @click.self="closeProject">
        <button class="modal-close" type="button" aria-label="Close project details" @click="closeProject">×</button>
        <div class="modal-inner">
          <header class="modal-header"><div><p class="modal-kicker">Project / {{ selectedProject.category }}</p><h2>{{ selectedProject.name }}</h2></div><p class="modal-intro">{{ selectedProject.tagline.replace('\n', ' ') }}<br><span>Ideas, systems and work in progress.</span></p></header>
          <div class="modal-black" :class="selectedProject.kind"><HomeProjectTexture :kind="selectedProject.kind" /><div class="modal-black-copy"><p>{{ t('projects.modal.more') }}</p><h3>{{ selectedProject.details.replaceAll('\n', ' · ') }}</h3><a v-if="selectedProject.kind === 'aitje'" :href="t('projects.items.aitje.url')" target="_blank" class="project-btn aitje-btn">{{ t('projects.items.aitje.visitBtn') }} ↗</a><a v-else-if="selectedProject.kind === 'media'" :href="t('projects.items.media.url')" target="_blank" class="project-btn media-btn">{{ t('projects.items.media.visitBtn') }} ↗</a><a v-else href="#contact" @click="closeProject">{{ t('projects.modal.discuss') }} ↗</a></div></div>

          <!-- Extended content for AITJE -->
          <template v-if="selectedProject.kind === 'aitje'">
            <div class="modal-extended aitje-extended">
              <div class="modal-intro-section">
                <p class="intro-text">{{ t('projects.items.aitje.intro') }}</p>
                <a :href="t('projects.items.aitje.url')" target="_blank" class="visit-btn">{{ t('projects.items.aitje.visitBtn') }} ↗</a>
              </div>

              <div class="modal-services">
                <h4>{{ t('projects.items.aitje.servicesTitle') }}</h4>
                <div class="services-grid aitje-grid">
                  <div v-for="(service, i) in (t('projects.items.aitje.services') as any[])" :key="i" class="service-item aitje-item">
                    <h5>{{ service.title }}</h5>
                    <p>{{ service.desc }}</p>
                  </div>
                </div>
              </div>

              <div class="modal-products">
                <h4>{{ t('projects.items.aitje.productsTitle') }}</h4>
                <div class="products-grid aitje-products">
                  <div v-for="(product, i) in (t('projects.items.aitje.products') as any[])" :key="i" class="product-item">
                    <h5>{{ product.title }}</h5>
                    <p>{{ product.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Extended content for Zschot Media -->
          <template v-if="selectedProject.kind === 'media'">
            <div class="modal-extended media-extended">
              <div class="modal-intro-section">
                <p class="intro-text">{{ t('projects.items.media.intro') }}</p>
                <a :href="t('projects.items.media.url')" target="_blank" class="visit-btn media-visit">{{ t('projects.items.media.visitBtn') }} ↗</a>
              </div>

              <div class="modal-services">
                <h4>{{ t('projects.items.media.servicesTitle') }}</h4>
                <div class="services-grid media-grid">
                  <div v-for="(service, i) in (t('projects.items.media.services') as any[])" :key="i" class="service-item media-item">
                    <h5>{{ service.title }}</h5>
                    <p>{{ service.desc }}</p>
                  </div>
                </div>
              </div>

              <div class="modal-products">
                <h4>{{ t('projects.items.media.productsTitle') }}</h4>
                <div class="products-grid media-products">
                  <a v-for="(product, i) in (t('projects.items.media.products') as any[])" :key="i" :href="product.url" target="_blank" class="product-item product-link">
                    <h5>{{ product.title }}</h5>
                    <p>{{ product.desc }}</p>
                  </a>
                </div>
              </div>
            </div>
          </template>

          <!-- Extended content for Creative Endeavours -->
          <template v-if="selectedProject.kind === 'creative'">
            <div class="modal-extended creative-extended">
              <div class="modal-intro-section creative-intro">
                <p class="intro-text">{{ t('projects.items.creative.intro') }}</p>
              </div>

              <div class="modal-services">
                <h4>{{ t('projects.items.creative.disciplinesTitle') }}</h4>
                <div class="services-grid creative-grid">
                  <div v-for="(discipline, i) in (t('projects.items.creative.disciplines') as any[])" :key="i" class="service-item creative-item">
                    <h5>{{ discipline.title }}</h5>
                    <p>{{ discipline.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <footer class="modal-footer"><span>Selected work / 0{{ projects.findIndex(p => p.kind === selectedProject?.kind) + 1 }}</span><a :href="selectedProject.kind === 'aitje' ? t('projects.items.aitje.url') : selectedProject.kind === 'media' ? t('projects.items.media.url') : '#contact'" :target="['aitje', 'media'].includes(selectedProject.kind) ? '_blank' : undefined" @click="!['aitje', 'media'].includes(selectedProject.kind) && closeProject()">{{ t('projects.modal.visit') }} ↗</a></footer>
        </div>
      </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.projects-section{display:grid;grid-template-columns:minmax(0,1.95fr) minmax(0,1fr);gap:32px;padding:48px 3.3% 45px 2.2%;background:#fff;color:#050606;scroll-margin-top:20px}
.project-story{min-width:0;display:flex;flex-direction:column}
.story-heading{padding:0 5.7% 12px}
.eyebrow{display:flex;align-items:center;gap:15px;color:#2453ff;font-size:10px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;margin:0 0 30px}
.eyebrow span{height:1px;width:40px;background:#2453ff}
h2{font-size:clamp(48px,6vw,96px);font-weight:700;line-height:.99;letter-spacing:-.05em;margin:0 0 23px}
.story-summary{display:flex;align-items:flex-start;justify-content:space-between;gap:20px}
.story-summary>p{font-size:18px;line-height:1.5;color:#454453;letter-spacing:-.02em;margin:0;max-width:470px}
.side-note{text-transform:uppercase;color:#92959c;font-size:8px;line-height:1.65;letter-spacing:.2em;flex-shrink:0;margin-top:-38px}
.workspace-photo{margin:0 -6.5%;min-height:0;overflow:visible}
.workspace-photo img{width:100%;height:auto;display:block}
.photo-captions{display:flex;justify-content:space-between;padding:3px 3.5% 0;color:#979aa1;text-transform:uppercase;font-size:8px;line-height:1.7;letter-spacing:.18em}
.photo-captions p{margin:0}.photo-captions span{display:block;width:14px;height:1px;background:#717783;margin-top:10px}
.project-list{display:grid;grid-template-rows:1.1fr 1fr .92fr;gap:13px}
@media(min-width:1700px){.projects-section{gap:40px;padding-top:80px}.story-heading{padding-bottom:25px}}
@media(min-width:701px) and (max-width:1000px){.projects-section{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:18px;padding:45px 3%}h2{font-size:6vw}.story-heading{padding:0 3% 15px}.story-summary>p{font-size:16px}.side-note{display:none}.eyebrow{font-size:8px;gap:10px;letter-spacing:.25em;margin-bottom:25px}.workspace-photo{margin:12px -6.5% 0}.photo-captions{font-size:6px;gap:15px}.desktop-break{display:none}}
@media(max-width:700px){.projects-section{grid-template-columns:1fr;padding:48px 5% 40px;gap:30px}.story-heading{padding:0 3% 16px}h2{font-size:clamp(40px,10vw,64px);margin-bottom:20px}.eyebrow{font-size:8px;gap:13px;letter-spacing:.25em;margin-bottom:26px}.story-summary>p{font-size:16px;line-height:1.5}.side-note{display:none}.desktop-break{display:none}.workspace-photo{flex:none}.photo-captions{font-size:6px;padding-top:4px}.project-list{gap:14px;grid-template-rows:none}}
.project-modal{position:fixed;inset:0;z-index:100;overflow:auto;background:#fff;color:#1647ff;padding:clamp(28px,5vw,80px)}
.modal-inner{width:min(100%,1320px);margin:0 auto}.modal-close{position:fixed;top:24px;right:30px;z-index:2;display:grid;place-items:center;width:48px;height:48px;border:1px solid #1647ff;border-radius:50%;background:#fff;color:#1647ff;font-size:28px;line-height:1}.modal-header{display:flex;justify-content:space-between;align-items:flex-start;gap:40px;padding:0 68px 48px}.modal-kicker,.modal-intro,.modal-footer{font-size:10px;letter-spacing:.2em;text-transform:uppercase}.modal-header h2{font-size:clamp(58px,9vw,140px);line-height:.85;letter-spacing:-.07em;margin:18px 0 0;white-space:pre-line}.modal-intro{max-width:320px;line-height:1.7;margin:12px 0 0}.modal-intro span{opacity:.55}.modal-black{position:relative;min-height:clamp(430px,58vh,720px);overflow:hidden;background:#070808;color:#fff;padding:clamp(32px,5vw,72px);border-radius:4px}.modal-black :deep(.project-texture){opacity:.65}.modal-black-copy{position:absolute;left:clamp(32px,5vw,72px);bottom:clamp(32px,5vw,72px);z-index:2;max-width:520px}.modal-black-copy p{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#fff;opacity:.7}.modal-black-copy h3{font-size:clamp(28px,4vw,56px);line-height:.95;white-space:pre-line;margin:14px 0 28px}.modal-black-copy a{display:inline-block;padding:13px 18px;border:1px solid #fff;color:#fff;font-size:12px}.modal-footer{display:flex;justify-content:space-between;gap:20px;padding:26px 4px;color:#1647ff}.modal-footer a{text-decoration:underline;text-underline-offset:4px}@media(max-width:700px){.project-modal{padding:24px 18px}.modal-close{top:14px;right:14px;width:40px;height:40px;font-size:26px}.modal-header{display:block;padding:30px 10px 32px}.modal-header h2{font-size:64px}.modal-intro{margin-top:28px}.modal-black{min-height:500px;padding:28px}.modal-footer{display:block;line-height:2.5}.modal-footer a{display:block}}
.modal-black{color:#fff}.modal-black :deep(.project-texture){color:var(--project-accent)}.modal-black.aitje{--project-accent:#f1db59}.modal-black.media{--project-accent:#8be57b}.modal-black.creative{--project-accent:#f16456}
.modal-enter-active{animation:modal-in .4s cubic-bezier(.16,1,.3,1)}.modal-leave-active{animation:modal-out .25s ease-in forwards}
@keyframes modal-in{0%{opacity:0;transform:scale(.96) translateY(12px)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes modal-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.98)}}

/* Extended modal content */
.modal-extended{padding:48px 0}
.modal-intro-section{display:flex;justify-content:space-between;align-items:flex-start;gap:32px;padding-bottom:48px;border-bottom:1px solid #e5e7eb}
.intro-text{font-size:18px;line-height:1.6;color:#333;max-width:680px;margin:0}
.visit-btn{display:inline-block;padding:14px 28px;background:#f1db59;color:#000;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border-radius:4px;text-decoration:none;white-space:nowrap;transition:background .2s}.visit-btn:hover{background:#ffe82d}
.modal-black-copy .project-btn{font-weight:600;border:none}
.modal-black-copy .aitje-btn{background:#f1db59;color:#000}.modal-black-copy .aitje-btn:hover{background:#ffe82d}
.modal-black-copy .media-btn{background:#8be57b;color:#000}.modal-black-copy .media-btn:hover{background:#6fd35c}
.media-visit{background:#8be57b !important;color:#000 !important}.media-visit:hover{background:#6fd35c !important}
.product-link{text-decoration:none;transition:transform .2s,background .2s}.product-link:hover{transform:translateY(-2px);background:#1a1a1a}
.aitje-products .product-item{background:#070808;color:#fff;border-left:3px solid #f1db59}.aitje-products .product-item:hover{background:#1a1a1a}.aitje-products .product-item h5{color:#f1db59}
.media-products .product-item{background:#1a3d15;color:#fff}.media-products .product-item:hover{background:#245a1c}.media-products .product-item h5{color:#8be57b}
.service-item.aitje-item{background:#3d3515;border-left:3px solid #f1db59}
.service-item.aitje-item h5{color:#f1db59}
.service-item.aitje-item p{color:#ccc}
.service-item.media-item{background:#1a3d15;border-left:3px solid #8be57b}
.service-item.media-item h5{color:#8be57b}
.service-item.media-item p{color:#ccc}
.creative-intro{border-bottom:none;padding-bottom:24px}
.creative-grid{grid-template-columns:repeat(2,1fr)}
.service-item.creative-item{background:#3d1515;border-left:3px solid #f16456}
.service-item.creative-item h5{color:#f16456}
.service-item.creative-item p{color:#ccc}

.modal-services,.modal-products{padding-top:48px}
.modal-services h4,.modal-products h4{font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#1647ff;margin:0 0 28px}
.aitje-extended h4{color:#c4a820}
.media-extended h4{color:#4a9e3a}
.creative-extended h4{color:#d94a3c}
.services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px}
.service-item{padding:24px;background:#f8f9fa;border-radius:8px}
.service-item h5{font-size:16px;font-weight:700;margin:0 0 8px;color:#050606}
.service-item p{font-size:14px;line-height:1.5;color:#666;margin:0}

.products-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.product-item{padding:24px;background:#070808;color:#fff;border-radius:8px}
.product-item h5{font-size:18px;font-weight:700;margin:0 0 12px}
.product-item p{font-size:14px;line-height:1.5;color:#aaa;margin:0}

@media(max-width:700px){
  .modal-extended{padding:32px 0}
  .modal-intro-section{flex-direction:column;gap:20px;padding-bottom:32px}
  .intro-text{font-size:16px}
  .modal-services,.modal-products{padding-top:32px}
  .services-grid,.products-grid,.creative-grid{grid-template-columns:1fr}
}
</style>
