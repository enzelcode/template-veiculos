import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/shared';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

function HeroComponent({
  title = `Nosso propósito é a realização do seu sonho`,
  subtitle = `Referência em veículos de qualidade e atendimento personalizado.`,
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center">
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/75" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
      )}

      <div className="container-custom relative z-10 flex justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
