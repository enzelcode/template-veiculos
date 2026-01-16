/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Alex Automóveis',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(49) 99989-1446',
  whatsapp: '5549999891446',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'R. Quilombo',
    number: '248 D',
    neighborhood: 'Efapi',
    city: 'Chapecó',
    state: 'SC',
    zipCode: '89809-520',
    full: 'R. Quilombo, 248 D - Efapi, Chapecó/SC',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '07:30 às 18:30',
    saturday: '07:30 às 12:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 07h30-18h30 | Sáb: 07h30-12h',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/alex_automoveis10',
    facebook: 'https://www.facebook.com/profile.php?id=61575010163319',
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
