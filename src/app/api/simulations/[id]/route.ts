import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/db/mongodb';
import { Simulation } from '@/lib/db/models';
import mongoose from 'mongoose';

// PUT /api/simulations/[id] - Update simulation
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const body = await request.json();
    const { status, notes } = body;

    await connectDB();

    const simulation = await Simulation.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    );

    if (!simulation) {
      return NextResponse.json(
        { error: 'Simulação não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Simulação atualizada com sucesso',
      simulation: {
        ...simulation.toObject(),
        _id: simulation._id.toString(),
      },
    });
  } catch (error) {
    console.error('Error updating simulation:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar simulação' },
      { status: 500 }
    );
  }
}

// DELETE /api/simulations/[id] - Delete simulation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    await connectDB();

    const simulation = await Simulation.findByIdAndDelete(id);

    if (!simulation) {
      return NextResponse.json(
        { error: 'Simulação não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Simulação deletada com sucesso',
    });
  } catch (error) {
    console.error('Error deleting simulation:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar simulação' },
      { status: 500 }
    );
  }
}
