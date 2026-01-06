import type {
  FuelType,
  TransmissionType,
  BodyType,
  VehicleStatus,
} from '@/constants/vehicles';

/**
 * Interface principal do Veículo
 */
export interface Vehicle {
  _id: string;

  // Identificação
  slug: string;
  title: string;

  // Informações básicas
  brand: string;
  model: string;
  version: string;
  year: number;
  yearModel: number;

  // Detalhes
  price: number;
  mileage: number;
  color: string;
  fuel: FuelType;
  transmission: TransmissionType;
  doors: number;
  bodyType: BodyType;

  // Mídia
  images: string[];
  featuredImage: string;

  // Extras
  features: string[];
  description: string;

  // Controle
  status: VehicleStatus;
  featured: boolean;
  views: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

/**
 * Input para criar veículo (sem campos automáticos)
 */
export type VehicleInput = Omit<
  Vehicle,
  '_id' | 'slug' | 'views' | 'createdAt' | 'updatedAt'
>;

/**
 * Input para atualizar veículo (todos opcionais)
 */
export type VehicleUpdateInput = Partial<VehicleInput>;

/**
 * Veículo para exibição em cards (dados mínimos)
 */
export type VehicleCard = Pick<
  Vehicle,
  | '_id'
  | 'slug'
  | 'title'
  | 'brand'
  | 'model'
  | 'year'
  | 'yearModel'
  | 'price'
  | 'mileage'
  | 'fuel'
  | 'transmission'
  | 'featuredImage'
  | 'status'
  | 'featured'
>;

/**
 * Filtros para busca de veículos
 */
export interface VehicleFilters {
  search?: string;
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuel?: FuelType;
  transmission?: TransmissionType;
  bodyType?: BodyType;
  status?: VehicleStatus;
  featured?: boolean;
  color?: string;
}

/**
 * Parâmetros de paginação
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
}

/**
 * Resposta paginada de veículos
 */
export interface VehicleListResponse {
  vehicles: VehicleCard[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
