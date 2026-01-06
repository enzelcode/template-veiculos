'use client';

import { memo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'minimal';
  defaultValue?: string;
}

function SearchBarComponent({
  placeholder = 'Buscar veículos...',
  className = '',
  variant = 'default',
  defaultValue = '',
}: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(defaultValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (search.trim()) {
        router.push(`/veiculos?search=${encodeURIComponent(search.trim())}`);
      }
    },
    [search, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
          variant === 'minimal' ? 'h-4 w-4' : 'h-5 w-5'
        }`}
      />
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`
          pl-10
          ${variant === 'default'
            ? 'h-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-zinc-500'
            : 'h-9 bg-white border-zinc-200'
          }
        `}
      />
    </form>
  );
}

export const SearchBar = memo(SearchBarComponent);
