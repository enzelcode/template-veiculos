/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'FG Prime Motors',
  slogan: 'Seminovos selecionados com atendimento personalizado',
  description: 'FG Prime Motors - Seminovos selecionados em Campo Grande/MS. Atendimento personalizado e as melhores condições.',

  // Contato
  phone: '(67) 99999-9999',
  whatsapp: '5567999999999',
  email: '',

  // Endereço
  address: {
    street: 'Av. Afonso Pena',
    number: '1000',
    neighborhood: 'Centro',
    city: 'Campo Grande',
    state: 'MS',
    zipCode: '79000-000',
    full: 'Av. Afonso Pena, 1000 - Centro, Campo Grande/MS',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:00 às 18:00',
    saturday: '08:00 às 12:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 08h-18h | Sáb: 08h-12h',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/fg_primemotors/',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  // Links de navegação
  navigation: {
    main: [
      { label: 'Início', href: '/' },
      { label: 'Veículos', href: '/veiculos' },
      { label: 'Venda seu Carro', href: '/venda-seu-carro' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
