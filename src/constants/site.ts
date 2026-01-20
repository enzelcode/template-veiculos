/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Impacta Multimarcas',
  slogan: 'Seu próximo carro começa aqui',
  description: 'Loja de veículos seminovos em Mogi das Cruzes com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(11) 91610-7656',
  whatsapp: '5511916107656',
  whatsapp2: '',
  email: 'impactamultimarcas@gmail.com',

  // Endereço
  address: {
    street: 'R. Ten. Manoel Alves dos Anjos',
    number: '571',
    neighborhood: 'Centro',
    city: 'Mogi das Cruzes',
    state: 'SP',
    zipCode: '08710-680',
    full: 'R. Ten. Manoel Alves dos Anjos, 571 - Centro, Mogi das Cruzes/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '09:00 às 18:00',
    saturday: 'Fechado',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 09h-18h',
  },

  // Redes sociais
  social: {
    instagram: 'https://www.instagram.com/impacta_multimarcas/',
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
