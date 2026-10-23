export type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  checkoutUrl: string;
};

export type SiteContent = {
  brand: { name: string; product: string; logoUrl: string };
  colors: Record<"pink" | "purple" | "yellow" | "turquoise" | "coral" | "mint", string>;
  hero: {
    top: string;
    big: string;
    suffix: string;
    sub1: string;
    sub2: string;
    text: string;
    highlight: string;
    cta: string;
    ctaNote: string;
    showDigital: boolean;
    imageUrl: string;
    badges: string[];
  };
  carousel: { title: string; speed: number; height: number };
  categories: { title: string; phrase: string; items: { title: string; desc: string; imageUrl: string }[] };
  benefits: { title: string; items: { title: string; desc: string }[] };
  gallery: { title: string; note: string; watermark: boolean; watermarkText: string };
  plans: {
    title: string;
    subtitle: string;
    paymentNote: string;
    showPaymentNote: boolean;
    basic: Plan;
    premium: Plan & { badge: string; showBadge: boolean };
    comparison: { label: string; basic: string; premium: string }[];
  };
  testimonials: { title: string; emptyNotice: string };
  about: {
    title: string;
    name: string;
    text: string;
    experience: string;
    motivation: string;
    photoUrl: string;
    photoShape: "circle" | "rounded";
    photoPosY: number;
    photoZoom: number;
    contact: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  final: { title: string; subtitle: string; reinforce: string; midCta: string };
  links: { support: string; instagram: string; other: string; otherLabel: string };
  footer: {
    contact: string;
    privacyUrl: string;
    termsUrl: string;
    deliveryInfo: string;
    refundInfo: string;
    copyrightInfo: string;
  };
  stickyCta: boolean;
};

export const DEFAULT_CONTENT: SiteContent = {
  brand: { name: "Samara Criar Art's", product: "Kit +5.000 Moldes de E.V.A.", logoUrl: "" },
  colors: {
    pink: "#ec3a8c",
    purple: "#7b3fb8",
    yellow: "#f8c831",
    turquoise: "#1fb5bf",
    coral: "#f6735a",
    mint: "#9be3c4",
  },
  hero: {
    top: "MAIS DE",
    big: "5.000 MOLDES",
    suffix: "DE E.V.A.!",
    sub1: "TRANSFORME SUAS IDEIAS",
    sub2: "EM CRIAÇÕES INCRÍVEIS!",
    text: "Imagine ter milhares de ideias criativas ao seu alcance! Encontre inspiração para seus trabalhos artesanais, crie peças encantadoras e tenha muito mais praticidade no seu dia a dia.",
    highlight: "Mais criatividade para você. Mais possibilidades para suas mãos!",
    cta: "QUERO MEUS +5.000 MOLDES AGORA!",
    ctaNote: "Escolha seu plano e confira tudo o que está incluído na coleção.",
    showDigital: false,
    imageUrl: "",
    badges: ["Mais de 5.000 moldes", "Inspire-se e crie", "Um mundo de possibilidades"],
  },
  carousel: { title: "OLHA QUANTA INSPIRAÇÃO VOCÊ VAI ENCONTRAR!", speed: 45, height: 260 },
  categories: {
    title: "UM UNIVERSO DE POSSIBILIDADES PARA SUAS CRIAÇÕES!",
    phrase: "Mais de 5.000 moldes reunidos em uma coleção para inspirar seus projetos artesanais!",
    items: [
      { title: "Flores e folhagens", desc: "Pétalas, folhas e arranjos delicados.", imageUrl: "" },
      { title: "Animais e bichinhos", desc: "Bichinhos fofos para todas as idades.", imageUrl: "" },
      { title: "Letras do alfabeto", desc: "Letras para nomes, murais e recados.", imageUrl: "" },
      { title: "Números e formas", desc: "Números e formas geométricas.", imageUrl: "" },
      { title: "Temas escolares", desc: "Referências para a sala de aula.", imageUrl: "" },
      { title: "Lembrancinhas", desc: "Ideias para presentear com carinho.", imageUrl: "" },
      { title: "Decoração de festas", desc: "Enfeites para festas temáticas.", imageUrl: "" },
      { title: "Datas comemorativas", desc: "Páscoa, Natal, Dia das Mães e mais.", imageUrl: "" },
    ],
  },
  benefits: {
    title: "POR QUE TER ESSA COLEÇÃO DE MOLDES?",
    items: [
      { title: "Mais inspiração", desc: "Encontre referências para desenvolver diferentes ideias artesanais." },
      { title: "Mais praticidade", desc: "Tenha moldes como referência para planejar suas criações." },
      { title: "Variedade de possibilidades", desc: "Explore diferentes formatos, temas e estilos presentes no acervo." },
      { title: "Para diferentes ocasiões", desc: "Inspiração para decoração, atividades escolares, lembrancinhas e outros projetos compatíveis com a coleção." },
      { title: "Economia de tempo", desc: "Reduza a necessidade de desenhar cada formato do zero." },
      { title: "Para quem ama artesanato", desc: "Uma coleção para quem gosta de transformar materiais simples em criações especiais." },
    ],
  },
  gallery: {
    title: "VEJA DE PERTO ALGUNS DOS MOLDES DA COLEÇÃO!",
    note: "Prévias de moldes da coleção.",
    watermark: false,
    watermarkText: "PRÉVIA",
  },
  plans: {
    title: "ESCOLHA SEU PLANO E COMECE A CRIAR!",
    subtitle: "Encontre a opção ideal para você e descubra novas possibilidades para seus projetos artesanais.",
    paymentNote: "",
    showPaymentNote: false,
    basic: {
      name: "PLANO BÁSICO",
      price: "R$ 9,90",
      description: "Uma opção econômica para começar a explorar os moldes e dar vida às suas ideias.",
      features: [
        "Acesso ao conteúdo descrito para o Plano Básico",
        "Coleção de moldes incluída na oferta",
        "Arquivos digitais, conforme a descrição do produto",
        "Instruções de acesso ao material",
      ],
      cta: "QUERO COMEÇAR POR R$ 9,90",
      checkoutUrl: "",
    },
    premium: {
      name: "PLANO PREMIUM",
      price: "R$ 14,99",
      description: "Para quem deseja uma versão mais completa da coleção e ainda mais possibilidades para criar.",
      features: [
        "Conteúdo do Plano Básico (confirme se está incluído)",
        "Moldes adicionais (descreva, se existirem)",
        "Categorias exclusivas (descreva, se existirem)",
        "Instruções de acesso ao conteúdo",
      ],
      cta: "QUERO O PREMIUM POR R$ 14,99",
      checkoutUrl: "",
      badge: "OPÇÃO MAIS COMPLETA",
      showBadge: true,
    },
    comparison: [
      { label: "Coleção de moldes da oferta", basic: "✓", premium: "✓" },
      { label: "Arquivos digitais", basic: "✓", premium: "✓" },
      { label: "Instruções de acesso", basic: "✓", premium: "✓" },
      { label: "Conteúdo extra do Premium (edite)", basic: "—", premium: "✓" },
    ],
  },
  testimonials: {
    title: "O QUE DIZEM SOBRE NOSSO TRABALHO",
    emptyNotice: "Em breve, depoimentos reais de clientes aparecerão aqui.",
  },
  about: {
    title: "PRAZER, EU SOU [SEU NOME]!",
    name: "[Seu nome]",
    text: "Olá! Seja muito bem-vinda ao meu cantinho criativo!\n\nSou apaixonada pelo universo do artesanato e acredito que cada molde pode ser o começo de uma ideia especial.\n\nCriei esta coleção para reunir referências que possam inspirar suas criações, facilitar seu processo criativo e ajudar você a transformar ideias em projetos feitos com carinho.\n\nQuero compartilhar com você um pouco desse universo cheio de cores, criatividade e possibilidades!",
    experience: "",
    motivation: "",
    photoUrl: "",
    photoShape: "rounded",
    photoPosY: 50,
    photoZoom: 1,
    contact: "",
  },
  faq: {
    title: "DÚVIDAS FREQUENTES",
    items: [
      { q: "O que é o Kit com Mais de 5.000 Moldes de E.V.A.?", a: "É uma coleção digital de moldes para servir como referência em diferentes projetos artesanais, de acordo com a descrição do produto." },
      { q: "Como vou receber o material?", a: "[Conteúdo demonstrativo — descreva aqui o método de entrega real: página de acesso, e-mail ou outro canal.]" },
      { q: "Qual é a diferença entre o Básico e o Premium?", a: "Confira a tabela de comparação na seção de planos, que mostra o que cada opção inclui." },
      { q: "Preciso receber algum produto físico?", a: "[Conteúdo demonstrativo — informe se a oferta é composta somente por arquivos digitais.]" },
      { q: "Posso acessar pelo celular?", a: "[Conteúdo demonstrativo — explique a compatibilidade conforme os formatos dos arquivos.]" },
      { q: "Como faço para comprar?", a: "Escolha um dos planos na seção de planos e conclua a compra no checkout correspondente." },
      { q: "Como entro em contato se tiver dúvidas?", a: "[Conteúdo demonstrativo — informe seu e-mail, WhatsApp comercial ou outro canal oficial.]" },
      { q: "Posso utilizar os moldes comercialmente?", a: "[Conteúdo demonstrativo — explique os direitos de uso conforme a licença real do material.]" },
    ],
  },
  final: {
    title: "SUA PRÓXIMA CRIAÇÃO PODE COMEÇAR AQUI!",
    subtitle: "Escolha seu plano e descubra novas possibilidades para seus projetos artesanais.",
    reinforce: "Mais criatividade, mais inspiração e novas ideias para colocar em prática!",
    midCta: "QUERO DAR VIDA ÀS MINHAS IDEIAS!",
  },
  links: { support: "", instagram: "", other: "", otherLabel: "" },
  footer: {
    contact: "",
    privacyUrl: "",
    termsUrl: "",
    deliveryInfo: "",
    refundInfo: "",
    copyrightInfo: "",
  },
  stickyCta: true,
};

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function mergeContent<T>(base: T, override: unknown): T {
  if (!isObj(base) || !isObj(override)) {
    return (override === undefined || override === null ? base : (override as T));
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(base)) {
    const b = (base as Record<string, unknown>)[key];
    const o = override[key];
    if (o === undefined) continue;
    out[key] = isObj(b) ? mergeContent(b, o) : typeof o === typeof b || b === null ? o : b;
  }
  return out as T;
}

/** Only https/http links are allowed as checkout destinations. */
export function safeLink(url: string | undefined | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export function hexToVar(hex: string) {
  return /^#[0-9a-f]{6}$/i.test(hex) ? hex : undefined;
}
