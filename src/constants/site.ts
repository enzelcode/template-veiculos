/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Dama Seminovos',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 98836-5317',
  whatsapp: '5512988365317',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'R. Santa Helena',
    number: '468',
    neighborhood: 'São João',
    city: 'Jacareí',
    state: 'SP',
    zipCode: '12322-550',
    full: 'R. Santa Helena, 468 - São João, Jacareí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:30 às 18:00',
    saturday: '08:30 às 14:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 08h30-18h | Sáb: 08h30-14h',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/damaseminovos/',
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
