# Template Veículos - Especificação Técnica

## Visão Geral

Template Next.js para lojas de veículos, otimizado para performance e fácil customização.
A branch `main` serve como template base, e cada cliente terá sua própria branch (ex: `tony-veiculos`).

---

## Stack Tecnológico

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 14.x | Framework fullstack (App Router) |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | 3.x | Estilização |
| shadcn/ui | latest | Componentes base |
| MongoDB | 6.x | Banco de dados |
| Mongoose | 8.x | ODM para MongoDB |
| Zod | 3.x | Validação de schemas |
| Lucide React | latest | Ícones |
| Sharp | latest | Otimização de imagens |

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── (client)/                 # Grupo de rotas do cliente
│   │   ├── page.tsx              # Home
│   │   ├── veiculos/
│   │   │   ├── page.tsx          # Listagem/Busca
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Detalhe do veículo
│   │   ├── quem-somos/
│   │   │   └── page.tsx
│   │   └── contato/
│   │       └── page.tsx
│   ├── admin/                    # Painel administrativo
│   │   ├── layout.tsx            # Layout com sidebar
│   │   ├── page.tsx              # Dashboard
│   │   ├── veiculos/
│   │   │   ├── page.tsx          # Listar veículos
│   │   │   ├── novo/
│   │   │   │   └── page.tsx      # Criar veículo
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Editar veículo
│   │   └── configuracoes/
│   │       └── page.tsx          # Config do site
│   ├── api/
│   │   ├── veiculos/
│   │   │   ├── route.ts          # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE
│   │   ├── upload/
│   │   │   └── route.ts          # Upload de imagens
│   │   └── config/
│   │       └── route.ts          # Configurações do site
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Estilos globais + CSS vars
│
├── components/
│   ├── ui/                       # Componentes shadcn
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── AdminSidebar.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FeaturedVehicles.tsx
│   │   └── WhyChooseUs.tsx
│   ├── vehicles/
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleGrid.tsx
│   │   ├── VehicleFilters.tsx
│   │   ├── VehicleGallery.tsx
│   │   └── VehicleDetails.tsx
│   ├── forms/
│   │   ├── VehicleForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── SearchForm.tsx
│   └── shared/
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       ├── Pagination.tsx
│       └── WhatsAppButton.tsx
│
├── lib/
│   ├── db/
│   │   ├── connection.ts         # Conexão MongoDB
│   │   └── models/
│   │       ├── Vehicle.ts
│   │       └── SiteConfig.ts
│   ├── api/
│   │   ├── vehicles.ts           # Funções de fetch client-side
│   │   └── config.ts
│   ├── utils/
│   │   ├── formatters.ts         # Formatação de preço, km, etc
│   │   ├── validators.ts         # Validações com Zod
│   │   └── helpers.ts            # Funções auxiliares
│   └── hooks/
│       ├── useVehicles.ts
│       ├── useDebounce.ts
│       └── useMediaQuery.ts
│
├── types/
│   ├── vehicle.ts
│   ├── config.ts
│   └── api.ts
│
├── constants/
│   ├── theme.ts                  # Cores, fontes (customizável)
│   ├── site.ts                   # Nome, contato, redes sociais
│   ├── vehicles.ts               # Marcas, categorias, combustíveis
│   └── seo.ts                    # Meta tags padrão
│
└── styles/
    └── themes/                   # Temas por cliente (opcional)
```

---

## Banco de Dados - Schemas

### Vehicle

```typescript
interface Vehicle {
  _id: ObjectId;

  // Identificação
  slug: string;                   // URL amigável (único)
  title: string;                  // Ex: "Honda Civic EXL 2.0"

  // Informações básicas
  brand: string;                  // Marca
  model: string;                  // Modelo
  version: string;                // Versão
  year: number;                   // Ano fabricação
  yearModel: number;              // Ano modelo

  // Detalhes
  price: number;
  mileage: number;                // Quilometragem
  color: string;
  fuel: 'flex' | 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic' | 'cvt' | 'automated';
  doors: number;
  bodyType: string;               // Sedan, SUV, Hatch, etc

  // Mídia
  images: string[];               // URLs das imagens
  featuredImage: string;          // Imagem principal

  // Extras
  features: string[];             // Ar, direção, etc
  description: string;            // Descrição livre

  // Controle
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;              // Destaque na home
  views: number;                  // Contador de visualizações

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

### SiteConfig

```typescript
interface SiteConfig {
  _id: ObjectId;

  // Identidade
  name: string;                   // Nome da loja
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
  };

  // Visual
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Horário
  businessHours: string;

  updatedAt: Date;
}
```

---

## API Endpoints

### Veículos

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/veiculos` | Listar veículos (com filtros) | Não |
| GET | `/api/veiculos/:id` | Detalhe do veículo | Não |
| POST | `/api/veiculos` | Criar veículo | Sim |
| PUT | `/api/veiculos/:id` | Atualizar veículo | Sim |
| DELETE | `/api/veiculos/:id` | Remover veículo | Sim |

**Query params para listagem:**
- `page` - Página atual
- `limit` - Itens por página
- `brand` - Filtrar por marca
- `minPrice` / `maxPrice` - Faixa de preço
- `minYear` / `maxYear` - Faixa de ano
- `fuel` - Tipo combustível
- `transmission` - Câmbio
- `status` - Status do veículo
- `featured` - Apenas destaques
- `search` - Busca textual
- `sort` - Ordenação (price_asc, price_desc, year_desc, etc)

### Upload

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/upload` | Upload de imagem | Sim |
| DELETE | `/api/upload/:filename` | Remover imagem | Sim |

### Configurações

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/config` | Obter configurações | Não |
| PUT | `/api/config` | Atualizar configurações | Sim |

---

## Páginas e Componentes

### Cliente

#### Home (`/`)
- **Hero**: Banner principal com título, subtítulo, CTA
- **SearchBar**: Busca rápida (marca, modelo, preço)
- **FeaturedVehicles**: Grid de veículos em destaque
- **WhyChooseUs**: Diferenciais da loja (opcional)
- **Footer**: Contato, redes, links

#### Veículos (`/veiculos`)
- **SearchForm**: Filtros avançados (sidebar ou modal mobile)
- **VehicleGrid**: Grid responsivo de cards
- **VehicleCard**: Imagem, título, preço, detalhes básicos
- **Pagination**: Navegação entre páginas
- **EmptyState**: Quando não há resultados

#### Detalhe (`/veiculos/[slug]`)
- **VehicleGallery**: Galeria de imagens com lightbox
- **VehicleDetails**: Todas as informações
- **WhatsAppButton**: CTA flutuante para contato
- **RelatedVehicles**: Veículos similares

#### Quem Somos (`/quem-somos`)
- Texto institucional
- Fotos da loja
- Missão, visão, valores

#### Contato (`/contato`)
- **ContactForm**: Formulário de contato
- Mapa (Google Maps embed)
- Informações de contato

### Admin

#### Dashboard (`/admin`)
- Total de veículos
- Veículos disponíveis / vendidos
- Visualizações do mês
- Últimos cadastros

#### Gerenciar Veículos (`/admin/veiculos`)
- Tabela com todos os veículos
- Ações: editar, excluir, marcar como vendido
- Filtros e busca

#### Novo/Editar Veículo (`/admin/veiculos/novo` | `/admin/veiculos/[id]`)
- **VehicleForm**: Formulário completo
- Upload múltiplo de imagens
- Preview em tempo real
- Validação com Zod

#### Configurações (`/admin/configuracoes`)
- Editar dados da loja
- Upload de logo
- Configurar hero
- SEO

---

## Variáveis de Tema (CSS Variables)

```css
:root {
  /* Cores principais - CUSTOMIZAR POR CLIENTE */
  --color-primary: 220 90% 56%;        /* Azul */
  --color-primary-dark: 220 90% 46%;
  --color-secondary: 142 76% 36%;       /* Verde */

  /* Neutros */
  --color-background: 0 0% 100%;
  --color-foreground: 222 47% 11%;
  --color-muted: 210 40% 96%;
  --color-muted-foreground: 215 16% 47%;

  /* Cards */
  --color-card: 0 0% 100%;
  --color-card-foreground: 222 47% 11%;

  /* Bordas */
  --color-border: 214 32% 91%;

  /* Estados */
  --color-success: 142 76% 36%;
  --color-warning: 38 92% 50%;
  --color-error: 0 84% 60%;

  /* Radius */
  --radius: 0.5rem;

  /* Fontes */
  --font-sans: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;
}
```

---

## Constantes do Site (`constants/site.ts`)

```typescript
// Editar por branch/cliente
export const SITE_CONFIG = {
  name: 'Template Veículos',
  slogan: 'Os melhores veículos você encontra aqui',
  phone: '(11) 99999-9999',
  whatsapp: '5511999999999',
  email: 'contato@template.com',
  address: 'Rua Exemplo, 123 - São Paulo/SP',
  social: {
    instagram: 'https://instagram.com/template',
    facebook: 'https://facebook.com/template',
  },
} as const;
```

---

## Otimizações de Performance

### Imagens
- [ ] Next/Image com lazy loading
- [ ] Blur placeholder para carregamento
- [ ] Formatos modernos (WebP)
- [ ] Tamanhos responsivos

### Componentes
- [ ] React.memo em cards e listas
- [ ] useMemo/useCallback onde necessário
- [ ] Suspense boundaries
- [ ] Loading states

### Dados
- [ ] SWR ou React Query para cache
- [ ] Revalidação incremental (ISR)
- [ ] Paginação server-side

### Bundle
- [ ] Dynamic imports para componentes pesados
- [ ] Tree shaking
- [ ] Análise de bundle size

---

## SEO

- [ ] Meta tags dinâmicas por página
- [ ] Open Graph tags
- [ ] Schema.org para veículos (JSON-LD)
- [ ] Sitemap.xml automático
- [ ] Robots.txt
- [ ] Canonical URLs

---

## Autenticação Admin

Para simplicidade do template, usaremos autenticação básica:
- Middleware de verificação
- Credenciais em variáveis de ambiente
- Session com cookies httpOnly

**Variáveis de ambiente:**
```env
MONGODB_URI=mongodb://...
ADMIN_USER=admin
ADMIN_PASSWORD=senha_segura
JWT_SECRET=secret_key
NEXT_PUBLIC_SITE_URL=https://...
```

---

## Checklist de Implementação

### Fase 1: Setup Inicial
- [ ] Criar projeto Next.js 14
- [ ] Configurar Tailwind CSS
- [ ] Instalar e configurar shadcn/ui
- [ ] Estrutura de pastas
- [ ] Variáveis de ambiente
- [ ] CSS Variables de tema

### Fase 2: Database
- [ ] Conexão MongoDB
- [ ] Model Vehicle
- [ ] Model SiteConfig
- [ ] Types compartilhados
- [ ] Validações Zod

### Fase 3: API Routes
- [ ] CRUD Veículos
- [ ] Upload de imagens
- [ ] Configurações do site
- [ ] Middleware de auth

### Fase 4: Layout Base
- [ ] Root Layout
- [ ] Header responsivo
- [ ] Footer
- [ ] Mobile menu
- [ ] WhatsApp flutuante

### Fase 5: Páginas Cliente
- [ ] Home com Hero
- [ ] Listagem de veículos
- [ ] Detalhe do veículo
- [ ] Quem Somos
- [ ] Contato

### Fase 6: Painel Admin
- [ ] Layout admin com sidebar
- [ ] Dashboard
- [ ] CRUD veículos (interface)
- [ ] Configurações

### Fase 7: Otimizações
- [ ] SEO completo
- [ ] Performance audit
- [ ] Testes básicos
- [ ] Documentação de uso

---

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Lint
npm run lint
```

---

## Como Customizar (Por Branch)

1. Criar branch do cliente: `git checkout -b nome-cliente`
2. Editar `constants/site.ts` com dados do cliente
3. Ajustar CSS Variables em `globals.css`
4. Trocar logo e favicon em `public/`
5. Ajustar textos específicos
6. Deploy na Vercel com variáveis de ambiente do cliente

---

*Documento gerado em: Janeiro 2025*
*Versão: 1.0*
