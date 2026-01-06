import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Vehicle } from '@/lib/db/models';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/vehicles/[id] - Buscar veículo por ID ou slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    // Tenta buscar por slug primeiro, depois por _id
    let vehicle = await Vehicle.findOne({ slug: id }).lean();

    if (!vehicle) {
      // Verifica se é um ObjectId válido antes de buscar
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        vehicle = await Vehicle.findById(id).lean();
      }
    }

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Veículo não encontrado' },
        { status: 404 }
      );
    }

    // Incrementa visualizações
    await Vehicle.findByIdAndUpdate(vehicle._id, { $inc: { views: 1 } });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar veículo' },
      { status: 500 }
    );
  }
}

// PUT /api/vehicles/[id] - Atualizar veículo
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    // Remove campos que não devem ser atualizados
    delete body._id;
    delete body.createdAt;
    delete body.views;

    // Atualiza título se marca/modelo/versão/ano mudou
    if (body.brand || body.model || body.version || body.year) {
      const current = await Vehicle.findById(id).lean();
      if (current) {
        const brand = body.brand || current.brand;
        const model = body.model || current.model;
        const version = body.version !== undefined ? body.version : current.version;
        const year = body.year || current.year;
        body.title = `${brand} ${model} ${version || ''} ${year}`.trim();
      }
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Veículo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar veículo' },
      { status: 500 }
    );
  }
}

// DELETE /api/vehicles/[id] - Excluir veículo
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = await params;

    const vehicle = await Vehicle.findByIdAndDelete(id).lean();

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Veículo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Veículo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir veículo' },
      { status: 500 }
    );
  }
}
