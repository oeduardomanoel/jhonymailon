<script setup lang="ts">
// Desktop: scroll vertical vira horizontal (seção fixa). Mobile: carrossel nativo com snap.
const fotos = [
  { src: 'agachamento', alt: 'Jhony Mailon no agachamento em máquina articulada', cap: 'perna. sem desculpa.' },
  { src: 'maquina', alt: 'Jhony Mailon treinando em máquina amarela', cap: 'a casa amarela' },
  { src: 'costas', alt: 'Costas do Jhony Mailon em regata verde', cap: 'costas' },
  { src: 'tattoo', alt: 'Braço tatuado do Jhony Mailon durante o treino', cap: 'tinta e ferro' },
  { src: 'nike', alt: 'Jhony Mailon sentado entre séries', cap: 'descanso contado' },
  { src: 'espelho', alt: 'Jhony Mailon em selfie no espelho', cap: 'o clássico' },
  { src: 'sombra', alt: 'Jhony Mailon em foto preto e branco no escuro', cap: 'modo foco' },
]
const sec = ref<HTMLElement>()
const track = ref<HTMLElement>()
const pct = ref(0)
let on = false
function update() {
  if (!sec.value || !track.value || !on) return
  const r = sec.value.getBoundingClientRect()
  const total = sec.value.offsetHeight - window.innerHeight
  const p = Math.min(1, Math.max(0, -r.top / total))
  pct.value = p
  const dist = track.value.scrollWidth - window.innerWidth
  track.value.style.transform = `translate3d(${-p * dist}px,0,0)`
}
function setup() {
  on = window.matchMedia('(min-width: 921px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (sec.value && track.value) {
    if (on) sec.value.style.height = `${track.value.scrollWidth - window.innerWidth + window.innerHeight}px`
    else { sec.value.style.height = ''; track.value.style.transform = '' }
  }
  update()
}
onMounted(() => { setup(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', setup) })
onBeforeUnmount(() => { window.removeEventListener('scroll', update); window.removeEventListener('resize', setup) })
</script>

<template>
  <section ref="sec" class="gal" aria-labelledby="gal-title">
    <div class="pin">
      <div ref="track" class="track">
        <div class="intro">
          <p class="eyebrow">Bastidores</p>
          <h2 id="gal-title" class="h2">A bagunça<br>que eu pedi<br>pra <span class="hl">não reparar.</span></h2>
          <p class="mono hint">passa o mouse pra ver em cor →</p>
        </div>
        <figure v-for="(f, i) in fotos" :key="f.src" class="shot" :style="{ '--rot': `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` }">
          <div class="frame">
            <img :src="`/img/${f.src}-pb.webp`" :alt="f.alt" width="720" height="860" loading="lazy" class="pb">
            <img :src="`/img/${f.src}.webp`" alt="" aria-hidden="true" width="720" height="860" loading="lazy" class="color">
          </div>
          <figcaption><span class="mono">{{ String(i + 1).padStart(2, '0') }}</span><span class="hand">{{ f.cap }}</span></figcaption>
        </figure>
        <div class="end">
          <p class="display">Tem mais<br>no insta.</p>
          <a href="https://www.instagram.com/jhonymailon/" target="_blank" rel="noopener" class="btn btn--yellow">@jhonymailon <span class="arrow">→</span></a>
        </div>
      </div>
      <div class="prog" aria-hidden="true"><span :style="{ transform: `scaleX(${pct})` }" /></div>
    </div>
  </section>
</template>

<style scoped>
.gal { background: var(--bone-2); position: relative; }
.pin { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
.track { display: flex; align-items: center; gap: clamp(28px, 4vw, 64px); padding: 0 var(--gutter); width: max-content; will-change: transform; }
.intro { width: min(520px, 80vw); flex: none; }
.hl { background: var(--yellow); padding: 0 .08em; }
.hint { margin-top: 26px; color: var(--muted); }
.shot { margin: 0; flex: none; width: clamp(240px, 24vw, 340px); transform: rotate(var(--rot)); transition: transform .6s var(--ease); }
.shot:nth-child(odd) { margin-top: 80px; }
.shot:hover { transform: rotate(0) translateY(-10px) scale(1.03); z-index: 2; }
.frame { position: relative; aspect-ratio: 720 / 860; overflow: hidden; background: var(--ink); border: 8px solid var(--paper); box-shadow: 0 30px 60px -28px rgba(0,0,0,.6); }
.frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity .5s, transform 1.2s var(--ease-out); }
.color { opacity: 0; }
.shot:hover .color { opacity: 1; }
.shot:hover img { transform: scale(1.07); }
figcaption { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 4px 0; }
figcaption .hand { font-size: 21px; }
.end { flex: none; width: 360px; display: flex; flex-direction: column; gap: 26px; align-items: flex-start; padding-right: 8vw; }
.end .display { font-size: 80px; margin: 0; }
.prog { position: absolute; left: var(--gutter); right: var(--gutter); bottom: 34px; height: 3px; background: rgba(14,14,12,.12); }
.prog span { display: block; height: 100%; background: var(--ink); transform-origin: left; transform: scaleX(0); }

@media (max-width: 920px) {
  .gal { padding: 90px 0 70px; }
  .pin { position: static; height: auto; display: block; }
  .track { width: auto; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 24px; transform: none !important; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .track::-webkit-scrollbar { display: none; }
  .intro { scroll-snap-align: start; width: 78vw; }
  .shot { scroll-snap-align: center; width: 68vw; }
  .shot:nth-child(odd) { margin-top: 0; }
  .end { width: 70vw; scroll-snap-align: center; }
  .end .display { font-size: 56px; }
  .prog { display: none; }
  .hint { display: none; }
}
</style>
