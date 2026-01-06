import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';

// POST /api/auth/setup - Criar primeiro usuário admin
// Esta rota só funciona se não existir nenhum usuário no banco
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Verifica se já existe algum usuário
    const existingUser = await User.findOne({});
    if (existingUser) {
      return NextResponse.json(
        { error: 'Setup já foi realizado. Use a área admin para criar novos usuários.' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 6 caracteres' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: 'admin',
      active: true,
    });

    return NextResponse.json(
      {
        message: 'Usuário admin criado com sucesso',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro no setup:', error);

    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: 'Este email já está em uso' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
}

// GET /api/auth/setup - Verifica se setup é necessário
export async function GET() {
  try {
    await connectDB();

    const existingUser = await User.findOne({});

    return NextResponse.json({
      setupRequired: !existingUser,
    });
  } catch (error) {
    console.error('Erro ao verificar setup:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar status do setup' },
      { status: 500 }
    );
  }
}
