/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que variam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'StyleCars',
  slogan: 'Venda seu carro com segurança e zero dor de cabeça',
  description: 'Consignação de veículos com divulgação profissional, filtragem de interessados reais e negociação completa. Você só apresenta o carro quando houver interesse.',

  // Contato
  phone: '(00) 99999-9999',
  whatsapp: '5500999999999',
  whatsapp2: '',
  email: '',

  // Endereço
  address: {
    street: 'Endereço aqui',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    full: 'Endereço aqui',
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
    instagram: 'https://www.instagram.com/stylecars__/',
    facebook: '',
    youtube: '',
    tiktok: '',
  },

  // Links de navegação
  navigation: {
    main: [
      { label: 'Início', href: '/' },
      { label: 'Veículos', href: '/veiculos' },
      { label: 'Venda seu Veículo', href: '/venda-seu-veiculo' },
      { label: 'Quem Somos', href: '/quem-somos' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
