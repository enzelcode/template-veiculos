/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Exclusive Motors',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em Jacareí com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 98863-7720',
  whatsapp: '5512988637720',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'Av. Siqueira Campos',
    number: '525',
    neighborhood: 'Jardim Esper',
    city: 'Jacareí',
    state: 'SP',
    zipCode: '12307-000',
    full: 'Av. Siqueira Campos, 525 - Jardim Esper, Jacareí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 19:30',
    saturday: '08:00 às 17:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-19h30 | Sáb: 08h-17h',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/exclusive.motorss_',
    facebook: 'https://facebook.com/ExclusiveMotors',
    youtube: '',
    tiktok: '',
  },

  // Links de navegação
  navigation: {
    main: [
      { label: 'Início', href: '/' },
      { label: 'Veículos', href: '/veiculos' },
      { label: 'Simule', href: '/simule' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
