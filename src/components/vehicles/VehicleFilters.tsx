'use client';

import { memo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { VEHICLE_BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, SORT_OPTIONS } from '@/constants/vehicles';

export interface FilterState {
  search: string;
  brand: string;
  fuel: string;
  transmission: string;
  minPrice: string;
  maxPrice: string;
  sort: string;
}

interface VehicleFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  totalResults: number;
}

function VehicleFiltersComponent({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
}: VehicleFiltersProps) {
  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value && key !== 'sort'
  );

  const FilterContent = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Marca</label>
        <Select
          value={filters.brand}
          onValueChange={(value) => onFilterChange('brand', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as marcas</SelectItem>
            {VEHICLE_BRANDS.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Combustível</label>
        <Select
          value={filters.fuel}
          onValueChange={(value) => onFilterChange('fuel', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {FUEL_TYPES.map((fuel) => (
              <SelectItem key={fuel.value} value={fuel.value}>
                {fuel.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Câmbio</label>
        <Select
          value={filters.transmission}
          onValueChange={(value) => onFilterChange('transmission', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {TRANSMISSION_TYPES.map((trans) => (
              <SelectItem key={trans.value} value={trans.value}>
                {trans.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Preço</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Mínimo"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Máximo"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters} className="w-full">
          Limpar filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por modelo, marca..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={filters.sort}
            onValueChange={(value) => onFilterChange('sort', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-48">
            <Select
              value={filters.brand}
              onValueChange={(value) => onFilterChange('brand', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as marcas</SelectItem>
                {VEHICLE_BRANDS.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-40">
            <Select
              value={filters.fuel}
              onValueChange={(value) => onFilterChange('fuel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Combustível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-40">
            <Select
              value={filters.transmission}
              onValueChange={(value) => onFilterChange('transmission', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Câmbio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {TRANSMISSION_TYPES.map((trans) => (
                  <SelectItem key={trans.value} value={trans.value}>
                    {trans.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Preço mín"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="w-32"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Preço máx"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="w-32"
            />
          </div>

          {hasActiveFilters && (
            <Button variant="ghost" onClick={onClearFilters} size="sm">
              Limpar
            </Button>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {totalResults} {totalResults === 1 ? 'veículo encontrado' : 'veículos encontrados'}
      </p>
    </div>
  );
}

export const VehicleFilters = memo(VehicleFiltersComponent);
