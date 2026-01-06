import Link from 'next/link';
import { Hero, ContactCTA } from '@/components/home';
import { VehicleCard } from '@/components/vehicles';
import { Button } from '@/components/ui/button';
import { getFeaturedVehicles } from '@/lib/mock/vehicles';

export default function HomePage() {
  const featuredVehicles = getFeaturedVehicles();

  return (
    <>
      <Hero />

      <section className="container-custom py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Veículos em Destaque</h2>
          <Button asChild variant="outline">
            <Link href="/veiculos">Ver todos</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
