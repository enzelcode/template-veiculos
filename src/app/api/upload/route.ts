import { NextRequest, NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import sharp from 'sharp';

// Configurações de otimização
const MAX_WIDTH = 1920; // Largura máxima
const MAX_HEIGHT = 1080; // Altura máxima
const QUALITY = 80; // Qualidade (80% é ótimo pra web)

async function optimizeImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
  let sharpInstance = sharp(buffer);

  // Redimensiona mantendo proporção se for maior que o limite
  sharpInstance = sharpInstance.resize(MAX_WIDTH, MAX_HEIGHT, {
    fit: 'inside',
    withoutEnlargement: true, // Não aumenta imagens menores
  });

  // Converte pra WebP (melhor compressão) ou mantém JPEG
  if (mimeType === 'image/png' || mimeType === 'image/webp') {
    return sharpInstance
      .webp({ quality: QUALITY })
      .toBuffer();
  }

  // JPEG e outros
  return sharpInstance
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
}

// POST /api/upload - Upload de imagem otimizada
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não permitido. Use JPG, PNG, WebP ou GIF.' },
        { status: 400 }
      );
    }

    // Validar tamanho original (max 10MB antes da otimização)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 10MB.' },
        { status: 400 }
      );
    }

    // Converter File pra Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Otimizar imagem
    const optimizedBuffer = await optimizeImage(buffer, file.type);

    // Determinar extensão final
    const isWebP = file.type === 'image/png' || file.type === 'image/webp';
    const extension = isWebP ? 'webp' : 'jpg';

    // Gerar nome único
    const timestamp = Date.now();
    const filename = `vehicles/${timestamp}.${extension}`;

    // Upload pro Vercel Blob
    const blob = await put(filename, optimizedBuffer, {
      access: 'public',
      contentType: isWebP ? 'image/webp' : 'image/jpeg',
    });

    // Log de economia
    const originalKB = Math.round(file.size / 1024);
    const optimizedKB = Math.round(optimizedBuffer.length / 1024);
    const savings = Math.round((1 - optimizedBuffer.length / file.size) * 100);
    console.log(`Imagem otimizada: ${originalKB}KB → ${optimizedKB}KB (${savings}% menor)`);

    return NextResponse.json({
      url: blob.url,
      filename: blob.pathname,
      originalSize: file.size,
      optimizedSize: optimizedBuffer.length,
      savings: `${savings}%`,
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    );
  }
}

// DELETE /api/upload - Deletar imagem
export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL não fornecida' },
        { status: 400 }
      );
    }

    await del(url);

    return NextResponse.json({ message: 'Imagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar imagem' },
      { status: 500 }
    );
  }
}
