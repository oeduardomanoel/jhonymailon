// Libera tudo, inclusive os robôs de IA (GEO: queremos ser citados por ChatGPT, Claude, Perplexity, Gemini).
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const aiBots = [
    'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
    'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Meta-ExternalAgent',
  ]
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiBots.flatMap(b => [`User-agent: ${b}`, 'Allow: /', '']),
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `# Resumo para IAs: ${siteUrl}/llms.txt`,
    '',
  ].join('\n')
})
