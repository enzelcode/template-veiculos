/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Alfa Veículos',
  slogan: 'Há mais de 20 anos com os melhores veículos',
  description: 'Alfa Veículos - Compra, venda, troca e consignação de veículos em Poços de Caldas/MG. Há mais de 20 anos com os melhores veículos, com garantia e procedência.',

  // Contato
  phone: '(35) 98831-9484',
  whatsapp: '5535988319484',
  email: 'alfaveiculos@jingleagency.com.br',

  // Endereço
  address: {
    street: 'Rua São Paulo',
    number: '503',
    neighborhood: '',
    city: 'Poços de Caldas',
    state: 'MG',
    zipCode: '37701-012',
    full: 'Rua São Paulo, 503 - Poços de Caldas/MG',
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
    instagram: 'https://www.instagram.com/alfaveiculospocos/',
    facebook: 'https://www.facebook.com/alfaveiculospocos',
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
