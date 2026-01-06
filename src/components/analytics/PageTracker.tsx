'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PageTrackerProps {
  vehicleId?: string;
}

export function PageTracker({ vehicleId }: PageTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Não rastreia páginas do admin
    if (pathname.startsWith('/admin')) return;

    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: pathname, vehicleId }),
        });
      } catch {
        // Silenciosamente ignora erros de tracking
      }
    };

    trackPageView();
  }, [pathname, vehicleId]);

  return null;
}
