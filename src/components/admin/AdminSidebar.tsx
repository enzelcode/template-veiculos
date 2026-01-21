'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Car,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  User,
  Users,
  X,
  Calculator,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/constants/site';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Veículos',
    href: '/admin/veiculos',
    icon: Car,
  },
  {
    label: 'Simulações',
    href: '/admin/simulacoes',
    icon: Calculator,
  },
  {
    label: 'Usuários',
    href: '/admin/usuarios',
    icon: Users,
  },
  {
    label: 'Meu Perfil',
    href: '/admin/perfil',
    icon: User,
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 border-r bg-white transition-transform duration-300 lg:translate-x-0 lg:z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
            <Link href="/admin" className="flex items-center">
              <div className="bg-zinc-800 rounded-lg px-2 py-1.5 lg:px-3 lg:py-2">
                <Image
                  src="/exclusive.png"
                  alt={SITE_CONFIG.name}
                  width={100}
                  height={50}
                  className="h-6 lg:h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4 space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver site
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-600 hover:text-destructive hover:bg-destructive/10"
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
