'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/constants/site';

function MobileMenuComponent() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-zinc-800"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[280px] bg-zinc-900 border-zinc-800 p-0"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <span className="text-lg font-bold text-white">
              {SITE_CONFIG.name}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {SITE_CONFIG.navigation.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleClose}
                    className="block py-3 px-4 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <div className="text-sm text-zinc-400 space-y-1">
              <p>{SITE_CONFIG.phone}</p>
              <p>{SITE_CONFIG.address.full}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export const MobileMenu = memo(MobileMenuComponent);
