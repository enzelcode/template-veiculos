/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que mudam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Star Motors SJC',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em São José dos Campos com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(12) 99743-9795',
  whatsapp: '5512988435747',
  whatsapp2: '5512997439795',
  email: 'contato@starmotorssjc.com.br',

  // Endereço
  address: {
    street: 'Av. Andrômeda',
    number: '3740',
    neighborhood: 'Bosque dos Eucaliptos',
    city: 'São José dos Campos',
    state: 'SP',
    zipCode: '12233-001',
    full: 'Av. Andrômeda, 3740 - Bosque dos Eucaliptos, São José dos Campos/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:00 às 18:30',
    saturday: '08:00 às 14:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 08h-18h30 | Sáb: 08h-14h',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/starmotors.sjc',
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
