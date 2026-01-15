'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  DoorOpen,
  Car,
  Check,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsAppButton, FinancingForm } from '@/components/shared';
import { formatCurrency, formatMileage } from '@/lib/utils/formatters';
import { FUEL_TYPES, TRANSMISSION_TYPES, BODY_TYPES } from '@/constants/vehicles';
import { SITE_CONFIG } from '@/constants/site';

interface VehicleDetailProps {
  vehicle: {
    _id: string;
    title: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    yearModel: number;
    price: number;
    mileage: number;
    fuel: string;
    transmission: string;
    color: string;
    doors: number;
    bodyType: string;
    featuredImage: string;
    images: string[];
    features: string[];
    description: string;
    slug: string;
  };
}

export function VehicleDetail({ vehicle }: VehicleDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % vehicle.images.length);
  }, [vehicle.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  }, [vehicle.images.length]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `Confira este ${vehicle.title} - ${formatCurrency(vehicle.price)}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: vehicle.title, text, url });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copiado!');
    }
  }, [vehicle.title, vehicle.price]);

  const fuelLabel = FUEL_TYPES.find((f) => f.value === vehicle.fuel)?.label || vehicle.fuel;
  const transmissionLabel =
    TRANSMISSION_TYPES.find((t) => t.value === vehicle.transmission)?.label || vehicle.transmission;
  const bodyTypeLabel = BODY_TYPES.find((b) => b.value === vehicle.bodyType)?.label || vehicle.bodyType;

  const whatsappMessage = `Olá! Vi o ${vehicle.title} no site e gostaria de mais informações.`;

  const specs = [
    { icon: Calendar, label: 'Ano', value: `${vehicle.year}/${vehicle.yearModel}` },
    { icon: Gauge, label: 'Km', value: formatMileage(vehicle.mileage) },
    { icon: Fuel, label: 'Combustível', value: fuelLabel },
    { icon: Settings2, label: 'Câmbio', value: transmissionLabel },
    { icon: Palette, label: 'Cor', value: vehicle.color },
    { icon: DoorOpen, label: 'Portas', value: vehicle.doors.toString() },
    { icon: Car, label: 'Carroceria', value: bodyTypeLabel },
  ];

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link
          href="/veiculos"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para veículos
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100">
            {vehicle.images.length > 0 ? (
              <button
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full cursor-zoom-in"
              >
                <Image
                  src={vehicle.images[currentImage]}
                  alt={`${vehicle.title} - Imagem ${currentImage + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </button>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Sem imagem
              </div>
            )}

            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {vehicle.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {vehicle.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImage ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {vehicle.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {vehicle.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    index === currentImage ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${vehicle.title} - Miniatura ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {vehicle.brand}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold">{vehicle.title}</h1>
                <p className="text-muted-foreground mt-1">{vehicle.version}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-3xl md:text-4xl font-bold text-primary mt-4">
              {formatCurrency(vehicle.price)}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <WhatsAppButton
              phone={SITE_CONFIG.whatsapp}
              message={whatsappMessage}
              className="flex-1"
            />
            <Button variant="outline" className="flex-1" asChild>
              <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`}>
                Ligar agora
              </a>
            </Button>
          </div>

          {vehicle.description && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-3">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          {vehicle.features.length > 0 && (
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Opcionais</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImage}
        slides={vehicle.images.map((src) => ({ src }))}
        on={{ view: ({ index }) => setCurrentImage(index) }}
      />

      {/* Formulário de Financiamento */}
      <section className="mt-16 py-16 -mx-4 px-4 md:mx-0 md:px-8 bg-zinc-900 md:rounded-2xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              <span className="text-white">SIMULAR</span>{' '}
              <span className="text-primary">FINANCIAMENTO</span>
            </h2>
            <p className="text-zinc-400">
              Pré-análise rápida e sem compromisso. Realize seu sonho hoje.
            </p>
          </div>
          <FinancingForm vehicle={{ name: `${vehicle.title} ${vehicle.year}/${vehicle.yearModel}`, id: vehicle._id }} />
        </div>
      </section>
    </div>
  );
}
