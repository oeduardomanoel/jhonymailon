<script setup lang="ts">
// Quebra o texto em palavras pra animar uma por uma quando entra na tela.
// Use "|" pra forçar quebra de linha e "*palavra*" pra destacar.
const props = withDefaults(defineProps<{ text: string; tag?: string; delay?: number }>(), { tag: 'span', delay: 0 })
const lines = computed(() => {
  let i = 0
  let dentro = false // ênfase pode atravessar várias palavras: *sem achismo.*
  return props.text.split('|').map(l =>
    l.trim().split(/\s+/).map((w) => {
      const abre = w.startsWith('*')
      const fecha = /\*[.,!?:]?$/.test(w)
      const em = dentro || abre
      if (abre) dentro = true
      if (fecha) dentro = false
      return { w: w.replace(/\*/g, ''), em, i: i++ }
    }),
  )
})
</script>

<template>
  <component :is="tag" class="split" :style="{ '--d': delay }" :aria-label="text.replace(/[|*]/g, '').replace(/\s+/g, ' ')">
    <span v-for="(line, li) in lines" :key="li" class="split-line" aria-hidden="true">
      <template v-for="word in line" :key="word.i">
        <span class="w"><span :class="{ em: word.em }" :style="{ '--i': word.i }">{{ word.w }}</span></span>{{ ' ' }}
      </template>
    </span>
  </component>
</template>

<style scoped>
.split-line { display: block; }
.em { color: var(--accent, var(--yellow)); }
</style>
