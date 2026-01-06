'use client';

import { useSession } from 'next-auth/react';
import { User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{session?.user?.name}</p>
          <p className="text-xs text-muted-foreground">{session?.user?.role}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-zinc-100 flex items-center justify-center">
          <User className="h-5 w-5 text-zinc-600" />
        </div>
      </div>
    </header>
  );
}
