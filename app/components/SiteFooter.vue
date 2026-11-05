<script setup lang="ts">
import { site, local } from '#shared/site'
const { link, canal } = useContato()
const ano = new Date().getFullYear()
</script>

<template>
  <footer class="ft">
    <div class="wrap">
      <p class="huge display" aria-hidden="true">Jhony<span>Mailon</span></p>
      <div class="cols">
        <div>
          <p class="mono k">Quem</p>
          <p>{{ site.nome }}, {{ site.cargo.toLowerCase() }}<br>{{ site.cref }}</p>
        </div>
        <div>
          <p class="mono k">Onde</p>
          <p>Presencial em {{ local() }}<br>Online de qualquer lugar</p>
        </div>
        <div>
          <p class="mono k">Fala comigo</p>
          <p>
            <a :href="link()" target="_blank" rel="noopener" class="link-u">{{ canal }}</a><br>
            <a :href="site.instagram" target="_blank" rel="noopener me" class="link-u">Instagram @{{ site.handle }}</a><br>
            <a v-if="site.email" :href="`mailto:${site.email}`" class="link-u">{{ site.email }}</a>
          </p>
        </div>
      </div>
      <div class="bottom mono">
        <span>© {{ ano }} {{ site.nome }}</span>
        <span>Treino sem frescura e sem achismo</span>
        <NuxtLink to="/links" class="link-u">/links</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft { background: var(--ink); color: var(--bone); padding: 80px 0 110px; overflow: hidden; }
.huge { font-size: clamp(56px, 14.2vw, 220px); margin: 0 0 60px; line-height: .8; white-space: nowrap; }
.huge span { color: transparent; -webkit-text-stroke: 1.5px var(--bone); transition: color .5s; }
.huge:hover span { color: var(--yellow); -webkit-text-stroke-color: var(--yellow); }
.cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; border-top: 1px solid var(--line-inv); padding-top: 32px; }
.k { color: var(--yellow); margin: 0 0 10px; font-size: 11px; }
.cols p { margin: 0; line-height: 1.7; }
.bottom { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 60px; font-size: 10.5px; opacity: .55; }
@media (max-width: 720px) { .cols { grid-template-columns: 1fr; } }
</style>
