/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Vale Veículos',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em Jacareí com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 97407-4292',
  whatsapp: '5512974074292',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'Av. Maria Augusta Fagundes Gomes',
    number: '339',
    neighborhood: 'Res. São Paulo',
    city: 'Jacareí',
    state: 'SP',
    zipCode: '12322-120',
    full: 'Av. Maria Augusta Fagundes Gomes, 339 - Res. São Paulo, Jacareí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:00 às 18:00',
    saturday: '08:00 às 13:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 08h-18h | Sáb: 08h-13h',
  },

  // Redes sociais
  social: {
    instagram: '',
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
