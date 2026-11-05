<script setup lang="ts">
useHead({
  script: [
    // marca o <html> antes da pintura pra não piscar conteúdo que vai animar
    { innerHTML: "document.documentElement.classList.add('js');setTimeout(function(){document.querySelectorAll('[data-reveal],.split').forEach(function(e){e.classList.add('is-in')})},6000)", tagPosition: 'head' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
