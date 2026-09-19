/**
 * Site copy — every headline, intro sentence, and body paragraph that
 * isn't a hard business fact (those live in src/config/business.ts and
 * src/data/*.ts) but also isn't structural component behavior.
 *
 * This is the "Structural UI" content layer described in CONTENT_GUIDE.md:
 * safe to rewrite freely — rewording anything here never touches a
 * component's markup, logic, or styling.
 */

export const nav = {
  brandHref: "#topo",
  links: [
    { href: "#servicos", label: "Serviços" },
    { href: "#transformacao", label: "Transformação" },
    { href: "#processo", label: "Como funciona" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#paleta-de-cores", label: "Paleta de Cores" },
    { href: "#faq", label: "Dúvidas" },
  ],
  ctaLabel: "Solicitar orçamento",
};

export const hero = {
  // Headline defaults to businessConfig.tagline (src/config/business.ts).
  // Override it here instead if you want the Hero to say something
  // different from the <title>-facing tagline.
  headlineOverride: null as string | null,
  subtext:
    "Pintura residencial interna e externa, com atenção a cada detalhe — do primeiro traço até a limpeza final.",
  primaryCta: "Solicitar orçamento gratuito",
  secondaryCta: "Ver serviços",
};

export const valueProposition = {
  text: "Pintura residencial interna e externa para casas e apartamentos — com um acabamento que muda como cada ambiente parece e faz você se sentir.",
  commitments: [
    { swatch: "accent", label: "Orçamento gratuito" },
    { swatch: "ochre", label: "Protegemos sua casa" },
    { swatch: "accent", label: "Preço claro" },
    { swatch: "ochre", label: "Pontualidade" },
  ] as { swatch: "accent" | "ochre"; label: string }[],
};

export const services = {
  heading: "Serviços",
  intro: "Cada projeto começa com uma conversa sobre o que você precisa.",
};

export const transformation = {
  heading: "Transformação",
  intro: "Arraste para comparar o antes e o depois.",
  ctaLabel: "Quero um resultado assim",
};

export const workProcess = {
  heading: "Como funciona",
};

export const portfolio = {
  heading: "Portfólio",
  introEmpty:
    "Estamos documentando nossos projetos. Em breve, esta seção vai reunir fotos reais dos trabalhos realizados.",
  introPopulated: "Projetos reais, com fotos reais.",
  emptyCtaLabel: "Quer ver um exemplo agora? Fale com a gente pelo WhatsApp",
};

export const diagnostic = {
  teaserHeading: "Diagnóstico de pintura",
  teaserIntro:
    "Responda 6 perguntas rápidas e veja um resumo do seu projeto antes de pedir um orçamento.",
  teaserCtaLabel: "Começar diagnóstico",
  closeLabel: "Fechar",
  backLabel: "Voltar",
  nextLabel: "Avançar",
  resultCtaLabel: "Ver resultado",
  stepLabel: (current: number, total: number) => `Passo ${current} de ${total}`,
  resultHeading: "Seu perfil de pintura",
  editLabel: "Editar",
  conversionHeading: "Quer transformar esse diagnóstico em um orçamento?",
  primaryCtaLabel: "Calcular meu orçamento",
  secondaryCtaLabel: "Falar com o Reginaldo",
};

export const whyProfessional = {
  heading: "Por que a pintura profissional faz diferença",
  intro:
    "Boa parte do que separa um trabalho bem feito de um problemático é invisível até dar errado.",
  points: [
    {
      title: "Preparo evita problemas depois",
      text: "Uma superfície bem preparada evita que a tinta descasque ou solte antes do tempo.",
    },
    {
      title: "Número certo de demãos",
      text: "Afeta diretamente a durabilidade e a uniformidade do acabamento.",
    },
    {
      title: "Proteção do ambiente",
      text: "Máscaras e proteção de móveis e pisos evitam danos e retrabalho.",
    },
    {
      title: "Técnica consistente",
      text: "Mantém a cor fiel em todo o ambiente, sem variações perceptíveis entre paredes.",
    },
  ],
  linkLabel: "Veja como cuidamos de cada etapa",
};

export const serviceAreas = {
  badge: "São José e Região Metropolitana • SC",
  heading: "Área de Atendimento",
  intro:
    "Atendimento residencial especializado em São José, Florianópolis, Palhoça e Biguaçu. Levamos acabamento refinado, proteção do seu espaço e pontualidade até a sua casa.",
  emptyMessage: "A lista de cidades atendidas será confirmada em breve.",
  ctaLabel: "Mora em outra cidade ou condomínio vizinho? Fale conosco no WhatsApp",
  openInMaps: "Abrir no Google Maps",
  viewAll: "Todas as Regiões",
  features: [
    {
      title: "Casas e Apartamentos",
      text: "Atendimento completo em residências, condomínios e sobrados nas 4 cidades.",
    },
    {
      title: "Visita Técnica",
      text: "Avaliação precisa do local para um orçamento detalhado e sem surpresas.",
    },
    {
      title: "Proteção Total",
      text: "Cuidado absoluto com pisos, rodapés e móveis durante todo o trabalho.",
    },
  ],
};

export const testimonials = {
  heading: "O que dizem os clientes",
  invitationMessage: "Estamos começando a reunir avaliações de clientes reais.",
  invitationCtaLabel: "Fale com a gente pelo WhatsApp",
};

export const faq = {
  heading: "Perguntas frequentes",
  closingText: "Ainda com dúvidas?",
  closingLinkLabel: "Fale direto com a gente",
};

export const finalCta = {
  headline: "Imagine entrar em casa e sentir a diferença.",
  subtext: "Peça um orçamento gratuito e vamos conversar sobre o que você imagina para o seu espaço.",
  ctaLabel: "Solicitar orçamento gratuito",
};

export const contact = {
  heading: "Solicitar orçamento",
  intro: "Escolha o canal que for mais fácil para você.",
  whatsappReadyLabel: "Chamar no WhatsApp",
  whatsappPendingLabel: "WhatsApp (em breve — use o formulário)",
  hoursHeading: "Horário de atendimento",
  formLabels: {
    nome: "Nome",
    telefone: "Telefone",
    bairro: "Bairro",
    servico: "Serviço",
    mensagem: "Mensagem (opcional)",
    submit: "Enviar",
  },
};

export const floatingCta = {
  label: "Solicitar orçamento",
  ariaLabel: "Solicitar orçamento pelo WhatsApp",
};

export const quoteWizard = {
  heading: "Solicitar Orçamento",
  intro: "Monte os detalhes do seu projeto em poucos passos para receber uma estimativa personalizada.",
  stepCounter: (current: number, total: number) => `Passo ${current} de ${total}`,
  backLabel: "Voltar",
  nextLabel: "Avançar",
  summaryHeading: "Resumo do seu projeto",
  editLabel: "Editar",
  submitLabel: "Solicitar orçamento",
  colorAdviceTip: "O Reginaldo pode levar catálogos físicos e amostras de cores na visita técnica para ajudar você a definir a paleta ideal.",
  colorAdviceLink: "Ver dicas de cores",
  photoTip: "Dica: você também pode enviar fotos dos ambientes diretamente no WhatsApp com o Reginaldo após enviar a solicitação.",
  disclaimer: "Esta solicitação não substitui uma avaliação do local. O orçamento final depende das condições reais da superfície, metragem, preparação necessária e materiais.",
  labels: {
    property: "Tipo de imóvel",
    services: "Serviços",
    size: "Área aproximada",
    condition: "Estado atual",
    preparation: "Preparação",
    colors: "Cores",
    contact: "Contato e Região",
  },
};

export const colorPalettes = {
  badge: "Catálogos Oficiais",
  heading: "Paleta de Cores",
  intro:
    "Explore as ferramentas oficiais de cores das duas principais fabricantes do Brasil. Escolha os tons perfeitos para suas paredes internas e fachadas.",
  brands: [
    {
      id: "suvinil",
      name: "Suvinil",
      tagline: "Leque de Cores Suvinil",
      category: "Verdes, Neutros, Terrosos e Coleções",
      description:
        "Acesse a paleta oficial da Suvinil com milhares de tons divididos por famílias (como a famosa seleção de Verdes e Naturais), tendências do ano e códigos exatos de tinta.",
      url: "https://www.suvinil.com.br/paleta-de-cores/verdes",
      image: "/images/paletas/suvinil-paleta.jpg",
      buttonLabel: "Explorar paleta Suvinil",
    },
    {
      id: "coral",
      name: "Coral",
      tagline: "Paletas de Cor Coral",
      category: "Tendências, Neutros e Cores do Ano",
      description:
        "Consulte o catálogo interativo da Coral com inspirações para ambientes residenciais, combinações por harmonia e o catálogo completo da Cor do Ano.",
      url: "https://www.coral.com.br/pt/paletas-de-cor",
      image: "/images/paletas/coral-paleta.jpg",
      buttonLabel: "Explorar paleta Coral",
    },
  ],
  ctaHeading: "Já escolheu a sua cor ou quer ajuda profissional?",
  ctaText:
    "Envie o nome ou código da cor no seu orçamento ou converse com o Reginaldo para definir a melhor combinação para a sua casa.",
  primaryCtaLabel: "Solicitar orçamento",
  secondaryCtaLabel: "Falar com o Reginaldo",
};

