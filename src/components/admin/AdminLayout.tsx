'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminSidebar } from './AdminSidebar';
import { SITE_CONFIG } from '@/constants/site';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header mobile */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <span className="font-bold text-lg">{SITE_CONFIG.name}</span>
      </header>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-6 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}
