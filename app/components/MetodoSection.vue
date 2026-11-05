<script setup lang="ts">
import { metodo, site } from '#shared/site'
// A "ficha de treino": cada linha ganha o check quando passa do meio da tela.
const rows = ref<HTMLElement[]>([])
const done = ref<boolean[]>(metodo.map(() => false))
let io: IntersectionObserver | null = null
onMounted(() => {
  io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      const i = Number((e.target as HTMLElement).dataset.i)
      if (e.isIntersecting) done.value[i] = true
    })
  }, { rootMargin: '0px 0px -45% 0px' })
  rows.value.forEach(r => io!.observe(r))
})
onBeforeUnmount(() => io?.disconnect())
const total = computed(() => done.value.filter(Boolean).length)
</script>

<template>
  <section id="metodo" class="sec metodo" aria-labelledby="metodo-title">
    <div class="wrap grid">
      <aside class="side">
        <div class="sticky">
          <p class="eyebrow" data-reveal="fade">O método</p>
          <h2 id="metodo-title" class="h2"><SplitText text="Sem achismo|é *assim:*" /></h2>
          <p class="lead" data-reveal="up" style="--d: 200">
            Quatro etapas, nessa ordem. Nenhuma pula a outra. Parece simples porque é. Difícil é fazer direito todo dia.
          </p>
          <figure class="photo" data-reveal="scale" style="--r: 2deg; --d: 250">
            <span class="tape" style="left: 34%; top: -12px; transform: rotate(-4deg)" />
            <img src="/img/planilha-halftone.webp" alt="Jhony Mailon com caneta na mão anotando treino na academia" width="700" height="836" loading="lazy">
            <figcaption class="hand">tudo anotado. tudo.</figcaption>
          </figure>
        </div>
      </aside>

      <div class="ficha">
        <div class="ficha-head">
          <span class="mono">Ficha nº 001 · aluno: tu</span>
          <span class="mono">{{ total }}/{{ metodo.length }} ✓</span>
        </div>
        <div class="cols mono" aria-hidden="true">
          <span>Etapa</span><span>Séries</span><span>Reps</span><span>Obs.</span>
        </div>
        <article
          v-for="(m, i) in metodo" :key="m.n" ref="rows" :data-i="i" class="row" :class="{ done: done[i] }"
        >
          <div class="row-top">
            <span class="n display">{{ m.n }}</span>
            <h3 class="t display">{{ m.titulo }}</h3>
            <span class="check" aria-hidden="true">
              <svg viewBox="0 0 40 40"><path d="M6 21 L16 31 L35 8" /></svg>
            </span>
          </div>
          <p class="d">{{ m.texto }}</p>
          <div class="meta mono">
            <span><i>séries</i>{{ m.series }}</span>
            <span><i>reps</i>{{ m.reps }}</span>
            <span class="obs hand">{{ m.obs }}</span>
          </div>
        </article>
        <p class="sign">
          <span class="hand">Jhony</span>
          <span class="mono">{{ site.cref }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1.25fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
.sticky { position: sticky; top: 110px; }
.lead { margin-top: 26px; }
.photo { position: relative; margin: 40px 0 0; width: min(320px, 80%); background: var(--paper); padding: 12px 12px 46px; box-shadow: 0 30px 50px -30px rgba(0,0,0,.5); }
.photo img { width: 100%; background: var(--bone-2); }
.photo figcaption { position: absolute; bottom: 10px; left: 16px; font-size: 20px; }

.ficha { background: var(--paper); border: 2px solid var(--ink); box-shadow: 10px 10px 0 var(--ink); position: relative;
  background-image: repeating-linear-gradient(transparent 0 31px, rgba(14,14,12,.06) 31px 32px); }
.ficha-head { display: flex; justify-content: space-between; padding: 14px 20px; background: var(--ink); color: var(--yellow); }
.cols { display: grid; grid-template-columns: 1fr 80px 100px 100px; padding: 10px 20px; border-bottom: 2px solid var(--ink); font-size: 10.5px; color: var(--muted); }
.row { padding: 26px 20px 22px; border-bottom: 1px dashed rgba(14,14,12,.3); transition: background .5s; position: relative; }
.row:hover { background: rgba(255, 196, 0, .16); }
.row-top { display: grid; grid-template-columns: auto 1fr 44px; align-items: center; gap: 16px; }
.n { font-size: 56px; color: transparent; -webkit-text-stroke: 1.5px var(--ink); transition: color .5s, -webkit-text-stroke-color .5s; }
.done .n { color: var(--yellow); -webkit-text-stroke-color: var(--ink); }
.t { margin: 0; font-size: clamp(28px, 3vw, 40px); line-height: .95; }
.check { width: 44px; height: 44px; border: 2px solid var(--ink); display: grid; place-items: center; }
.check svg { width: 30px; height: 30px; fill: none; stroke: var(--ink); stroke-width: 5; stroke-linecap: square; stroke-dasharray: 50; stroke-dashoffset: 50; transition: stroke-dashoffset .7s var(--ease-out) .15s; }
.done .check { background: var(--yellow); }
.done .check svg { stroke-dashoffset: 0; }
.d { margin: 14px 0 0; max-width: 56ch; color: #34322d; }
.meta { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 14px; font-size: 11px; align-items: center; }
.meta i { font-style: normal; color: var(--muted); margin-right: 6px; }
.obs { font-size: 18px; color: #b38600; transform: rotate(-3deg); display: inline-block; text-transform: none; letter-spacing: 0; }
.sign { display: flex; align-items: baseline; justify-content: flex-end; gap: 14px; padding: 20px; margin: 0; }
.sign .hand { font-size: 34px; transform: rotate(-6deg); display: inline-block; }
.sign .mono { font-size: 10px; color: var(--muted); }
@media (max-width: 920px) {
  .grid { grid-template-columns: 1fr; }
  .sticky { position: static; }
  .cols { display: none; }
  .ficha { box-shadow: 6px 6px 0 var(--ink); }
  .n { font-size: 44px; }
}
</style>
