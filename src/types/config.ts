/**
 * Interface de configuração do site (banco de dados)
 */
export interface SiteConfigDB {
  _id: string;

  // Identidade
  name: string;
  slogan: string;
  logo: string;
  favicon: string;

  // Contato
  phone: string;
  whatsapp: string;
  email: string;
  address: string;

  // Redes sociais
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };

  // Visual
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };

  // Página Quem Somos
  about: {
    title: string;
    content: string;
    image: string;
  };

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Horário
  businessHours: string;

  updatedAt: string;
}

/**
 * Input para atualizar configurações
 */
export type SiteConfigInput = Partial<Omit<SiteConfigDB, '_id' | 'updatedAt'>>;
