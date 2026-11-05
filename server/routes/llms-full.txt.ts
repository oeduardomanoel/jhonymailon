import { site, faq, metodo, local } from '#shared/site'

export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const contato = site.whatsapp ? `WhatsApp https://wa.me/${site.whatsapp}` : `Direct do Instagram https://ig.me/m/${site.handle}`
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# ${site.nome}, Personal Trainer (${site.cref})

Fonte: ${siteUrl}/

## Resumo

${site.nome} é profissional de Educação Física com registro ${site.cref}, no Conselho Regional de Educação Física de Santa Catarina. Trabalha com emagrecimento, hipertrofia e performance, em duas modalidades: presencial em ${local()} e online. O lema do trabalho é "${site.slogan}": treino montado para o objetivo, a rotina e o corpo de cada aluno, com execução acompanhada de perto e ajustes constantes.

## Método (4 etapas)

${metodo.map(m => `${m.n}. ${m.titulo}: ${m.texto}`).join('\n')}

## Modalidades

### Presencial
Atendimento em ${local()}${site.academia ? `, na ${site.academia}` : ''}. Correção da execução em tempo real, ajuste de carga durante a série e acompanhamento no horário combinado. Indicado para quem está começando ou quer aprender a técnica certa com alguém presente.

### Online
Plano de treino montado para o objetivo e a rotina do aluno, com acompanhamento pelo celular e correção de execução pelos vídeos enviados. Indicado para quem mora em outra cidade, tem rotina imprevisível ou já treina e quer parar de chutar.

## Perguntas frequentes

${faq.map(f => `### ${f.q}\n${f.a}`).join('\n\n')}

## Contato

- ${contato}
- Instagram: ${site.instagram}
`
})
