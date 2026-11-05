<script setup lang="ts">
// Barra fixa no celular: aparece depois do hero e some quando o formulário tá na tela.
const { link, canal } = useContato()
const show = ref(false)
let formVisible = false
let io: IntersectionObserver | null = null
function onScroll() { show.value = window.scrollY > window.innerHeight * 0.9 && !formVisible }
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const f = document.getElementById('comecar')
  if (f) {
    io = new IntersectionObserver(([e]) => { formVisible = e.isIntersecting; onScroll() })
    io.observe(f)
  }
})
onBeforeUnmount(() => { window.removeEventListener('scroll', onScroll); io?.disconnect() })
</script>

<template>
  <div class="mb" :class="{ show }">
    <a :href="link()" target="_blank" rel="noopener" class="go">
      <span class="dot" /> Chamar no {{ canal }} <span aria-hidden="true">↗</span>
    </a>
  </div>
</template>

<style scoped>
.mb { display: none; }
@media (max-width: 920px) {
  .mb { display: block; position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom)); z-index: 60; transform: translateY(140%); transition: transform .5s var(--ease-out); }
  .mb.show { transform: none; }
  .go { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 17px; background: var(--yellow); color: var(--ink); border: 2px solid var(--ink); box-shadow: 4px 4px 0 var(--ink); font-family: var(--f-display); font-weight: 900; font-size: 20px; text-transform: uppercase; text-decoration: none; }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #1fa855; }
}
</style>
