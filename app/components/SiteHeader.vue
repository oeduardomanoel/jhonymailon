<script setup lang="ts">
import { site } from '#shared/site'
const { $scrollTo } = useNuxtApp()
const { link, canal } = useContato()

const progress = ref(0)
const scrolled = ref(false)
const hidden = ref(false)
const open = ref(false)
let last = 0

function onScroll() {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? y / max : 0
  scrolled.value = y > 40
  hidden.value = y > 500 && y > last && !open.value
  last = y
}
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const nav = [
  { id: '#metodo', label: 'Método' },
  { id: '#modalidades', label: 'Presencial e online' },
  { id: '#sobre', label: 'Quem sou' },
  { id: '#duvidas', label: 'Dúvidas' },
]
function go(id: string) { open.value = false; ($scrollTo as any)(id) }
</script>

<template>
  <header class="hdr" :class="{ scrolled, hidden, open }">
    <div class="bar" :style="{ transform: `scaleX(${progress})` }" />
    <div class="wrap row">
      <a href="/" class="logo" aria-label="Jhony Mailon, início">
        <span class="logo-name">Jhony<b>Mailon</b></span>
        <span class="logo-cref mono">{{ site.cref }}</span>
      </a>
      <nav class="nav" aria-label="Principal">
        <a v-for="n in nav" :key="n.id" :href="`/${n.id}`" class="link-u" @click.prevent="go(n.id)">{{ n.label }}</a>
      </nav>
      <a :href="link()" target="_blank" rel="noopener" class="cta">
        <span class="dot" />Chamar no {{ canal }}
      </a>
      <button class="burger" :aria-expanded="open" aria-controls="menu-mobile" aria-label="Abrir menu" @click="open = !open">
        <span /><span />
      </button>
    </div>
    <div id="menu-mobile" class="drawer" :aria-hidden="!open">
      <a v-for="(n, i) in nav" :key="n.id" :href="`/${n.id}`" :style="{ '--i': i }" @click.prevent="go(n.id)">{{ n.label }}</a>
      <a :href="link()" target="_blank" rel="noopener" class="drawer-cta" :style="{ '--i': nav.length }">Chamar no {{ canal }} ↗</a>
    </div>
  </header>
</template>

<style scoped>
.hdr { position: fixed; inset: 0 0 auto; z-index: 50; transition: transform .5s var(--ease), background .4s, color .4s; color: var(--ink); }
.hdr.scrolled { background: rgba(237, 232, 223, .86); backdrop-filter: blur(10px) saturate(1.2); -webkit-backdrop-filter: blur(10px); }
.hdr.hidden { transform: translateY(-100%); }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: var(--yellow); transform-origin: left; transform: scaleX(0); }
.row { display: flex; align-items: center; gap: 28px; height: 72px; }
.logo { display: flex; flex-direction: column; text-decoration: none; line-height: 1; margin-right: auto; }
.logo-name { font-family: var(--f-display); font-weight: 900; font-size: 26px; text-transform: uppercase; letter-spacing: .01em; }
.logo-name b { font-weight: 900; margin-left: 5px; padding: 0 3px; background: linear-gradient(var(--yellow), var(--yellow)) 0 100% / 100% 38% no-repeat; transition: background-size .35s var(--ease); }
.logo:hover .logo-name b { background-size: 100% 100%; }
.logo-cref { font-size: 9.5px; opacity: .6; margin-top: 4px; }
.nav { display: flex; gap: 26px; font-weight: 500; font-size: 15px; }
.nav a { text-decoration: none; }
.cta { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; background: var(--ink); color: var(--bone); text-decoration: none; font-weight: 600; font-size: 14px; transition: background .3s, color .3s, transform .3s var(--ease); }
.cta:hover { background: var(--yellow); color: var(--ink); transform: rotate(-2deg); }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 0 rgba(61,220,132,.6); animation: pulse 2s infinite; }
@keyframes pulse { 70% { box-shadow: 0 0 0 10px rgba(61,220,132,0); } 100% { box-shadow: 0 0 0 0 rgba(61,220,132,0); } }
.burger { display: none; width: 44px; height: 44px; border: 0; background: transparent; position: relative; }
.burger span { position: absolute; left: 10px; right: 10px; height: 2.5px; background: currentColor; transition: transform .4s var(--ease); }
.burger span:first-child { top: 17px; } .burger span:last-child { top: 25px; right: 18px; }
.open .burger span:first-child { transform: translateY(4px) rotate(45deg); }
.open .burger span:last-child { transform: translateY(-4px) rotate(-45deg); right: 10px; }
.drawer { display: none; }

@media (max-width: 920px) {
  .nav, .cta { display: none; }
  .burger { display: block; }
  .drawer { display: flex; flex-direction: column; position: fixed; inset: 72px 0 auto; height: calc(100dvh - 72px); background: var(--ink); color: var(--bone); padding: 32px var(--gutter); gap: 6px; clip-path: inset(0 0 100% 0); transition: clip-path .6s var(--ease-out); }
  .open .drawer { clip-path: inset(0 0 0 0); }
  .open { background: var(--bone); }
  .drawer a { font-family: var(--f-display); font-weight: 900; text-transform: uppercase; font-size: 48px; line-height: 1.05; text-decoration: none; transform: translateY(30px); opacity: 0; transition: transform .6s var(--ease-out), opacity .6s; transition-delay: calc(var(--i) * 60ms + 150ms); }
  .open .drawer a { transform: none; opacity: 1; }
  .drawer-cta { color: var(--yellow); margin-top: auto; font-size: 32px !important; }
}
</style>
