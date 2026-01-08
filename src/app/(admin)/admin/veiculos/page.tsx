import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search } from 'lucide-react';
import { AdminHeader } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import connectDB from '@/lib/db/mongodb';
import { Vehicle } from '@/lib/db/models';
import { formatCurrency } from '@/lib/utils/formatters';
import { VehicleActions } from './VehicleActions';

async function getVehicles() {
  await connectDB();

  const vehicles = await Vehicle.find({})
    .sort({ createdAt: -1 })
    .lean();

  return vehicles.map((v) => ({
    ...v,
    _id: v._id.toString(),
  }));
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  available: { label: 'Disponível', variant: 'default' },
  reserved: { label: 'Reservado', variant: 'secondary' },
  sold: { label: 'Vendido', variant: 'destructive' },
};

export default async function VeiculosAdminPage() {
  const vehicles = await getVehicles();

  return (
    <>
      <AdminHeader
        title="Veículos"
        description={`${vehicles.length} veículos cadastrados`}
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar veículos..." className="pl-10" />
          </div>
          <Button asChild>
            <Link href="/admin/veiculos/novo">
              <Plus className="mr-2 h-4 w-4" />
              Novo Veículo
            </Link>
          </Button>
        </div>

        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum veículo cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                vehicles.map((vehicle) => {
                  const status = statusLabels[vehicle.status] || statusLabels.available;

                  return (
                    <TableRow key={vehicle._id}>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100">
                          {vehicle.featuredImage ? (
                            <Image
                              src={vehicle.featuredImage}
                              alt={vehicle.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
                              N/A
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{vehicle.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.brand} • {vehicle.year}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(vehicle.price)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                        {vehicle.featured && (
                          <Badge variant="outline" className="ml-2">
                            Destaque
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <VehicleActions vehicleId={vehicle._id} slug={vehicle.slug} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
