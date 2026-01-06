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
      <Card className="overflow-hidden card-hover group">
        <div className="relative aspect-[4/3] overflow-hidden">
          {vehicle.featuredImage ? (
            <Image
              src={vehicle.featuredImage}
              alt={vehicle.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-200 flex items-center justify-center">
              <span className="text-zinc-400">Sem imagem</span>
            </div>
          )}

          {vehicle.featured && (
            <Badge className="absolute top-2 left-2 bg-primary">Destaque</Badge>
          )}

          {vehicle.status === 'sold' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-1">Vendido</Badge>
            </div>
          )}

          {vehicle.status === 'reserved' && (
            <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">Reservado</Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {vehicle.title}
          </h3>

          <p className="text-2xl font-bold text-primary mb-3">
            {formatCurrency(vehicle.price)}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatYearModel(vehicle.year, vehicle.yearModel)}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              {formatMileage(vehicle.mileage)}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              {fuelLabel}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            {transmissionLabel} • {vehicle.brand}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export const VehicleCard = memo(VehicleCardComponent);
