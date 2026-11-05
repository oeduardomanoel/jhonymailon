<script setup lang="ts">
import { site, local } from '#shared/site'
definePageMeta({ layout: 'bare' })
const { public: { siteUrl } } = useRuntimeConfig()
const { link, canal } = useContato()
useSeoMeta({
  title: `${site.nome} | Links`,
  description: `Todos os links do ${site.nome}, personal trainer ${site.cref}.`,
  ogImage: `${siteUrl}/og.jpg`,
  robots: 'noindex, follow',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/links` }] })

const links = computed(() => [
  { label: `Chamar no ${canal}`, sub: 'resposta direto comigo', href: link('Fala, Jhony! Vim pelo link da bio.'), main: true, ext: true },
  { label: 'Treino presencial', sub: local(), href: '/#modalidades' },
  { label: 'Consultoria online', sub: 'de qualquer cidade', href: '/#modalidades' },
  { label: 'Como funciona', sub: 'o método em 4 etapas', href: '/#metodo' },
  { label: 'Site completo', sub: 'tudo num lugar só', href: '/' },
])
</script>

<template>
  <div class="links">
    <div class="card">
      <img src="/img/avatar.webp" alt="Foto do Jhony Mailon" width="120" height="120" class="av">
      <h1 class="display">{{ site.nome }}</h1>
      <p class="mono cref">{{ site.cref }}</p>
      <p class="hand bio">{{ site.bio }}</p>
      <nav aria-label="Links">
        <a v-for="(l, i) in links" :key="l.label" :href="l.href" :target="l.ext ? '_blank' : undefined" :rel="l.ext ? 'noopener' : undefined" class="lk" :class="{ main: l.main }" :style="{ '--i': i }">
          <span><b>{{ l.label }}</b><small>{{ l.sub }}</small></span><i aria-hidden="true">→</i>
        </a>
      </nav>
      <p class="mono foot">Treino sem frescura e sem achismo</p>
    </div>
  </div>
</template>

<style scoped>
.links { min-height: 100svh; background: var(--ink); color: var(--bone); display: grid; place-items: center; padding: 48px 16px; }
.card { width: 100%; max-width: 440px; text-align: center; }
.av { width: 112px; height: 112px; border-radius: 50%; border: 4px solid var(--yellow); margin: 0 auto 18px; object-fit: cover; }
h1 { font-size: 56px; margin: 0; }
.cref { font-size: 11px; opacity: .6; margin: 8px 0 0; }
.bio { color: var(--yellow); font-size: 22px; margin: 16px 0 30px; transform: rotate(-2deg); }
nav { display: grid; gap: 12px; }
.lk { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border: 1.5px solid rgba(237,232,223,.25); text-decoration: none; text-align: left; transition: transform .35s var(--ease), background .3s, color .3s, border-color .3s; animation: in .6s var(--ease-out) both; animation-delay: calc(var(--i) * 70ms); }
.lk b { display: block; font-family: var(--f-display); font-weight: 800; font-size: 22px; text-transform: uppercase; }
.lk small { font-size: 13px; opacity: .6; }
.lk i { font-style: normal; font-size: 22px; transition: transform .35s var(--ease); }
.lk:hover { background: var(--bone); color: var(--ink); transform: translateX(4px); }
.lk:hover i { transform: translateX(4px) rotate(-45deg); }
.lk.main { background: var(--yellow); color: var(--ink); border-color: var(--yellow); }
.lk.main:hover { background: var(--bone); }
.foot { margin-top: 30px; font-size: 10px; opacity: .45; }
@keyframes in { from { opacity: 0; transform: translateY(14px); } }
</style>
