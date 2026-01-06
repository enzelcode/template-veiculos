import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

function HeroComponent({
  title = `Encontre o veículo dos seus sonhos`,
  subtitle = SITE_CONFIG.slogan,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center">
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base">
              <Link href="/veiculos">Ver Estoque</Link>
            </Button>
            <WhatsAppButton size="lg" className="text-base" />
          </div>
        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
