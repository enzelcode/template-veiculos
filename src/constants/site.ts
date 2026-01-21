/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Galvão Motors',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em Jundiaí com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(11) 94928-2366',
  whatsapp: '5511949282366',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'Rua Barão de Teffé',
    number: '',
    neighborhood: 'Jardim Ana Maria',
    city: 'Jundiaí',
    state: 'SP',
    zipCode: '13208-760',
    full: 'R. Barão de Teffé - Jardim Ana Maria, Jundiaí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 18:00',
    saturday: 'Fechado',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-18h | Sáb-Dom: Fechado',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/galvao.motors/',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  // Links de navegação
  navigation: {
    main: [
      { label: 'Início', href: '/' },
      { label: 'Veículos', href: '/veiculos' },
      { label: 'Simule Agora', href: '/simule' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
