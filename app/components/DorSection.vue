<script setup lang="ts">
const dores = [
  'Baixou treino pronto da internet e largou na terceira semana.',
  'Vai pra academia quase todo dia e o espelho continua igual.',
  'Faz o exercício sem saber se tá fazendo certo.',
  'Emagreceu numa dieta maluca e recuperou tudo depois.',
  'Começa segunda. Toda segunda.',
]
</script>

<template>
  <section class="sec sec--ink dor" aria-labelledby="dor-title">
    <div class="wrap">
      <p class="eyebrow" data-reveal="fade" style="color: var(--yellow)">Antes de tudo</p>
      <h2 id="dor-title" class="h2"><SplitText text="Já fez alguma|*dessas?*" /></h2>

      <ol class="list">
        <li v-for="(d, i) in dores" :key="i" data-reveal="up" :style="{ '--d': i * 90 }">
          <span class="num mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="txt"><span class="strike">{{ d }}</span></span>
        </li>
      </ol>

      <div class="answer">
        <p class="hand note" data-reveal="scale" style="--r: -3deg">Normal. Quase todo mundo que chega até mim passou por isso.</p>
        <p class="lead" data-reveal="up" style="--d: 150">
          O problema quase nunca é preguiça. O que falta é um plano feito pro <em>teu</em> corpo e alguém olhando
          a execução de perto. É exatamente essa parte que eu resolvo.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dor { overflow: hidden; }
.h2 { color: var(--bone); }
.list { list-style: none; margin: 64px 0 0; padding: 0; border-top: 1px solid var(--line-inv); }
.list li { display: grid; grid-template-columns: 64px 1fr; align-items: baseline; padding: 22px 0; border-bottom: 1px solid var(--line-inv); transition: padding .4s var(--ease), background .4s; }
.list li:hover { padding-left: 14px; background: rgba(255, 196, 0, .06); }
.num { color: var(--yellow); }
.txt { font-family: var(--f-display); font-weight: 800; text-transform: uppercase; font-size: clamp(26px, 3.6vw, 48px); line-height: 1; }
.strike { background: linear-gradient(var(--yellow), var(--yellow)) 0 56% / 0 6px no-repeat; transition: background-size 1s var(--ease-out) .5s, color .6s .6s; }
.is-in .strike { background-size: 100% 6px; color: rgba(237, 232, 223, .55); }
.answer { display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: center; margin-top: 72px; }
.note { font-size: clamp(24px, 2.4vw, 32px); color: var(--yellow); line-height: 1.2; margin: 0; }
.lead { margin: 0; color: #cfc9bd; }
.lead em { color: var(--bone); font-style: normal; border-bottom: 2px solid var(--yellow); }
@media (max-width: 820px) { .answer { grid-template-columns: 1fr; gap: 28px; } .list li { grid-template-columns: 44px 1fr; } }
</style>
