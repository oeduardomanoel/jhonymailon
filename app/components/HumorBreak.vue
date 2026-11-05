<script setup lang="ts">
// Frase real do Jhony. As palavras "acendem" conforme o scroll passa pela seção.
const frase = 'Quando eu morrer vou direto pro céu. Porque o pecado tá na carne e eu só tenho osso.'
const words = frase.split(' ')
const el = ref<HTMLElement>()
const lit = ref(0)
function onScroll() {
  if (!el.value) return
  const r = el.value.getBoundingClientRect()
  const h = window.innerHeight
  const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.1)))
  lit.value = Math.round(p * words.length * 1.15)
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { lit.value = words.length; return }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section ref="el" class="humor" aria-label="Frase do Jhony">
    <div class="wrap">
      <p class="mono tag">Intervalo pra respirar ·  frase real do @jhonymailon</p>
      <p class="frase hand">
        <template v-for="(w, i) in words" :key="i"><span :class="{ on: i < lit, end: i >= words.length - 4 }">{{ w }}</span>{{ ' ' }}</template>
      </p>
      <p class="mono foot">(o humor vem de graça junto com o treino)</p>
    </div>
  </section>
</template>

<style scoped>
.humor { background: var(--ink); color: var(--bone); padding: clamp(90px, 14vw, 200px) 0; }
.tag { color: var(--yellow); margin: 0 0 30px; }
.frase { font-size: clamp(38px, 6.4vw, 96px); line-height: 1.08; margin: 0; max-width: 18ch; }
.frase span { color: #3a3934; transition: color .35s; }
.frase span.on { color: var(--bone); }
.frase span.on.end { color: var(--yellow); }
.foot { margin-top: 34px; opacity: .5; font-size: 11px; }
</style>
