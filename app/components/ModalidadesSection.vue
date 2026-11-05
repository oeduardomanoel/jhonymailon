<script setup lang="ts">
import { site, local } from '#shared/site'
const emit = defineEmits<{ escolher: [m: string] }>()
const { $scrollTo } = useNuxtApp()
const cards = [
  {
    key: 'Presencial',
    titulo: 'Presencial',
    sub: 'Eu do teu lado no treino',
    onde: () => (site.academia ? `${site.academia}, ${local()}` : local()),
    img: '/img/coach-cabo',
    alt: 'Jhony Mailon ajustando a postura de aluna no puxador',
    itens: [
      'Correção na hora, repetição por repetição',
      'Carga ajustada ali, no meio da série',
      'Alguém te esperando no horário (e cobrando)',
    ],
    pra: 'Pra quem quer aprender a técnica certa desde o começo e precisa de alguém presente.',
  },
  {
    key: 'Online',
    titulo: 'Online',
    sub: 'O treino no teu bolso',
    onde: () => 'De qualquer cidade',
    img: '/img/espelho',
    alt: 'Jhony Mailon com o celular na mão',
    itens: [
      'Plano montado pro teu objetivo e tua rotina',
      'Execução corrigida pelos teus vídeos',
      'Ajustes conforme tu evolui',
    ],
    pra: 'Pra quem tem rotina maluca, mora longe ou já treina e quer parar de chutar.',
  },
]
function pick(k: string) { emit('escolher', k); ($scrollTo as any)('#comecar') }
</script>

<template>
  <section id="modalidades" class="sec sec--yellow mod" aria-labelledby="mod-title">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow" data-reveal="fade">Como a gente trabalha</p>
        <h2 id="mod-title" class="h2"><SplitText text="Do teu lado|ou na tua tela." /></h2>
      </div>

      <div class="cards">
        <article v-for="(c, i) in cards" :key="c.key" class="card" data-reveal="up" :style="{ '--d': i * 140 }">
          <div class="media">
            <img :src="`${c.img}-pb.webp`" :alt="c.alt" width="720" height="860" loading="lazy" class="pb">
            <img :src="`${c.img}.webp`" alt="" aria-hidden="true" width="720" height="860" loading="lazy" class="color">
            <span class="tag mono">{{ c.onde() }}</span>
          </div>
          <div class="body">
            <p class="mono idx">0{{ i + 1 }} / 02</p>
            <h3 class="display t">{{ c.titulo }}</h3>
            <p class="sub hand">{{ c.sub }}</p>
            <ul>
              <li v-for="it in c.itens" :key="it">{{ it }}</li>
            </ul>
            <p class="pra">{{ c.pra }}</p>
            <button class="btn" type="button" @click="pick(c.key)">Quero o {{ c.titulo.toLowerCase() }} <span class="arrow">→</span></button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { display: flex; flex-direction: column; }
.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 64px; }
.card { background: var(--bone); border: 2px solid var(--ink); display: grid; grid-template-rows: auto 1fr; transition: transform .5s var(--ease), box-shadow .5s var(--ease); }
.card:hover { transform: translate(-6px, -6px) rotate(-.6deg); box-shadow: 12px 12px 0 var(--ink); }
.card:nth-child(2):hover { transform: translate(-6px, -6px) rotate(.6deg); }
.media { position: relative; aspect-ratio: 16 / 11; overflow: hidden; border-bottom: 2px solid var(--ink); background: var(--ink); }
.media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; transition: transform 1.2s var(--ease-out), opacity .6s; }
.media .color { opacity: 0; }
.card:hover .media img { transform: scale(1.06); }
.card:hover .media .color { opacity: 1; }
.tag { position: absolute; left: 12px; top: 12px; background: var(--yellow); padding: 6px 10px; font-size: 11px; border: 1.5px solid var(--ink); }
.body { padding: 28px clamp(20px, 3vw, 36px) 32px; display: flex; flex-direction: column; }
.idx { font-size: 11px; color: var(--muted); margin: 0; }
.t { font-size: clamp(56px, 6vw, 88px); margin: 6px 0 0; }
.sub { font-size: 22px; margin: 4px 0 18px; transform: rotate(-2deg); transform-origin: left; color: #6b5400; }
ul { list-style: none; padding: 0; margin: 0 0 18px; }
li { padding: 11px 0 11px 30px; border-top: 1px solid var(--line); position: relative; font-weight: 500; }
li::before { content: '✕'; position: absolute; left: 0; top: 11px; font-weight: 800; color: var(--ink); transition: transform .4s var(--ease); }
li:hover::before { transform: rotate(90deg) scale(1.2); }
.pra { color: #4a4741; margin: 0 0 26px; }
.body .btn { margin-top: auto; align-self: flex-start; }
@media (max-width: 820px) { .cards { grid-template-columns: 1fr; } .body .btn { align-self: stretch; justify-content: center; } }
</style>
