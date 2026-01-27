/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Via Jaguar',
  slogan: 'Seu próximo veículo está aqui!',
  description: 'Via Jaguar - Compra, venda, troca e financiamento de veículos em Jaguariúna/SP.',

  // Contato
  phone: '(19) 99553-7005',
  whatsapp: '5519995537005',
  email: '',

  // Endereço
  address: {
    street: 'Rua Amazonas',
    number: '950',
    neighborhood: 'Jardim América',
    city: 'Jaguariúna',
    state: 'SP',
    zipCode: '13912-028',
    full: 'R. Amazonas, 950 - Jardim América, Jaguariúna/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:00 às 18:00',
    saturday: '08:30 às 13:00',
    sunday: 'Fechado',
    formatted: 'Ter-Sex: 08h-18h | Sáb: 08h30-13h',
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
      { label: 'Financiamento', href: '/simule' },
      { label: 'Venda seu Veículo', href: '/venda-seu-carro' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
