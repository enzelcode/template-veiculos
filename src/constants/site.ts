/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Maverick Veículos',
  slogan: 'Seu próximo veículo está aqui!',
  description: 'Maverick Veículos - Compra, venda, troca e financiamento de veículos em Niterói/RJ. Atendemos São Gonçalo e região!',

  // Contato
  phone: '(21) 96564-3030',
  whatsapp: '5521965643030',
  email: '',

  // Endereço
  address: {
    street: 'Rua Benjamin Constant',
    number: '279',
    neighborhood: 'Barreto',
    city: 'Niterói',
    state: 'RJ',
    zipCode: '24110-002',
    full: 'R. Benjamin Constant, 279 - Barreto, Niterói/RJ',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:00 às 17:00',
    saturday: '08:00 às 12:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 08h-17h | Sáb: 08h-12h',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/maverickveiculos/',
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
