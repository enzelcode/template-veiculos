import { memo } from 'react';
import { WhatsAppButton } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

function ContactCTAComponent() {
  return (
    <section className="bg-zinc-900 py-16">
      <div className="container-custom text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Entre em contato conosco
        </h2>
        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
          Estamos à disposição para ajudá-lo a encontrar o veículo ideal.
          Fale com nossa equipe e tire todas as suas dúvidas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppButton size="lg" />
          <span className="text-zinc-500">ou ligue {SITE_CONFIG.phone}</span>
        </div>
      </div>
    </section>
  );
}

export const ContactCTA = memo(ContactCTAComponent);
