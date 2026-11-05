<script setup lang="ts">
import { site } from '#shared/site'
const props = defineProps<{ modalidade?: string }>()
const { enviar, temWhats, canal } = useContato()

const objetivos = ['Emagrecer', 'Ganhar massa', 'Melhorar performance', 'Ainda não sei']
const modos = ['Presencial', 'Online', 'Tanto faz']
const objetivo = ref('')
const modo = ref('')
const nome = ref('')
const extra = ref('')
const copiado = ref(false)

watch(() => props.modalidade, (m) => { if (m) modo.value = m }, { immediate: true })

const msg = computed(() => {
  const n = nome.value.trim()
  const partes = [`Fala, Jhony! ${n ? `Aqui é ${n}. ` : ''}Vim pelo site.`]
  if (objetivo.value) partes.push(objetivo.value === 'Ainda não sei'
    ? 'Ainda não sei bem qual objetivo focar, queria tua ajuda nisso.'
    : `Meu objetivo é ${objetivo.value.toLowerCase()}.`)
  if (modo.value) partes.push(modo.value === 'Tanto faz'
    ? 'Topo presencial ou online, o que fizer mais sentido.'
    : `Tenho interesse no acompanhamento ${modo.value.toLowerCase()}.`)
  if (extra.value.trim()) partes.push(extra.value.trim())
  return partes.join(' ')
})
const pronto = computed(() => objetivo.value && modo.value)

async function submit() {
  await enviar(msg.value)
  if (!temWhats) { copiado.value = true; setTimeout(() => (copiado.value = false), 6000) }
}
</script>

<template>
  <section id="comecar" class="sec sec--ink comecar on-ink" aria-labelledby="comecar-title">
    <div class="wrap grid">
      <div>
        <p class="eyebrow" style="color: var(--yellow)" data-reveal="fade">Bora começar</p>
        <h2 id="comecar-title" class="h2"><SplitText text="Três toques|e a gente|*conversa.*" /></h2>
        <p class="lead" data-reveal="up" style="color: #cfc9bd">
          Escolhe aí que eu já recebo a mensagem montada. Sem formulário chato e sem cadastro.
        </p>

        <form class="form" @submit.prevent="submit">
          <fieldset data-reveal="up" style="--d: 100">
            <legend class="mono"><span>1</span> Qual teu objetivo?</legend>
            <div class="chips">
              <label v-for="o in objetivos" :key="o" class="chip" :class="{ on: objetivo === o }">
                <input v-model="objetivo" type="radio" name="objetivo" :value="o">{{ o }}
              </label>
            </div>
          </fieldset>
          <fieldset data-reveal="up" style="--d: 180">
            <legend class="mono"><span>2</span> Como prefere?</legend>
            <div class="chips">
              <label v-for="m in modos" :key="m" class="chip" :class="{ on: modo === m }">
                <input v-model="modo" type="radio" name="modo" :value="m">{{ m }}
              </label>
            </div>
          </fieldset>
          <fieldset data-reveal="up" style="--d: 260">
            <legend class="mono"><span>3</span> Teu nome e, se quiser, um resumo</legend>
            <label class="field">
              <span class="sr">Teu nome</span>
              <input v-model="nome" type="text" placeholder="Teu nome" autocomplete="given-name" maxlength="60">
            </label>
            <label class="field">
              <span class="sr">Conta rapidinho tua rotina</span>
              <textarea v-model="extra" rows="2" maxlength="400" placeholder="Opcional. Ex: treino 3x por semana, tenho dor no joelho, nunca fiz musculação..." />
            </label>
          </fieldset>
          <button class="btn btn--yellow send" type="submit" :disabled="!pronto">
            {{ temWhats ? 'Mandar no WhatsApp' : 'Copiar e abrir o Direct' }} <span class="arrow">→</span>
          </button>
          <p v-if="!pronto" class="mono help">Marca o objetivo e o formato pra liberar o botão.</p>
          <p v-if="copiado" class="mono help ok" role="status">Mensagem copiada. É só colar no Direct e mandar.</p>
        </form>
      </div>

      <div class="phone-wrap" data-reveal="up" style="--d: 200">
        <div class="phone" aria-live="polite">
          <div class="ph-top">
            <img src="/img/avatar.webp" alt="" width="40" height="40">
            <div><b>{{ site.nome }}</b><span>{{ canal === 'WhatsApp' ? 'online' : 'Instagram' }}</span></div>
          </div>
          <div class="ph-body">
            <p class="sys mono">prévia da tua mensagem</p>
            <div :key="msg" class="bubble">{{ msg }}<span class="time">agora ✓✓</span></div>
            <div class="typing" :class="{ show: pronto }"><i /><i /><i /></div>
          </div>
        </div>
        <p class="hand phone-note">mensagem pronta, só mandar</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px, 6vw, 100px); align-items: center; }
.h2 { color: var(--bone); }
.lead { margin-top: 24px; }
.form { margin-top: 44px; display: grid; gap: 30px; }
fieldset { border: 0; padding: 0; margin: 0; }
legend { color: var(--bone); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; font-size: 12px; }
legend span { display: inline-grid; place-items: center; width: 24px; height: 24px; background: var(--yellow); color: var(--ink); font-weight: 600; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; }
.chip { position: relative; padding: 13px 18px; border: 1.5px solid rgba(237,232,223,.35); cursor: pointer; font-weight: 600; transition: border-color .25s, background .25s, color .25s, transform .25s var(--ease); user-select: none; }
.chip input { position: absolute; opacity: 0; pointer-events: none; }
.chip:hover { border-color: var(--yellow); transform: translateY(-2px); }
.chip:has(input:focus-visible) { outline: 3px solid var(--yellow); outline-offset: 2px; }
.chip.on { background: var(--yellow); color: var(--ink); border-color: var(--yellow); transform: rotate(-1.5deg); }
.field { display: block; margin-top: 10px; }
.field input, .field textarea { width: 100%; background: transparent; border: 0; border-bottom: 1.5px solid rgba(237,232,223,.35); color: var(--bone); font: inherit; font-size: 18px; padding: 12px 2px; resize: vertical; transition: border-color .3s; }
.field input:focus, .field textarea:focus { outline: none; border-color: var(--yellow); }
.field ::placeholder { color: rgba(237,232,223,.4); }
.send { justify-self: start; }
.send:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
.help { font-size: 11px; color: rgba(237,232,223,.5); margin: -14px 0 0; }
.ok { color: #3ddc84; }

.phone-wrap { position: relative; }
.phone { max-width: 380px; margin: 0 auto; background: #efe7dc; color: var(--ink); border: 10px solid #1f1f1c; border-radius: 38px; overflow: hidden; box-shadow: 0 40px 80px -30px rgba(0,0,0,.8), 0 0 0 2px #333 inset; transform: rotate(2deg); transition: transform .6s var(--ease); }
.phone:hover { transform: rotate(0) translateY(-6px); }
.ph-top { display: flex; align-items: center; gap: 12px; padding: 16px 18px; background: #1f1f1c; color: var(--bone); }
.ph-top img { width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--yellow); }
.ph-top div { display: flex; flex-direction: column; line-height: 1.2; }
.ph-top span { font-size: 12px; opacity: .6; }
.ph-body { min-height: 360px; padding: 20px 16px; display: flex; flex-direction: column; gap: 12px;
  background-image: radial-gradient(rgba(14,14,12,.06) 1px, transparent 1px); background-size: 14px 14px; }
.sys { align-self: center; font-size: 9.5px; background: rgba(14,14,12,.08); padding: 5px 10px; border-radius: 8px; }
.bubble { align-self: flex-end; max-width: 88%; background: #d9fdd3; padding: 10px 12px 18px; border-radius: 12px 2px 12px 12px; font-size: 15px; line-height: 1.4; position: relative; animation: pop .35s var(--ease-out); box-shadow: 0 1px 1px rgba(0,0,0,.08); }
.time { position: absolute; right: 10px; bottom: 3px; font-size: 10px; opacity: .55; }
@keyframes pop { from { transform: scale(.96); opacity: .5; } }
.typing { align-self: flex-start; background: #fff; padding: 12px 14px; border-radius: 2px 12px 12px 12px; display: flex; gap: 4px; opacity: 0; transform: translateY(8px); transition: opacity .4s .4s, transform .4s .4s; }
.typing.show { opacity: 1; transform: none; }
.typing i { width: 7px; height: 7px; border-radius: 50%; background: #9a958c; animation: blink 1.2s infinite; }
.typing i:nth-child(2) { animation-delay: .2s; } .typing i:nth-child(3) { animation-delay: .4s; }
@keyframes blink { 50% { opacity: .25; } }
.phone-note { position: absolute; right: 0; bottom: -40px; color: var(--yellow); font-size: 22px; transform: rotate(-4deg); margin: 0; }
@media (max-width: 920px) {
  .grid { grid-template-columns: 1fr; }
  .send { justify-self: stretch; justify-content: center; }
  .phone-note { position: static; text-align: center; margin-top: 18px; }
}
</style>
