import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { connectDB } from '@/lib/db/mongodb';
import Vehicle from '@/lib/db/models/Vehicle';
import { VehicleDetail } from './VehicleDetail';
import { getVehicleBySlug } from '@/lib/mock/vehicles';

// Flag para usar dados mockados (mudar para false quando conectar ao banco real)
const USE_MOCK_DATA = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getVehicle(slug: string) {
  // Usar dados mockados
  if (USE_MOCK_DATA) {
    const mockVehicle = getVehicleBySlug(slug);
    if (!mockVehicle) return null;

    return {
      _id: mockVehicle._id,
      title: mockVehicle.title,
      brand: mockVehicle.brand,
      model: mockVehicle.model,
      version: mockVehicle.version,
      year: mockVehicle.year,
      yearModel: mockVehicle.yearModel,
      price: mockVehicle.price,
      mileage: mockVehicle.mileage,
      fuel: mockVehicle.fuel,
      transmission: mockVehicle.transmission,
      color: mockVehicle.color,
      doors: mockVehicle.doors,
      bodyType: mockVehicle.bodyType,
      featuredImage: mockVehicle.featuredImage,
      images: mockVehicle.images,
      features: mockVehicle.features,
      description: mockVehicle.description,
      slug: mockVehicle.slug,
    };
  }

  // Usar banco de dados real
  await connectDB();
  const vehicle = await Vehicle.findOne({ slug, status: 'available' }).lean();

  if (!vehicle) return null;

  return {
    _id: vehicle._id.toString(),
    title: `${vehicle.brand} ${vehicle.model}`,
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version,
    year: vehicle.year,
    yearModel: vehicle.yearModel,
    price: vehicle.price,
    mileage: vehicle.mileage,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission,
    color: vehicle.color,
    doors: vehicle.doors,
    bodyType: vehicle.bodyType,
    featuredImage: vehicle.featuredImage,
    images: vehicle.featuredImage
      ? [vehicle.featuredImage, ...vehicle.images]
      : vehicle.images,
    features: vehicle.features,
    description: vehicle.description,
    slug: vehicle.slug,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    return { title: 'Veículo não encontrado' };
  }

  return {
    title: `${vehicle.title} - ${vehicle.version}`,
    description: vehicle.description || `${vehicle.title} ${vehicle.year}/${vehicle.yearModel}`,
    openGraph: {
      images: vehicle.featuredImage ? [vehicle.featuredImage] : [],
    },
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  return <VehicleDetail vehicle={vehicle} />;
}
