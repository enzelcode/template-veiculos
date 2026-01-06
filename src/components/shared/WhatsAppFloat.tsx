'use client';

import { memo } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG } from '@/constants/site';

interface WhatsAppFloatProps {
  message?: string;
}

function WhatsAppFloatComponent({
  message = 'Olá! Gostaria de mais informações sobre os veículos.',
}: WhatsAppFloatProps) {
  const url = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export const WhatsAppFloat = memo(WhatsAppFloatComponent);
