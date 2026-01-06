/**
 * Configurações do site - CUSTOMIZAR POR CLIENTE
 * Este arquivo contém todas as informações que mudam entre clientes
 */

export const SITE_CONFIG = {
  // Identidade
  name: 'Template Veículos',
  slogan: 'Os melhores veículos você encontra aqui',
  description: 'Loja de veículos novos e seminovos com os melhores preços e condições de pagamento.',

  // Contato
  phone: '(11) 99999-9999',
  whatsapp: '5511999999999',
  email: 'contato@templateveiculos.com.br',

  // Endereço
  address: {
    street: 'Rua Exemplo',
    number: '123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    full: 'Rua Exemplo, 123 - Centro, São Paulo/SP',
  },

  // Horário de funcionamento
  businessHours: {
    weekdays: '08:00 às 18:00',
    saturday: '08:00 às 13:00',
    sunday: 'Fechado',
    formatted: 'Seg-Sex: 08h-18h | Sáb: 08h-13h',
  },

  // Redes sociais
  social: {
    instagram: 'https://instagram.com/templateveiculos',
    facebook: 'https://facebook.com/templateveiculos',
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
      { label: 'Termos de Uso', href: '/termos' },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
