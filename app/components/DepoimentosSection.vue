<script setup lang="ts">
import { site } from '#shared/site'
</script>

<template>
  <section v-if="site.depoimentos.length" class="sec dep" aria-labelledby="dep-title">
    <div class="wrap">
      <p class="eyebrow" data-reveal="fade">Quem treina comigo</p>
      <h2 id="dep-title" class="h2"><SplitText text="Fala deles,|*não minha.*" /></h2>
      <div class="cards">
        <figure v-for="(d, i) in site.depoimentos" :key="d.nome" class="card" data-reveal="up" :style="{ '--d': i * 100, '--rot': `${(i % 2 ? 1 : -1) * 1.2}deg` }">
          <img v-if="d.foto" :src="d.foto" :alt="`Foto de ${d.nome}`" loading="lazy" width="96" height="96">
          <blockquote>“{{ d.texto }}”</blockquote>
          <figcaption>
            <b>{{ d.nome }}</b>
            <span v-if="d.resultado" class="mono">{{ d.resultado }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 56px; }
.card { margin: 0; background: var(--paper); border: 2px solid var(--ink); padding: 26px; transform: rotate(var(--rot)); transition: transform .4s var(--ease), box-shadow .4s; }
.card:hover { transform: rotate(0) translateY(-6px); box-shadow: 8px 8px 0 var(--yellow); }
.card img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; margin-bottom: 16px; }
blockquote { margin: 0; font-size: 18px; }
figcaption { margin-top: 18px; display: flex; flex-direction: column; gap: 4px; }
figcaption .mono { color: #6b5400; }
</style>
