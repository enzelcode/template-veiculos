'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { VehicleCard, VehicleFilters, FilterState } from '@/components/vehicles';
import type { VehicleCard as VehicleCardType } from '@/types/vehicle';

const initialFilters: FilterState = {
  search: '',
  brand: '',
  fuel: '',
  transmission: '',
  minPrice: '',
  maxPrice: '',
  sort: 'createdAt_desc',
};

function VehiclesContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [vehicles, setVehicles] = useState<VehicleCardType[]>([]);
  const [loading, setLoading] = useState(true);

  // Buscar veículos da API
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/api/vehicles?status=available');
        const data = await response.json();
        setVehicles(data.vehicles || []);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

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
    let result = [...vehicles];

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
  }, [filters, vehicles]);

  return (
    <div>
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzQ7cjD75GZv6UV_ojLLQSM5QcsirtWPKLmeugSDULGfLq0CGShlhtMAn7kClVH4ETU0BpzMR3OG1mllor5OW_VzvlxFcflr_q4H_gJIHvEKlpCuCFGpegAlEv1JLWs4Rfb128I=s1360-w1360-h1020-rw"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Veículos</h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Encontre o veículo ideal para você
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <VehicleFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalResults={filteredVehicles.length}
        />

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum veículo encontrado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div>
        <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
          <div className="container-custom relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos Veículos</h1>
            <p className="text-zinc-300 text-lg max-w-2xl">
              Encontre o veículo ideal para você
            </p>
          </div>
        </section>
        <div className="container-custom py-12">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    }>
      <VehiclesContent />
    </Suspense>
  );
}
