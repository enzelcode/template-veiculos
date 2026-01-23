import Link from 'next/link';
import { Hero, ContactCTA } from '@/components/home';
import { VehicleCard } from '@/components/vehicles';
import { AnimateOnScroll } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Megaphone, UserCheck, Handshake, Car } from 'lucide-react';
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
      <Hero
        title="Venda seu carro com segurança e zero dor de cabeça"
        subtitle="Na StyleCars, você vende seu carro em consignação, sem precisar deixar o veículo conosco."
        backgroundImage="/herost.webp"
      />

      {/* Como Funciona */}
      <section className="bg-zinc-50 py-16">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mais segurança, mais conforto e zero dor de cabeça para vender seu veículo.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimateOnScroll animation="fadeUp" delay={0}>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Divulgação Profissional</h3>
                <p className="text-sm text-muted-foreground">
                  Fazemos toda a divulgação do seu veículo nas principais plataformas e redes sociais.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={100}>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Filtramos Interessados</h3>
                <p className="text-sm text-muted-foreground">
                  Só passamos contatos de compradores realmente interessados e qualificados.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={200}>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Cuidamos da Negociação</h3>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe cuida de toda a negociação para você conseguir o melhor valor.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={300}>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Você Fica com o Carro</h3>
                <p className="text-sm text-muted-foreground">
                  Seu veículo fica com você até o momento da venda. Sem precisar deixar conosco.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll animation="fadeUp" delay={400}>
            <div className="text-center mt-10">
              <Button asChild size="lg">
                <Link href="/venda-seu-veiculo">Quero Vender Meu Carro</Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

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
