/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Senna Valle Veículos',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 3936-3000',
  whatsapp: '551239363000',
  whatsapp2: '',
  email: 'sennaveiculossjc@gmail.com',

  // Endereço
  address: {
    street: 'Av. Cidade Jardim',
    number: '4400',
    neighborhood: 'Jardim Portugal',
    city: 'São José dos Campos',
    state: 'SP',
    zipCode: '12232-000',
    full: 'Av. Cidade Jardim, 4400 - Jardim Portugal, São José dos Campos/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 18:30',
    saturday: '09:00 às 14:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-18h30 | Sáb: 09h-14h',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/sennavalleveiculos',
    facebook: 'https://facebook.com/sennavalleveiculos',
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
