<script setup lang="ts">
// Faixa que corre sozinha e acelera/inverte com a velocidade do scroll.
const props = withDefaults(defineProps<{ items: string[]; tone?: 'yellow' | 'ink'; tilt?: number }>(), { tone: 'yellow', tilt: -2 })
const track = ref<HTMLElement>()
let x = 0, dir = -1, last = 0, vel = 0, raf = 0, w = 0

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  last = window.scrollY
  const loop = () => {
    const y = window.scrollY
    const d = y - last; last = y
    if (Math.abs(d) > 0.5) dir = d > 0 ? -1 : 1
    vel += (Math.min(Math.abs(d), 60) * 0.35 - vel) * 0.08
    w = (track.value?.scrollWidth || 0) / 2
    x += dir * (0.6 + vel)
    if (w) { if (x <= -w) x += w; if (x > 0) x -= w }
    if (track.value) track.value.style.transform = `translate3d(${x}px,0,0)`
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
const doubled = computed(() => [...props.items, ...props.items, ...props.items, ...props.items])
</script>

<template>
  <div class="mq" :class="tone" :style="{ '--tilt': `${tilt}deg` }" aria-hidden="true">
    <div ref="track" class="track">
      <span v-for="(t, i) in doubled" :key="i" class="it display">{{ t }}<i>✕</i></span>
    </div>
  </div>
</template>

<style scoped>
.mq { overflow: hidden; transform: rotate(var(--tilt)); margin: 0 -2vw; padding: 14px 0; border-block: 2px solid var(--ink); position: relative; z-index: 3; }
.yellow { background: var(--yellow); color: var(--ink); }
.ink { background: var(--ink); color: var(--bone); border-color: var(--ink); }
.track { display: flex; width: max-content; will-change: transform; }
.it { font-size: clamp(34px, 5vw, 64px); display: inline-flex; align-items: center; gap: .5em; padding-right: .5em; white-space: nowrap; }
.it i { font-style: normal; font-size: .5em; color: currentColor; opacity: .5; }
.ink .it:nth-child(3n) { color: var(--yellow); }
</style>
