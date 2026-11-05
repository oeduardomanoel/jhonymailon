<script setup lang="ts">
import { faq } from '#shared/site'
const aberta = ref<number | null>(0)
</script>

<template>
  <section id="duvidas" class="sec faq" aria-labelledby="faq-title">
    <div class="wrap grid">
      <div>
        <p class="eyebrow" data-reveal="fade">Dúvidas</p>
        <h2 id="faq-title" class="h2"><SplitText text="Pergunta|que eu|*respondo.*" /></h2>
      </div>
      <div class="list">
        <div v-for="(f, i) in faq" :key="f.q" class="item" :class="{ open: aberta === i }" data-reveal="up" :style="{ '--d': i * 70 }">
          <h3>
            <button :id="`faq-q-${i}`" type="button" :aria-expanded="aberta === i" :aria-controls="`faq-a-${i}`" @click="aberta = aberta === i ? null : i">
              <span>{{ f.q }}</span><i aria-hidden="true" />
            </button>
          </h3>
          <div :id="`faq-a-${i}`" class="ans" role="region" :aria-labelledby="`faq-q-${i}`">
            <div><p>{{ f.a }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
.list { border-top: 2px solid var(--ink); }
.item { border-bottom: 1px solid var(--line); }
h3 { margin: 0; }
button { width: 100%; background: none; border: 0; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 20px; text-align: left; font-family: var(--f-display); font-weight: 800; text-transform: uppercase; font-size: clamp(22px, 2.3vw, 30px); line-height: 1.05; transition: padding .35s var(--ease), color .3s; }
button:hover { padding-left: 10px; }
i { flex: none; width: 34px; height: 34px; border: 2px solid var(--ink); position: relative; transition: background .3s, transform .5s var(--ease); }
i::before, i::after { content: ''; position: absolute; left: 50%; top: 50%; width: 14px; height: 2.5px; background: var(--ink); transform: translate(-50%, -50%); }
i::after { transform: translate(-50%, -50%) rotate(90deg); transition: transform .4s var(--ease); }
.open i { background: var(--yellow); transform: rotate(180deg); }
.open i::after { transform: translate(-50%, -50%) rotate(0); }
.ans { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s var(--ease-out); }
.ans > div { overflow: hidden; }
.open .ans { grid-template-rows: 1fr; }
.ans p { margin: 0; padding: 0 60px 26px 0; color: #3a3833; font-size: 18px; max-width: 60ch; }
@media (max-width: 820px) { .grid { grid-template-columns: 1fr; } .ans p { padding-right: 0; } }
</style>
