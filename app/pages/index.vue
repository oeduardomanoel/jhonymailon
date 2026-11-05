<script setup lang="ts">
import { site, faq, metodo, local } from '#shared/site'

const { public: { siteUrl } } = useRuntimeConfig()
const titulo = `${site.nome} | Personal Trainer em ${local()} e Online`
const descricao = `Personal trainer ${site.cref}. Treino sem frescura e sem achismo para emagrecimento, hipertrofia e performance. Atendimento presencial em ${local()} e online.`
const og = `${siteUrl}/og.jpg`

useSeoMeta({
  title: titulo,
  description: descricao,
  ogTitle: titulo,
  ogDescription: descricao,
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage: og,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Jhony Mailon, personal trainer. Treino sem frescura e sem achismo.',
  ogLocale: 'pt_BR',
  ogSiteName: site.nome,
  twitterCard: 'summary_large_image',
  twitterTitle: titulo,
  twitterDescription: descricao,
  twitterImage: og,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  author: site.nome,
})

const personId = `${siteUrl}/#jhony`
const serviceId = `${siteUrl}/#servico`
const area = [
  { '@type': 'State', name: site.estado },
  ...(site.cidade ? [{ '@type': 'City', name: site.cidade }] : []),
  { '@type': 'Country', name: 'Brasil' },
]

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite', '@id': `${siteUrl}/#site`, url: siteUrl, name: site.nome, inLanguage: 'pt-BR',
          publisher: { '@id': personId },
        },
        {
          '@type': 'Person', '@id': personId, name: site.nome, url: siteUrl,
          image: `${siteUrl}/img/avatar.webp`,
          jobTitle: site.cargo,
          description: `Profissional de Educação Física (${site.cref}). ${site.slogan}. Foco em ${site.focos.join(', ').toLowerCase()}.`,
          knowsAbout: ['Musculação', 'Treinamento de força', ...site.focos],
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Registro profissional',
            name: site.cref,
            recognizedBy: { '@type': 'Organization', name: 'Conselho Regional de Educação Física de Santa Catarina (CREF3/SC)' },
          },
          sameAs: [site.instagram],
          worksFor: { '@id': serviceId },
        },
        {
          '@type': ['ProfessionalService', 'HealthAndBeautyBusiness'], '@id': serviceId,
          name: `${site.nome} Personal Trainer`, url: siteUrl, image: `${siteUrl}/og.jpg`,
          description: descricao, founder: { '@id': personId }, areaServed: area,
          address: { '@type': 'PostalAddress', addressRegion: site.uf, addressCountry: 'BR', ...(site.cidade ? { addressLocality: site.cidade } : {}) },
          ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
          sameAs: [site.instagram],
          hasOfferCatalog: {
            '@type': 'OfferCatalog', name: 'Acompanhamento',
            itemListElement: ['Personal trainer presencial', 'Consultoria de treino online'].map(n => ({
              '@type': 'Offer', itemOffered: { '@type': 'Service', name: n, serviceType: 'Personal training', provider: { '@id': personId } },
            })),
          },
        },
        {
          '@type': 'HowTo', name: 'Como funciona o método de treino do Jhony Mailon',
          step: metodo.map((m, i) => ({ '@type': 'HowToStep', position: i + 1, name: m.titulo, text: m.texto })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ],
    }),
  }],
})

const modalidade = ref('')
</script>

<template>
  <div>
    <HeroSection />
    <MarqueeBand :items="['Emagrecimento', 'Hipertrofia', 'Performance', 'Presencial', 'Online']" />
    <DorSection />
    <MetodoSection />
    <ModalidadesSection @escolher="modalidade = $event" />
    <SobreSection />
    <HumorBreak />
    <GaleriaSection />
    <DepoimentosSection />
    <ComecarSection :modalidade="modalidade" />
    <FaqSection />
    <FinalCta />
  </div>
</template>
