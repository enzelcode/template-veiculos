/**
 * Constantes relacionadas a veículos
 * Marcas, categorias, tipos de combustível, etc.
 */

export const VEHICLE_BRANDS = [
  'Audi',
  'BMW',
  'Chevrolet',
  'Citroën',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Jeep',
  'Kia',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Peugeot',
  'Renault',
  'Toyota',
  'Volkswagen',
  'Volvo',
  'Outras',
] as const;

export const FUEL_TYPES = [
  { value: 'flex', label: 'Flex' },
  { value: 'gasoline', label: 'Gasolina' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Elétrico' },
  { value: 'hybrid', label: 'Híbrido' },
] as const;

export const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automático' },
  { value: 'cvt', label: 'CVT' },
  { value: 'automated', label: 'Automatizado' },
] as const;

export const BODY_TYPES = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'hatch', label: 'Hatch' },
  { value: 'suv', label: 'SUV' },
  { value: 'pickup', label: 'Picape' },
  { value: 'coupe', label: 'Cupê' },
  { value: 'wagon', label: 'Perua' },
  { value: 'van', label: 'Van' },
  { value: 'convertible', label: 'Conversível' },
] as const;

export const VEHICLE_STATUS = [
  { value: 'available', label: 'Disponível' },
  { value: 'sold', label: 'Vendido' },
  { value: 'reserved', label: 'Reservado' },
] as const;

export const VEHICLE_COLORS = [
  'Branco',
  'Prata',
  'Preto',
  'Cinza',
  'Vermelho',
  'Azul',
  'Verde',
  'Amarelo',
  'Laranja',
  'Marrom',
  'Bege',
  'Dourado',
  'Vinho',
  'Rosa',
  'Roxo',
] as const;

export const VEHICLE_FEATURES = [
  'Ar Condicionado',
  'Direção Hidráulica',
  'Direção Elétrica',
  'Vidros Elétricos',
  'Travas Elétricas',
  'Alarme',
  'Air Bag',
  'Air Bag Duplo',
  'ABS',
  'Sensor de Estacionamento',
  'Câmera de Ré',
  'Central Multimídia',
  'Bluetooth',
  'GPS',
  'Bancos de Couro',
  'Teto Solar',
  'Rodas de Liga Leve',
  'Faróis de LED',
  'Piloto Automático',
  'Controle de Tração',
  'Start/Stop',
  'Chave Presencial',
  'Retrovisores Elétricos',
  'Computador de Bordo',
  'Volante Multifuncional',
] as const;

export const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Mais recentes' },
  { value: 'createdAt_asc', label: 'Mais antigos' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'year_desc', label: 'Ano mais novo' },
  { value: 'year_asc', label: 'Ano mais antigo' },
  { value: 'mileage_asc', label: 'Menor KM' },
  { value: 'mileage_desc', label: 'Maior KM' },
] as const;

export const PRICE_RANGES = [
  { min: 0, max: 30000, label: 'Até R$ 30.000' },
  { min: 30000, max: 50000, label: 'R$ 30.000 - R$ 50.000' },
  { min: 50000, max: 80000, label: 'R$ 50.000 - R$ 80.000' },
  { min: 80000, max: 120000, label: 'R$ 80.000 - R$ 120.000' },
  { min: 120000, max: 200000, label: 'R$ 120.000 - R$ 200.000' },
  { min: 200000, max: Infinity, label: 'Acima de R$ 200.000' },
] as const;

export const YEAR_RANGE = {
  min: 2000,
  max: new Date().getFullYear() + 1,
} as const;

// Types derivados das constantes
export type VehicleBrand = (typeof VEHICLE_BRANDS)[number];
export type FuelType = (typeof FUEL_TYPES)[number]['value'];
export type TransmissionType = (typeof TRANSMISSION_TYPES)[number]['value'];
export type BodyType = (typeof BODY_TYPES)[number]['value'];
export type VehicleStatus = (typeof VEHICLE_STATUS)[number]['value'];
export type VehicleColor = (typeof VEHICLE_COLORS)[number];
export type VehicleFeature = (typeof VEHICLE_FEATURES)[number];
export type SortOption = (typeof SORT_OPTIONS)[number]['value'];
