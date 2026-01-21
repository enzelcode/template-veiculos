import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';

// DELETE /api/auth/reset - Deletar todos os usuários (apenas dev)
export async function DELETE() {
  try {
    // Apenas permitir em ambiente de desenvolvimento
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Esta rota não está disponível em produção' },
        { status: 403 }
      );
    }

    await connectDB();

    const result = await User.deleteMany({});

    return NextResponse.json({
      message: 'Todos os usuários foram deletados',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Erro ao resetar usuários:', error);
    return NextResponse.json(
      { error: 'Erro ao resetar usuários' },
      { status: 500 }
    );
  }
}
