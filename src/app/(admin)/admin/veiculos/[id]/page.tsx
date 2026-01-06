import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin';
import { VehicleForm } from '../VehicleForm';
import connectDB from '@/lib/db/mongodb';
import { Vehicle } from '@/lib/db/models';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getVehicle(id: string) {
  await connectDB();

  const vehicle = await Vehicle.findById(id).lean();

  if (!vehicle) return null;

  return {
    ...vehicle,
    _id: vehicle._id.toString(),
    createdAt: vehicle.createdAt.toISOString(),
    updatedAt: vehicle.updatedAt.toISOString(),
  };
}

export default async function EditarVeiculoPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <>
      <AdminHeader
        title="Editar Veículo"
        description={vehicle.title}
      />
      <div className="p-6">
        <VehicleForm initialData={vehicle} />
      </div>
    </>
  );
}
