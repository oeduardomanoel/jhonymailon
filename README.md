# Jhony Mailon · Site

Site do personal trainer Jhony Mailon (CREF 043781-G/SC). Nuxt 4, tudo pré-renderizado, pronto pra Vercel.

## Antes de publicar (5 minutos)

Edite **só** `shared/site.ts`:

| Campo | O que colocar | Se ficar vazio |
|---|---|---|
| `whatsapp` | Só números com DDI e DDD: `5547999999999` | Botões abrem o Direct do Instagram e copiam a mensagem |
| `cidade` | Cidade do presencial | Site mostra "Santa Catarina" |
| `academia` | Nome da academia (opcional) | Não aparece |
| `email` | E-mail de contato (opcional) | Não aparece |
| `depoimentos` | Depoimentos reais, com autorização | A seção some sozinha |

Textos do método e do FAQ também estão nesse arquivo. Página, JSON-LD, `llms.txt` e sitemap leem tudo dali.

## Fotos

As fotos atuais foram recortadas de prints do Instagram (baixa resolução). O tratamento em halftone e P&B disfarça, mas o ideal é trocar pelos originais mantendo **o mesmo nome de arquivo** em `public/img/`:

- `hero-halftone.webp`, `planilha-halftone.webp`: versões halftone (fundo transparente, pontos pretos)
- `<nome>.webp` (colorida) + `<nome>-pb.webp` (preto e branco): a P&B aparece primeiro, a colorida no hover
- `avatar.webp`: foto de perfil (quadrada)

Fotos com alunos (`coach-cabo`, `coach-terra`): confirmar autorização de uso de imagem.

## Deploy na Vercel

1. Importe o repositório na Vercel (detecta Nuxt sozinha, não precisa configurar nada).
2. Quando tiver domínio próprio: Settings → Environment Variables → `NUXT_PUBLIC_SITE_URL=https://seudominio.com.br` e faça redeploy. Sem isso, canonical/sitemap usam o domínio `.vercel.app` do projeto.

## SEO e GEO

- `/sitemap.xml`, `/robots.txt` (libera Google e robôs de IA: GPTBot, ClaudeBot, PerplexityBot etc.)
- `/llms.txt` e `/llms-full.txt` (padrão llmstxt.org, pra IAs entenderem e citarem)
- JSON-LD: Person (com CREF), ProfessionalService, HowTo (método) e FAQPage
- Open Graph com imagem própria (`public/og.jpg`)
- `/links`: página pra colocar na bio do Instagram

## Rodar local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```
