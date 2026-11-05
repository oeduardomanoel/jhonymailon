<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number } }>()
useSeoMeta({ title: 'Página não encontrada | Jhony Mailon', robots: 'noindex' })
</script>

<template>
  <div class="err">
    <p class="mono">Erro {{ props.error?.statusCode || 404 }}</p>
    <h1 class="display">Essa série<br>não existe.</h1>
    <p class="hand">até eu me perdi aqui</p>
    <button class="btn btn--yellow" @click="clearError({ redirect: '/' })">Voltar pro treino →</button>
  </div>
</template>

<style scoped>
.err { min-height: 100svh; display: grid; place-content: center; justify-items: start; gap: 18px; padding: 24px; background: var(--ink); color: var(--bone); }
h1 { font-size: clamp(64px, 12vw, 160px); margin: 0; }
.hand { color: var(--yellow); font-size: 24px; margin: 0 0 12px; }
</style>
