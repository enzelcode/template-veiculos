'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils/formatters';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'minimal';
  defaultValue?: string;
}

interface Vehicle {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  featuredImage: string;
  slug: string;
}

function SearchBarComponent({
  placeholder = 'Buscar veículos...',
  className = '',
  variant = 'default',
  defaultValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!search.trim()) {
        setFilteredVehicles([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/vehicles?search=${encodeURIComponent(search.trim())}&limit=5&status=available`);
        const data = await response.json();
        setFilteredVehicles(data.vehicles || []);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        setFilteredVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchVehicles, 300);
    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (search.trim()) {
        setIsOpen(false);
        router.push(`/veiculos?search=${encodeURIComponent(search.trim())}`);
      }
    },
    [search, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [handleSubmit]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
  }, []);

  const handleResultClick = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = isOpen && search.trim() && filteredVehicles.length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 ${
            variant === 'minimal' ? 'h-4 w-4' : 'h-5 w-5'
          }`}
        />
        <Input
          type="text"
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => search.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className={`
            pl-10
            ${variant === 'default'
              ? 'h-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500'
              : 'h-9 bg-white border-zinc-200'
            }
          `}
        />
      </form>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-zinc-200 overflow-hidden z-50">
          {filteredVehicles.map((vehicle) => (
            <Link
              key={vehicle._id}
              href={`/veiculos/${vehicle.slug}`}
              onClick={handleResultClick}
              className="flex items-center gap-3 p-3 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0"
            >
              <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={vehicle.featuredImage}
                  alt={vehicle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">
                  {vehicle.title}
                </p>
                <p className="text-xs text-zinc-500">
                  {vehicle.year} • {vehicle.mileage.toLocaleString('pt-BR')} km
                </p>
              </div>
              <p className="text-sm font-semibold text-primary flex-shrink-0">
                {formatCurrency(vehicle.price)}
              </p>
            </Link>
          ))}
          <Link
            href={`/veiculos?search=${encodeURIComponent(search.trim())}`}
            onClick={handleResultClick}
            className="block p-3 text-center text-sm text-primary hover:bg-zinc-50 transition-colors font-medium"
          >
            Ver todos os resultados
          </Link>
        </div>
      )}

      {isOpen && search.trim() && filteredVehicles.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-zinc-200 p-4 z-50">
          <p className="text-sm text-zinc-500 text-center">
            Nenhum veículo encontrado
          </p>
        </div>
      )}
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
