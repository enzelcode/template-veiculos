'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/constants/site';
import { SearchBar } from '@/components/shared/SearchBar';
import { MobileMenu } from './MobileMenu';

function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0219a9] border-b border-blue-900">
      <div className="container-custom">
        <div className="flex h-24 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex-shrink-0"
          >
            <Image
              src="/galvao.png"
              alt="Galvão Motors"
              width={220}
              height={110}
              className="h-24 w-auto object-contain"
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
                className="text-sm font-medium text-white hover:text-blue-200 transition-colors"
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
