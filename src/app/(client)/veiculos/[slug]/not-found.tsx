import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VehicleNotFound() {
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Veículo não encontrado</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        O veículo que você está procurando pode ter sido vendido ou não está mais disponível.
      </p>
      <Button asChild>
        <Link href="/veiculos">Ver todos os veículos</Link>
      </Button>
    </div>
  );
}
