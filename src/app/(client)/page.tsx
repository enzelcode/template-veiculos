import Link from 'next/link';
import { Hero, ContactCTA } from '@/components/home';
import { VehicleCard } from '@/components/vehicles';
import { AnimateOnScroll } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { connectDB } from '@/lib/db/mongodb';
import Vehicle from '@/lib/db/models/Vehicle';
import { getFeaturedVehicles as getMockFeaturedVehicles } from '@/lib/mock/vehicles';

// Flag para usar dados mockados (mudar para false quando conectar ao banco real)
const USE_MOCK_DATA = true;

async function getFeaturedVehicles() {
  // Usar dados mockados
  if (USE_MOCK_DATA) {
    return getMockFeaturedVehicles();
  }

  // Usar banco de dados real
  await connectDB();
  const vehicles = await Vehicle.find({
    status: 'available',
    featured: true,
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  // Se não houver veículos em destaque, pega os mais recentes
  if (vehicles.length === 0) {
    const recentVehicles = await Vehicle.find({ status: 'available' })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    return recentVehicles.map((v) => ({
      _id: v._id.toString(),
      title: `${v.brand} ${v.model}`,
      brand: v.brand,
      model: v.model,
      version: v.version,
      year: v.year,
      yearModel: v.yearModel,
      price: v.price,
      mileage: v.mileage,
      fuel: v.fuel,
      transmission: v.transmission,
      color: v.color,
      featuredImage: v.featuredImage,
      images: v.images,
      slug: v.slug,
      status: v.status,
      featured: v.featured,
    }));
  }

  return vehicles.map((v) => ({
    _id: v._id.toString(),
    title: `${v.brand} ${v.model}`,
    brand: v.brand,
    model: v.model,
    version: v.version,
    year: v.year,
    yearModel: v.yearModel,
    price: v.price,
    mileage: v.mileage,
    fuel: v.fuel,
    transmission: v.transmission,
    color: v.color,
    featuredImage: v.featuredImage,
    images: v.images,
    slug: v.slug,
    status: v.status,
    featured: v.featured,
  }));
}

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles();

  return (
    <>
      <Hero backgroundImage="/hero.png" />

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
