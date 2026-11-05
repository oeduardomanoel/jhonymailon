<template>
  <div>
    <a class="skip" href="#conteudo">Pular pro conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <slot />
    </main>
    <SiteFooter />
    <MobileBar />
  </div>
</template>

<style>
.skip { position: fixed; left: 12px; top: -60px; z-index: 200; background: var(--yellow); color: var(--ink); padding: 10px 14px; font-weight: 700; transition: top .2s; }
.skip:focus { top: 12px; }
</style>
