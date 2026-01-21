import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/db/mongodb';
import { Simulation } from '@/lib/db/models';

// GET /api/simulations - List all simulations (requires auth)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectDB();

    const simulations = await Simulation.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      simulations: simulations.map((s) => ({
        ...s,
        _id: s._id.toString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching simulations:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar simulações' },
      { status: 500 }
    );
  }
}

// POST /api/simulations - Create new simulation (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, cpf, birthDate, vehicleInterest, hasTrade, vehicleValue, downPayment, installments } = body;

    // Validation
    if (!name || !email || !phone || installments === undefined) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    await connectDB();

    const simulation = await Simulation.create({
      name,
      email,
      phone,
      cpf,
      birthDate,
      vehicleInterest,
      hasTrade,
      vehicleValue,
      downPayment,
      installments,
      status: 'pending',
    });

    return NextResponse.json(
      {
        message: 'Simulação enviada com sucesso',
        simulation: {
          ...simulation.toObject(),
          _id: simulation._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating simulation:', error);
    return NextResponse.json(
      { error: 'Erro ao criar simulação' },
      { status: 500 }
    );
  }
}
