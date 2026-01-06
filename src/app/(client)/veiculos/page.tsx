'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { VehicleCard, VehicleFilters, FilterState } from '@/components/vehicles';
import { MOCK_VEHICLES } from '@/lib/mock/vehicles';

const initialFilters: FilterState = {
  search: '',
  brand: '',
  fuel: '',
  transmission: '',
  minPrice: '',
  maxPrice: '',
  sort: 'createdAt_desc',
};

export default function VehiclesPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setFilters((prev) => ({ ...prev, search: searchFromUrl }));
    }
  }, [searchParams]);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...MOCK_VEHICLES];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(search) ||
          v.brand.toLowerCase().includes(search) ||
          v.model.toLowerCase().includes(search)
      );
    }

    if (filters.brand && filters.brand !== 'all') {
      result = result.filter((v) => v.brand === filters.brand);
    }

    if (filters.fuel && filters.fuel !== 'all') {
      result = result.filter((v) => v.fuel === filters.fuel);
    }

    if (filters.transmission && filters.transmission !== 'all') {
      result = result.filter((v) => v.transmission === filters.transmission);
    }

    if (filters.minPrice) {
      result = result.filter((v) => v.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((v) => v.price <= Number(filters.maxPrice));
    }

    if (filters.sort) {
      const [field, order] = filters.sort.split('_');
      result.sort((a, b) => {
        let aVal: number;
        let bVal: number;

        switch (field) {
          case 'price':
            aVal = a.price;
            bVal = b.price;
            break;
          case 'year':
            aVal = a.year;
            bVal = b.year;
            break;
          case 'mileage':
            aVal = a.mileage;
            bVal = b.mileage;
            break;
          default:
            return 0;
        }

        return order === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [filters]);

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Nossos Veículos</h1>
        <p className="text-muted-foreground">
          Encontre o veículo ideal para você
        </p>
      </div>

      <VehicleFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalResults={filteredVehicles.length}
      />

      <div className="mt-8">
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum veículo encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
