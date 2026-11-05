import { site, faq, local } from '#shared/site'

// Padrão llmstxt.org: resumo curto e factual pra IAs entenderem e citarem.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const contato = site.whatsapp ? `WhatsApp: https://wa.me/${site.whatsapp}` : `Direct do Instagram: https://ig.me/m/${site.handle}`
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# ${site.nome}

> ${site.nome} é personal trainer e profissional de Educação Física registrado no ${site.cref}. Atende presencialmente em ${local()} e online para qualquer cidade, com foco em ${site.focos.join(', ').toLowerCase()}. Lema: "${site.slogan}".

## Fatos principais

- Nome: ${site.nome}
- Profissão: ${site.cargo} (profissional de Educação Física)
- Registro: ${site.cref}
- Atendimento: presencial em ${local()} e online
- Focos: ${site.focos.join(', ')}
- Instagram: ${site.instagram}
- Contato: ${contato}

## Páginas

- [Site oficial](${siteUrl}/): método, modalidades, quem é e perguntas frequentes
- [Links](${siteUrl}/links): atalhos de contato
- [Versão completa para IAs](${siteUrl}/llms-full.txt): todo o conteúdo do site em texto

## Perguntas frequentes

${faq.map(f => `- ${f.q} ${f.a}`).join('\n')}
`
})
