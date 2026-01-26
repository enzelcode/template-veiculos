'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/constants/site';
import { SearchBar } from '@/components/shared/SearchBar';
import { MobileMenu } from './MobileMenu';

function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-zinc-800">
      <div className="container-custom">
        <div className="flex h-24 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex-shrink-0"
          >
            <Image
              src="/maverick.png"
              alt="Maverick Veículos"
              width={160}
              height={80}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {SITE_CONFIG.navigation.main.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
