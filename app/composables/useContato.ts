import { site } from '#shared/site'

// Um lugar só pra decidir pra onde o lead vai: WhatsApp (se tiver número) ou DM do Instagram.
export function useContato() {
  const temWhats = Boolean(site.whatsapp)
  const dm = `https://ig.me/m/${site.handle}`

  const link = (msg = 'Fala, Jhony! Vim pelo site e quero saber mais sobre o acompanhamento.') =>
    temWhats ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}` : dm

  const canal = temWhats ? 'WhatsApp' : 'Direct'

  // Sem WhatsApp, a DM do Instagram não aceita texto pronto: copia pro clipboard antes de abrir.
  async function enviar(msg: string) {
    if (!temWhats) {
      try { await navigator.clipboard.writeText(msg) } catch {}
    }
    window.open(link(msg), '_blank', 'noopener')
  }

  return { temWhats, link, canal, enviar, dm }
}
