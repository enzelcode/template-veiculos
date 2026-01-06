import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { PageView } from '@/lib/db/models';

export async function POST(request: NextRequest) {
  try {
    const { path, vehicleId } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'Path é obrigatório' }, { status: 400 });
    }

    await connectDB();

    // Data de hoje (sem hora) para agrupar por dia
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Upsert: incrementa contador se existir, cria se não existir
    await PageView.findOneAndUpdate(
      { path, date: today },
      {
        $inc: { count: 1 },
        $setOnInsert: { vehicleId: vehicleId || undefined },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao registrar visualização:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar visualização' },
      { status: 500 }
    );
  }
}
