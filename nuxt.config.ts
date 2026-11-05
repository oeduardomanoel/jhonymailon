// Domínio: defina NUXT_PUBLIC_SITE_URL na Vercel quando tiver domínio próprio.
// Sem ele, usa o domínio de produção que a Vercel injeta no build.
const siteUrl = (
  process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  || 'https://jhonymailon.vercel.app'
).replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  runtimeConfig: {
    public: { siteUrl },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      link: [
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/big-shoulders-display-latin.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/archivo-latin.woff2', crossorigin: '' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'text/plain', href: '/llms.txt', title: 'llms.txt' },
      ],
      meta: [
        { name: 'theme-color', content: '#0E0E0C' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },

  routeRules: {
    '/**': { prerender: true },
    '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/links', '/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt'],
    },
  },

  experimental: { payloadExtraction: false },
})
