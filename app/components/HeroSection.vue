<script setup lang="ts">
import { site, local } from '#shared/site'
const { $scrollTo } = useNuxtApp()
const { link, canal } = useContato()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap grid">
      <div class="copy">
        <p class="kick mono" data-reveal="fade">
          <span class="live" /> Personal trainer · {{ site.cref }}
        </p>

        <h1 id="hero-title" class="title">
          <span class="sr">Jhony Mailon, personal trainer em {{ local() }} e online. </span>
          <SplitText class="display big" text="Treino sem| frescura.|*Sem achismo.*" :delay="100" />
        </h1>

        <p class="lead" data-reveal="up" style="--d: 500">
          Emagrecimento, hipertrofia e performance com um plano feito pra ti e alguém de olho em cada repetição.
          Presencial em {{ local() }} ou online, de onde tu estiver.
        </p>

        <div class="actions" data-reveal="up" style="--d: 650">
          <a href="#comecar" class="btn btn--yellow" @click.prevent="($scrollTo as any)('#comecar')">
            Quero começar <span class="arrow">→</span>
          </a>
          <a :href="link()" target="_blank" rel="noopener" class="btn btn--ghost">
            Chamar no {{ canal }}
          </a>
        </div>

        <ul class="facts mono" data-reveal="fade" style="--d: 800">
          <li><b>{{ site.focos.length }}</b> focos: {{ site.focos.join(', ').toLowerCase() }}</li>
          <li><b>2</b> formatos: presencial e online</li>
          <li><b>0</b> treino copiado da internet</li>
        </ul>
      </div>

      <div class="visual">
        <div class="panel" data-reveal="clip">
          <img
            src="/img/hero-halftone.webp" alt="Jhony Mailon treinando no crossover com regata Crown"
            width="900" height="1071" fetchpriority="high" class="halftone" data-speed="0.08"
          >
          <span class="vert mono">Emagrecimento · Hipertrofia · Performance</span>
          <span class="idx display">JM</span>
        </div>
        <div class="sticker s1" data-reveal="scale" style="--r: -6deg; --d: 900">{{ site.bio }}</div>
        <div class="badge" data-reveal="scale" style="--r: 8deg; --d: 1050" aria-hidden="true">
          <svg viewBox="0 0 120 120"><defs><path id="c" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#c" textLength="272" lengthAdjust="spacing">SEM FRESCURA • SEM ACHISMO • </textPath></text></svg>
          <span>✕</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; padding: 120px 0 72px; min-height: 100svh; display: flex; align-items: center; overflow: hidden; }
.grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; align-items: center; }
.copy { position: relative; z-index: 2; }
.kick { display: flex; align-items: center; gap: 10px; margin: 0 0 22px; }
.live { width: 10px; height: 10px; background: var(--yellow); outline: 2px solid var(--ink); }
.title { margin: 0; }
.big { font-size: clamp(76px, 9.2vw, 158px); display: block; margin-left: -.04em; white-space: nowrap; position: relative; z-index: 2; }
.big :deep(.em) { color: var(--ink); background: linear-gradient(transparent 58%, var(--yellow) 58%, var(--yellow) 92%, transparent 92%); padding: 0 .04em; }
.lead { margin: 30px 0 0; }
.actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }
.facts { list-style: none; padding: 0; margin: 40px 0 0; display: flex; flex-wrap: wrap; gap: 8px 26px; font-size: 11.5px; color: #4a4741; }
.facts b { color: var(--ink); font-size: 13px; }

.visual { position: relative; }
.panel { position: relative; background: var(--yellow); aspect-ratio: 900 / 1071; overflow: hidden; }
.halftone { position: absolute; inset: -6% 0 auto; width: 100%; height: 112%; object-fit: cover; translate: 0 var(--py, 0); mix-blend-mode: multiply; }
.vert { position: absolute; right: 12px; top: 16px; writing-mode: vertical-rl; font-size: 11px; color: var(--ink); }
.idx { position: absolute; left: 14px; bottom: 6px; font-size: 64px; color: var(--yellow); -webkit-text-stroke: 2px var(--ink); }
.s1 { position: absolute; left: -54px; bottom: 16%; font-size: 22px; max-width: 220px; z-index: 3; }
.badge { position: absolute; right: -28px; top: -34px; width: 132px; height: 132px; background: var(--ink); color: var(--bone); border-radius: 50%; display: grid; place-items: center; z-index: 3; }
.badge svg { position: absolute; inset: 0; animation: spin 16s linear infinite; font-family: var(--f-mono); font-size: 10px; fill: currentColor; }
.badge span { font-family: var(--f-display); font-weight: 900; font-size: 34px; color: var(--yellow); }
.visual:hover .badge svg { animation-duration: 4s; }
@keyframes spin { to { transform: rotate(360deg); } }

.scroll-hint { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 10px; opacity: .55; }
.scroll-hint span { width: 1.5px; height: 34px; background: currentColor; transform-origin: top; animation: drop 1.8s var(--ease) infinite; }
@keyframes drop { 0% { transform: scaleY(0); } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

@media (max-width: 920px) {
  .hero { padding: 104px 0 64px; min-height: auto; }
  .grid { grid-template-columns: 1fr; gap: 56px; }
  .big { font-size: clamp(56px, 17.5vw, 120px); white-space: normal; }
  .visual { max-width: 420px; width: 88%; margin: 0 auto; }
  .s1 { left: -16px; font-size: 18px; max-width: 180px; }
  .badge { right: -14px; width: 104px; height: 104px; }
  .scroll-hint { display: none; }
  .btn { flex: 1 1 auto; justify-content: center; }
}
</style>
