/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Mateus Veículos',
  slogan: 'Desde 2020 realizando sonhos!',
  description: 'Mateus Veículos - Compra, venda, troca e financiamento de veículos em Imperatriz/MA. Desde 2020 realizando sonhos!',

  // Contato
  phone: '(99) 99191-2802',
  whatsapp: '5599991912802',
  email: '',

  // Endereço
  address: {
    street: 'Rua Osvaldo Cruz',
    number: '736',
    neighborhood: 'Bacuri',
    city: 'Imperatriz',
    state: 'MA',
    zipCode: '65900-000',
    full: 'Rua Osvaldo Cruz, 736 - Bacuri, Imperatriz/MA',
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
    instagram: 'https://www.instagram.com/mateus.veiculos.itz/',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  // Links de navegação
  navigation: {
    main: [
      { label: 'Início', href: '/' },
      { label: 'Veículos', href: '/veiculos' },
      { label: 'Financiamento', href: '/simule' },
      { label: 'Venda seu Veículo', href: '/venda-seu-carro' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
