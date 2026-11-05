export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const hoje = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0', freq: 'weekly', img: [`${siteUrl}/img/hero.webp`, `${siteUrl}/img/avatar.webp`] },
  ]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
${u.img.map(i => `    <image:image><image:loc>${i}</image:loc></image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`
})
