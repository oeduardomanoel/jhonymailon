<script setup lang="ts">
import { site, local } from '#shared/site'
</script>

<template>
  <section id="sobre" class="sec sobre" aria-labelledby="sobre-title">
    <div class="wrap grid">
      <div class="collage" aria-hidden="false">
        <figure class="p p1" data-speed="0.06">
          <img src="/img/avatar.webp" alt="Jhony Mailon de regata camuflada na academia" width="400" height="400" loading="lazy">
        </figure>
        <figure class="p p2" data-speed="-0.05" data-reveal="scale" style="--r: 4deg">
          <span class="tape" style="left: 30%; top: -12px; transform: rotate(3deg)" />
          <img src="/img/perfil-pb.webp" alt="Jhony Mailon de perfil com regata Crown" width="720" height="914" loading="lazy">
          <figcaption class="hand">foco</figcaption>
        </figure>
        <figure class="p p3" data-speed="0.12" data-reveal="scale" style="--r: -5deg; --d: 150">
          <img src="/img/palestra-pb.webp" alt="Palestra com plateia, registro do Instagram do Jhony" width="720" height="914" loading="lazy">
          <figcaption class="hand">dia de palestra</figcaption>
        </figure>
      </div>

      <div class="txt">
        <p class="eyebrow" data-reveal="fade">Quem tá do outro lado</p>
        <h2 id="sobre-title" class="h2"><SplitText text="Prazer,|*Jhony.*" /></h2>
        <p class="lead" data-reveal="up">
          Profissional de Educação Física, {{ site.cref }}. Atendo presencial em {{ local() }} e online pra quem tá longe.
        </p>
        <p data-reveal="up" style="--d: 100">
          Tatuado, pai e correria. Meu trabalho é tirar o teu treino do achismo: cada exercício tem um porquê,
          cada carga tem lógica e cada aluno tem alguém cobrando. Emagrecer, ganhar massa ou render mais, o caminho
          muda. A seriedade não.
        </p>
        <p data-reveal="up" style="--d: 200">
          Sim, o perfil é meio bagunçado. Treino, aluno, filho, cachorro, tudo junto. A ficha do aluno é que não pode ser.
        </p>

        <blockquote class="quote" data-reveal="up" style="--d: 300">
          <p>“Imagina só ir falar mal de mim e ter que ouvir: <mark>mas que o cara é correria, isso você não pode negar.</mark>”</p>
          <cite class="mono">eu mesmo, num post aí</cite>
        </blockquote>

        <dl class="creds mono" data-reveal="fade" style="--d: 350">
          <div><dt>Registro</dt><dd>{{ site.cref }}</dd></div>
          <div><dt>Foco</dt><dd>{{ site.focos.join(' · ') }}</dd></div>
          <div><dt>Atende</dt><dd>Presencial e online</dd></div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px, 7vw, 110px); align-items: center; }
.collage { position: relative; aspect-ratio: 4 / 5; }
.p { position: absolute; margin: 0; background: var(--paper); padding: 10px 10px 40px; box-shadow: 0 30px 60px -30px rgba(0,0,0,.55); translate: 0 var(--py, 0); transition: box-shadow .4s; }
.p img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.05); }
.p figcaption { position: absolute; left: 14px; bottom: 8px; font-size: 19px; }
.p1 { left: 18%; top: 4%; width: 60%; aspect-ratio: 1; padding: 0; border-radius: 50%; overflow: hidden; border: 6px solid var(--yellow); z-index: 1; }
.p1 img { border-radius: 50%; }
.p2 { left: 0; bottom: 0; width: 46%; aspect-ratio: 720 / 914; z-index: 2; }
.p3 { right: 0; bottom: 8%; width: 48%; aspect-ratio: 720 / 914; z-index: 3; }
.p2 img, .p3 img { height: calc(100% - 0px); }
.p:hover { z-index: 5; box-shadow: 0 40px 80px -30px rgba(0,0,0,.7); }
.txt p { max-width: 58ch; }
.lead { margin-top: 28px; font-weight: 500; }
.quote { margin: 36px 0 0; padding: 26px 28px; background: var(--ink); color: var(--bone); position: relative; transform: rotate(-1deg); transition: transform .4s var(--ease); }
.quote:hover { transform: rotate(0) scale(1.01); }
.quote::before { content: '“'; position: absolute; right: 18px; top: -26px; font-family: var(--f-display); font-size: 120px; color: var(--yellow); line-height: 1; }
.quote p { margin: 0; font-size: 19px; line-height: 1.45; }
.quote mark { background: none; color: var(--yellow); }
.quote cite { display: block; margin-top: 14px; font-style: normal; font-size: 10.5px; opacity: .6; }
.creds { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin: 36px 0 0; border-top: 2px solid var(--ink); }
.creds div { padding: 14px 12px 0 0; }
.creds dt { font-size: 10px; color: var(--muted); }
.creds dd { margin: 6px 0 0; font-size: 12px; font-weight: 600; text-transform: none; letter-spacing: 0; }
@media (max-width: 920px) {
  .grid { grid-template-columns: 1fr; }
  .collage { max-width: 460px; width: 100%; margin: 0 auto; }
  .creds { grid-template-columns: 1fr; } .creds div { padding: 10px 0; border-bottom: 1px solid var(--line); }
}
</style>
