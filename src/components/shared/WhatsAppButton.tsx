'use client';

import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG } from '@/constants/site';

interface WhatsAppButtonProps {
  message?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

function WhatsAppButtonComponent({
  message,
  variant = 'default',
  size = 'lg',
  className = '',
  children = 'Fale Conosco',
}: WhatsAppButtonProps) {
  const baseUrl = `https://wa.me/${SITE_CONFIG.whatsapp}`;
  const url = message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={`bg-[#25D366] hover:bg-[#1da851] text-white ${className}`}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="h-5 w-5 mr-2" />
        {children}
      </a>
    </Button>
  );
}

export const WhatsAppButton = memo(WhatsAppButtonComponent);
