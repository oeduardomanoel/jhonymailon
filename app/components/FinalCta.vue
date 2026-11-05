<script setup lang="ts">
const { $scrollTo } = useNuxtApp()
const { link, canal } = useContato()
</script>

<template>
  <section class="final" aria-labelledby="final-title">
    <MarqueeBand :items="['Sem frescura', 'Sem achismo', 'Entra aê']" tone="ink" :tilt="0" />
    <div class="wrap inner">
      <p class="hand note" data-reveal="scale" style="--r: -5deg">a próxima segunda é hoje.</p>
      <h2 id="final-title" class="display big"><SplitText text="Para de|começar|*segunda.*" /></h2>
      <div class="actions" data-reveal="up" style="--d: 300">
        <a href="#comecar" class="btn" @click.prevent="($scrollTo as any)('#comecar')">Montar minha mensagem <span class="arrow">→</span></a>
        <a :href="link()" target="_blank" rel="noopener" class="btn btn--ghost">Chamar no {{ canal }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.final { background: var(--yellow); overflow: hidden; }
.inner { padding-top: clamp(80px, 12vw, 160px); padding-bottom: clamp(80px, 12vw, 160px); position: relative; }
.note { font-size: clamp(22px, 2.4vw, 30px); margin: 0 0 18px; display: inline-block; }
.big { font-size: clamp(80px, 15vw, 240px); margin: 0; --accent: var(--bone); }
.big :deep(.em) { color: transparent; -webkit-text-stroke: 2px var(--ink); }
.actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 40px; }
@media (max-width: 640px) { .actions .btn { flex: 1 1 100%; justify-content: center; } }
</style>
