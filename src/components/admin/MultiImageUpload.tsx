'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { X, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function MultiImageUpload({
  value,
  onChange,
  maxImages = 10,
  className,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (files: FileList) => {
    const filesToUpload = Array.from(files).slice(0, maxImages - value.length);

    if (filesToUpload.length === 0) {
      alert(`Máximo de ${maxImages} imagens permitido`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = filesToUpload.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro no upload');
        }

        return data.url;
      });

      const newUrls = await Promise.all(uploadPromises);
      onChange([...value, ...newUrls]);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao fazer upload');
    } finally {
      setUploading(false);
    }
  }, [value, onChange, maxImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files);
    }
  };

  const handleRemove = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newValue = [...value];
    const [removed] = newValue.splice(fromIndex, 1);
    newValue.splice(toIndex, 0, removed);
    onChange(newValue);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div
            key={url}
            className="relative aspect-video rounded-lg overflow-hidden border group"
          >
            <Image
              src={url}
              alt={`Imagem ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {index > 0 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleReorder(index, index - 1)}
                >
                  ←
                </Button>
              )}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
              {index < value.length - 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleReorder(index, index + 1)}
                >
                  →
                </Button>
              )}
            </div>
            {index === 0 && (
              <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                Principal
              </span>
            )}
          </div>
        ))}

        {value.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="relative aspect-video rounded-lg border-2 border-dashed border-zinc-300 hover:border-primary hover:bg-zinc-50 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : (
                <>
                  <Plus className="h-8 w-8 mb-1" />
                  <span className="text-xs">Adicionar</span>
                </>
              )}
            </div>
          </button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {value.length}/{maxImages} imagens • A primeira imagem será a principal
      </p>
    </div>
  );
}
