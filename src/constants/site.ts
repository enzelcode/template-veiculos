/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Lider Veículos',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em Jundiaí com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(11) 4817-1918',
  whatsapp: '551148171918',
  whatsapp2: '',
  email: 'liderjeviculojundiai@gmail.com',

  // Endereço
  address: {
    street: 'Av. Antônio Frederico Ozanan',
    number: '3802',
    neighborhood: 'Vila de Vito',
    city: 'Jundiaí',
    state: 'SP',
    zipCode: '13215-010',
    full: 'Av. Antônio Frederico Ozanan, 3802 - Vila de Vito, Jundiaí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 17:00',
    saturday: '09:00 às 12:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-17h | Sáb: 09h-12h',
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
