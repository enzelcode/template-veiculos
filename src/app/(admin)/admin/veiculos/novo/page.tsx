import { AdminHeader } from '@/components/admin';
import { VehicleForm } from '../VehicleForm';

export default function NovoVeiculoPage() {
  return (
    <>
      <AdminHeader title="Novo Veículo" description="Cadastrar novo veículo" />
      <div className="p-6">
        <VehicleForm />
      </div>
    </>
  );
}
