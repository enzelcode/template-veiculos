/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'DRZ Motors',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em Jundiaí com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(11) 3964-3991',
  whatsapp: '5511997447746',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'Rua Conde de Monsanto',
    number: '502',
    neighborhood: 'Vila Vianelo',
    city: 'Jundiaí',
    state: 'SP',
    zipCode: '13207-060',
    full: 'Rua Conde de Monsanto, 502 - Vila Vianelo, Jundiaí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 18:00',
    saturday: '09:00 às 13:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-18h | Sáb: 09h-13h',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/drzmotors/',
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
