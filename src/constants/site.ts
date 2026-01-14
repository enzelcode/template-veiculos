/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Max Veículos',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos e intermediações em Jacareí. Atendemos São José dos Campos e região.',

  // Contato
  phone: '(12) 98295-5001',
  whatsapp: '5512982955001',
  whatsapp2: '5512981386010',
  email: 'max.automav@hotmail.com',

  // Endereço
  address: {
    street: 'R. Timbiras',
    number: '93',
    neighborhood: 'Jardim Luiza',
    city: 'Jacareí',
    state: 'SP',
    zipCode: '12305-190',
    full: 'R. Timbiras, 93 - Jardim Luiza, Jacareí/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 18:30',
    saturday: 'Fechado',
    sunday: 'Fechado',
    formatted: 'Seg-Qui: 09h-18h30 | Sex: 09h-18h',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/maxveiculos.sjc',
    facebook: 'https://facebook.com/maxveiculos.sjc',
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
