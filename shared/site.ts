// Tudo que é dado do Jhony mora aqui. Mudou telefone, cidade ou depoimento? Edita só este arquivo.
// Página, JSON-LD, llms.txt e sitemap leem daqui.

export interface Depoimento {
  nome: string
  texto: string
  resultado?: string // ex: "12 kg a menos em 5 meses" (só com autorização do aluno)
  foto?: string // caminho em /public/img/alunos/...
}

export const site = {
  nome: 'Jhony Mailon',
  handle: 'jhonymailon',
  cargo: 'Personal Trainer',
  cref: 'CREF 043781-G/SC',
  crefNumero: '043781-G/SC',
  estado: 'Santa Catarina',
  uf: 'SC',

  // PREENCHER: cidade/bairro do atendimento presencial. Vazio = mostra só "Santa Catarina".
  cidade: '',
  // PREENCHER: academia onde atende (opcional).
  academia: '',

  // PREENCHER: WhatsApp só com números, com DDI e DDD. Ex: '5547999999999'
  // Vazio = os botões abrem a DM do Instagram (ig.me) e copiam a mensagem.
  whatsapp: '',
  email: '',

  instagram: 'https://www.instagram.com/jhonymailon/',
  bio: 'Entra aê. Só não repare na bagunça.',
  slogan: 'Treino sem frescura e sem achismo',
  focos: ['Emagrecimento', 'Hipertrofia', 'Performance'] as const,
  modalidades: ['Presencial', 'Online'] as const,

  // Só coloque depoimento REAL e com autorização. Lista vazia = a seção some do site.
  depoimentos: [] as Depoimento[],
}

export const local = () => (site.cidade ? `${site.cidade}, ${site.uf}` : site.estado)

export const metodo = [
  {
    n: '01',
    titulo: 'Conversa antes do peso',
    texto:
      'Antes de pegar em qualquer carga eu quero saber da tua rotina, do teu histórico, das dores que tu sente e do que tu quer de verdade. Sem julgamento.',
    series: '1',
    reps: 'sem pressa',
    obs: 'escuta',
  },
  {
    n: '02',
    titulo: 'Plano no papel',
    texto:
      'Treino montado pro teu objetivo, pro teu corpo e pros dias que tu realmente consegue treinar. Com progressão definida. Chute não entra na ficha.',
    series: '1',
    reps: 'sob medida',
    obs: 'sem achismo',
  },
  {
    n: '03',
    titulo: 'Execução de perto',
    texto:
      'No presencial eu tô do teu lado corrigindo repetição por repetição. No online, o acompanhamento é pelo celular e a execução é ajustada pelos teus vídeos.',
    series: 'todas',
    reps: 'bem feitas',
    obs: 'técnica',
  },
  {
    n: '04',
    titulo: 'Ajuste o tempo todo',
    texto:
      'Corpo mudou, treino muda junto. Carga, volume, exercício: o que travar a tua evolução sai da ficha e entra outra coisa no lugar.',
    series: 'contínuo',
    reps: 'até chegar',
    obs: 'evolução',
  },
]

export const faq = [
  {
    q: 'O Jhony Mailon atende online?',
    a: 'Atende. São duas modalidades: presencial, em Santa Catarina, e online, pra quem mora em qualquer lugar ou tem rotina corrida demais pra ter horário fixo.',
  },
  {
    q: 'Ele é profissional registrado?',
    a: 'Sim. Jhony Mailon é profissional de Educação Física com registro CREF 043781-G/SC.',
  },
  {
    q: 'Qual é o foco do trabalho?',
    a: 'Emagrecimento, hipertrofia e performance. O treino é montado em cima do objetivo de cada aluno, nada de ficha copiada.',
  },
  {
    q: 'Nunca treinei. Serve pra mim?',
    a: 'Serve. Quem tá começando é justamente quem mais ganha com alguém olhando a execução desde o primeiro dia, antes de vício de movimento virar lesão.',
  },
  {
    q: 'Em quanto tempo eu vejo resultado?',
    a: 'Depende do teu ponto de partida e da tua constância. Quem promete prazo exato sem nem te conhecer tá chutando, e chute é a única coisa que não entra no meu treino.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende da modalidade e de quantas vezes por semana. Me chama no WhatsApp ou no direct que eu te passo os valores certinhos.',
  },
]
