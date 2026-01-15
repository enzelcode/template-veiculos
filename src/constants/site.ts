/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Beckar Motors',
  slogan: 'O seminovo que você procura, está aqui',
  description: 'Loja de veículos seminovos em Taubaté com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 98881-4071',
  whatsapp: '5512988814071',
  whatsapp2: '',
  email: 'contato@beckarmotors.com.br',

  // Endereço
  address: {
    street: 'Av. Assis Chateaubriand',
    number: '240',
    neighborhood: 'Independência',
    city: 'Taubaté',
    state: 'SP',
    zipCode: '12031-000',
    full: 'Av. Assis Chateaubriand, 240 - Independência, Taubaté/SP',
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
    instagram: 'https://instagram.com/beckarr_',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  // Links de navegação
  navigation: {
    main: [
      { label: 'Início', href: '/' },
      { label: 'Veículos', href: '/veiculos' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
