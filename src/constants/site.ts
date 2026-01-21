/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Podiumm',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em São José dos Campos com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 98222-3508',
  whatsapp: '5512982223508',
  whatsapp2: '5512974094296',
  email: '',

  // Endereço
  address: {
    street: 'Av. Guadalupe',
    number: '490',
    neighborhood: 'Jardim America',
    city: 'São José dos Campos',
    state: 'SP',
    zipCode: '12235-000',
    full: 'Av. Guadalupe, 490 - Jardim America, São José dos Campos/SP',
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
    instagram: 'https://www.instagram.com/podiummveiculos/',
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
