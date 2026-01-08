import Link from 'next/link';
import { Hero, ContactCTA } from '@/components/home';
import { VehicleCard } from '@/components/vehicles';
import { AnimateOnScroll } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { getFeaturedVehicles as getMockFeaturedVehicles } from '@/lib/mock/vehicles';

async function getFeaturedVehicles() {
  // Durante o build/SSG, usa dados mockados
  // Em runtime com MongoDB configurado, pode conectar ao banco
  return getMockFeaturedVehicles();
}

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles();

  return (
    <>
      <Hero />

      <section className="container-custom py-16">
        <AnimateOnScroll animation="fadeUp">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Veículos em Destaque</h2>
            <Button asChild variant="outline">
              <Link href="/veiculos">Ver todos</Link>
            </Button>
          </div>
        </AnimateOnScroll>

        {featuredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVehicles.map((vehicle, index) => (
              <AnimateOnScroll
                key={vehicle._id}
                animation="fadeUp"
                delay={index * 100}
              >
                <VehicleCard vehicle={vehicle} />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum veículo cadastrado ainda.</p>
          </div>
        )}
      </section>

      <AnimateOnScroll animation="fadeUp">
        <ContactCTA />
      </AnimateOnScroll>
    </>
  );
}
