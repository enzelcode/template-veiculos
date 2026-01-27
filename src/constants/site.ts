/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'WR Veículos',
  slogan: 'Seu próximo veículo está aqui!',
  description: 'WR Veículos - Compra, venda, troca e financiamento de veículos em Poços de Caldas/MG.',

  // Contato
  phone: '(35) 99237-0414',
  whatsapp: '5535992370414',
  email: '',

  // Endereço
  address: {
    street: 'Av. Santo Antônio',
    number: '527',
    neighborhood: 'Jardim Cascatinha',
    city: 'Poços de Caldas',
    state: 'MG',
    zipCode: '37701-036',
    full: 'Av. Santo Antônio, 527 - Jardim Cascatinha, Poços de Caldas/MG',
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
    instagram: 'https://www.instagram.com/wrveiculospocos/',
    facebook: 'https://www.facebook.com/wrveiculospocosc',
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
