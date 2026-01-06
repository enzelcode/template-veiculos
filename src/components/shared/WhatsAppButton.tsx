'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG } from '@/constants/site';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

function WhatsAppButtonComponent({
  phone,
  message,
  size = 'default',
  className = '',
  children = 'Fale Conosco',
}: WhatsAppButtonProps) {
  const phoneNumber = phone || SITE_CONFIG.whatsapp;
  const baseUrl = `https://wa.me/${phoneNumber}`;
  const url = message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;

  return (
    <Button
      size={size}
      className={`bg-[#25D366] hover:bg-[#1da851] text-white ${className}`}
      asChild
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <WhatsAppIcon className="!h-5 !w-5" />
        <span>{children}</span>
      </a>
    </Button>
  );
}

export const WhatsAppButton = memo(WhatsAppButtonComponent);
