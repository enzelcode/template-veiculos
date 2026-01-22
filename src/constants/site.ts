/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Quintanilha Autos',
  slogan: 'O melhor atendimento do Vale do Paraíba',
  description: 'Somos a Quintanilha Autos uma loja de seminovos em Taubaté onde buscamos ter e ser o melhor atendimento do vale do Paraíba! Venha nos visitar e ter a melhor sensação de ser bem atendido',

  // Contato
  phone: '(12) 99196-3769',
  whatsapp: '5512991963769',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'R. Noruega',
    number: '112',
    neighborhood: 'Jardim das Nações',
    city: 'Taubaté',
    state: 'SP',
    zipCode: '12030-207',
    full: 'R. Noruega, 112 - Jardim das Nações, Taubaté - SP, 12030-207',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 18:00',
    saturday: '09:00 às 14:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-18h | Sáb: 09h-14h',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/quintanilha_autos/',
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
