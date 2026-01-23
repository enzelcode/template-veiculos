import { memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/shared';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundImageMobile?: string;
  showText?: boolean;
}

function HeroComponent({
  title = `Nosso propósito é a realização do seu sonho`,
  subtitle = `Referência em veículos de qualidade e atendimento personalizado.`,
  backgroundImage,
  backgroundImageMobile,
  showText = true,
}: HeroProps) {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center">
      {backgroundImage ? (
        <>
          {/* Mobile background */}
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url(${backgroundImageMobile || backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          {/* Desktop background */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden md:block"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
      )}

      <div className="container-custom relative z-10 flex justify-center">
        <div className="max-w-2xl text-center">
          {showText && (
            <>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-8">
                {subtitle}
              </p>
            </>
          )}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${!showText ? 'mt-auto pt-[350px] lg:pt-[450px]' : ''}`}>
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
