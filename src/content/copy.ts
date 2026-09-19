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
    { href: "#diagnostico", label: "Diagnóstico" },
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
  heading: "Área de atendimento",
  emptyMessage: "A lista de bairros/cidades atendidos será confirmada em breve.",
  ctaLabel: "Não tem certeza se atendemos sua região? Fale conosco",
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
