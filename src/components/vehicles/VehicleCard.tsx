'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Gauge, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatMileage, formatYearModel } from '@/lib/utils/formatters';
import { FUEL_TYPES, TRANSMISSION_TYPES } from '@/constants/vehicles';
import type { VehicleCard as VehicleCardType } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: VehicleCardType;
}

function VehicleCardComponent({ vehicle }: VehicleCardProps) {
  const fuelLabel = FUEL_TYPES.find((f) => f.value === vehicle.fuel)?.label || vehicle.fuel;
  const transmissionLabel = TRANSMISSION_TYPES.find((t) => t.value === vehicle.transmission)?.label || vehicle.transmission;

  return (
    <Link href={`/veiculos/${vehicle.slug}`}>
      <Card className="overflow-hidden hover-lift group border-0 shadow-md hover:shadow-2xl bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          {vehicle.featuredImage ? (
            <Image
              src={vehicle.featuredImage}
              alt={vehicle.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center">
              <span className="text-zinc-400">Sem imagem</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {vehicle.featured && (
            <Badge className="absolute top-3 left-3 bg-primary shadow-lg">Destaque</Badge>
          )}

          {vehicle.status === 'sold' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-1">Vendido</Badge>
            </div>
          )}

          {vehicle.status === 'reserved' && (
            <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground">Reservado</Badge>
          )}

          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-white text-sm font-medium">Ver detalhes →</span>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {vehicle.title}
          </h3>

          <p className="text-2xl font-bold text-zinc-900 mb-4">
            {formatCurrency(vehicle.price)}
          </p>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-full text-xs">
              <Calendar className="h-3.5 w-3.5" />
              {formatYearModel(vehicle.year, vehicle.yearModel)}
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-full text-xs">
              <Gauge className="h-3.5 w-3.5" />
              {formatMileage(vehicle.mileage)}
            </span>
            <span className="flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-full text-xs">
              <Fuel className="h-3.5 w-3.5" />
              {fuelLabel}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            {transmissionLabel} • {vehicle.brand}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export const VehicleCard = memo(VehicleCardComponent);
