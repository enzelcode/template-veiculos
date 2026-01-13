/**
 * Configurações de SEO padrão
 */

import { SITE_CONFIG } from './site';

export const DEFAULT_SEO = {
  title: SITE_CONFIG.name,
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  keywords: [
    'veículos',
    'carros',
    'motors',
    'seminovos',
    'usados',
    'comprar carro',
    'loja de carros',
    SITE_CONFIG.address.city.toLowerCase(),
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
} as const;

export const PAGE_SEO = {
  home: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  vehicles: {
    title: 'Veículos',
    description: `Confira nosso estoque de veículos novos e seminovos. ${SITE_CONFIG.name} - ${SITE_CONFIG.slogan}`,
  },
  about: {
    title: 'Quem Somos',
    description: `Conheça a história e os valores da ${SITE_CONFIG.name}. Tradição e confiança na venda de veículos.`,
  },
  contact: {
    title: 'Contato',
    description: `Entre em contato com a ${SITE_CONFIG.name}. ${SITE_CONFIG.address.full} - ${SITE_CONFIG.phone}`,
  },
} as const;
