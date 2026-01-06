'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
}

export function ImageUpload({ value, onChange, onRemove, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);

    try {
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

      onChange(data.url);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao fazer upload');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleUpload(file);
    }
  }, [handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleRemove = async () => {
    if (onRemove) {
      onRemove();
    }
    onChange('');
  };

  if (value) {
    return (
      <div className={cn('relative aspect-video rounded-lg overflow-hidden border', className)}>
        <Image
          src={value}
          alt="Preview"
          fill
          className="object-cover"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-video rounded-lg border-2 border-dashed transition-colors',
        dragOver ? 'border-primary bg-primary/5' : 'border-zinc-300',
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={uploading}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
        {uploading ? (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
            <p className="text-sm">Enviando...</p>
          </>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
              {dragOver ? (
                <ImageIcon className="h-6 w-6" />
              ) : (
                <Upload className="h-6 w-6" />
              )}
            </div>
            <p className="text-sm font-medium">
              {dragOver ? 'Solte a imagem aqui' : 'Clique ou arraste uma imagem'}
            </p>
            <p className="text-xs text-zinc-400 mt-1">JPG, PNG, WebP até 5MB</p>
          </>
        )}
      </div>
    </div>
  );
}
