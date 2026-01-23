/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Lucas Motors',
  slogan: 'Desde 2016 | Nacionais | Importados | Blindados | 0km',
  description: 'Lucas Motors - Showroom em São José dos Campos. Nacionais, Importados, Blindados e 0km. Atendimento com horário agendado.',

  // Contato
  phone: '(12) 98133-3804',
  whatsapp: '5512981333804',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'R. Antônio Joaquim de Alvarenga',
    number: '251',
    neighborhood: 'Jardim Satélite',
    city: 'São José dos Campos',
    state: 'SP',
    zipCode: '12231-670',
    full: 'R. Antônio Joaquim de Alvarenga, 251 - Jardim Satélite, São José dos Campos - SP, 12231-670',
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
    instagram: 'https://www.instagram.com/lucasmotorssp/',
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
